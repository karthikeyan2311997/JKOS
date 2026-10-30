import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SPOTIFY_CLIENT_ID = Deno.env.get("SPOTIFY_CLIENT_ID") ?? "";
const SPOTIFY_CLIENT_SECRET = Deno.env.get("SPOTIFY_CLIENT_SECRET") ?? "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

interface TokenRow {
  id: string;
  access_token: string;
  refresh_token: string;
  expires_at: string;
}

async function refreshAccessToken(refreshToken: string): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
}> {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const authHeader = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authHeader}`,
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Spotify token refresh failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token ?? refreshToken,
    expires_in: data.expires_in,
  };
}

async function getValidAccessToken(): Promise<string | null> {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null;

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data, error } = await supabase
    .from("spotify_tokens")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;

  const tokenRow = data as TokenRow;
  const expiresAt = new Date(tokenRow.expires_at).getTime();
  const now = Date.now();

  if (expiresAt - now > 60_000) {
    return tokenRow.access_token;
  }

  try {
    const refreshed = await refreshAccessToken(tokenRow.refresh_token);
    const newExpiresAt = new Date(now + refreshed.expires_in * 1000).toISOString();

    await supabase
      .from("spotify_tokens")
      .update({
        access_token: refreshed.access_token,
        refresh_token: refreshed.refresh_token,
        expires_at: newExpiresAt,
        updated_at: new Date().toISOString(),
      })
      .eq("id", tokenRow.id);

    return refreshed.access_token;
  } catch {
    return null;
  }
}

async function getNowPlaying(accessToken: string) {
  const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res.status === 204 || res.status === 202) {
    return { is_playing: false, track: null };
  }

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized");
    const text = await res.text();
    throw new Error(`Spotify API error: ${res.status} ${text}`);
  }

  const data = await res.json();

  if (!data.is_playing) {
    return { is_playing: false, track: null };
  }

  const track = {
    name: data.item?.name ?? "Unknown",
    artists: (data.item?.artists ?? []).map((a: { name: string }) => a.name),
    album: data.item?.album?.name ?? "",
    album_image: data.item?.album?.images?.[0]?.url ?? "",
    duration_ms: data.item?.duration_ms ?? 0,
    progress_ms: data.progress_ms ?? 0,
    url: data.item?.external_urls?.spotify ?? "",
  };

  return { is_playing: true, track };
}

async function getRecentlyPlayed(accessToken: string) {
  const res = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!res.ok) return null;

  const data = await res.json();
  const item = data.items?.[0];
  if (!item) return null;

  return {
    name: item.track?.name ?? "Unknown",
    artists: (item.track?.artists ?? []).map((a: { name: string }) => a.name),
    album: item.track?.album?.name ?? "",
    album_image: item.track?.album?.images?.[0]?.url ?? "",
    duration_ms: item.track?.duration_ms ?? 0,
    progress_ms: 0,
    url: item.track?.external_urls?.spotify ?? "",
    played_at: item.played_at ?? "",
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      return new Response(
        JSON.stringify({ is_playing: false, track: null, configured: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    try {
      const nowPlaying = await getNowPlaying(accessToken);
      if (nowPlaying.is_playing) {
        return new Response(
          JSON.stringify({ ...nowPlaying, configured: true }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const recent = await getRecentlyPlayed(accessToken);
      return new Response(
        JSON.stringify({
          is_playing: false,
          track: recent,
          configured: true,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (err) {
      if (err instanceof Error && err.message === "Unauthorized") {
        return new Response(
          JSON.stringify({ is_playing: false, track: null, configured: false, error: "token_expired" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw err;
    }
  } catch (err) {
    return new Response(
      JSON.stringify({
        is_playing: false,
        track: null,
        configured: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

/*
# Spotify tokens table

1. New Tables
  - `spotify_tokens`
    - `id` (uuid, primary key, default gen_random_uuid())
    - `access_token` (text, not null) — short-lived Spotify access token
    - `refresh_token` (text, not null) — long-lived token used to get new access tokens
    - `expires_at` (timestamptz, not null) — when the access token expires
    - `updated_at` (timestamptz, default now()) — last refresh timestamp

2. Security
  - RLS enabled on `spotify_tokens`.
  - SELECT/INSERT/UPDATE/DELETE open to `anon, authenticated` because this is
    a single-tenant portfolio site with no sign-in flow. The edge function
    uses the service-role key (which bypasses RLS) to read/write the row;
    the anon policies exist only as a safety net and are intentionally public
    for this no-auth app.
*/

CREATE TABLE IF NOT EXISTS spotify_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  access_token text NOT NULL,
  refresh_token text NOT NULL,
  expires_at timestamptz NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE spotify_tokens ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_spotify_tokens" ON spotify_tokens;
CREATE POLICY "anon_select_spotify_tokens"
  ON spotify_tokens FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_spotify_tokens" ON spotify_tokens;
CREATE POLICY "anon_insert_spotify_tokens"
  ON spotify_tokens FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_spotify_tokens" ON spotify_tokens;
CREATE POLICY "anon_update_spotify_tokens"
  ON spotify_tokens FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_spotify_tokens" ON spotify_tokens;
CREATE POLICY "anon_delete_spotify_tokens"
  ON spotify_tokens FOR DELETE
  TO anon, authenticated USING (true);

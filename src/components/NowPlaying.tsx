import { useState, useEffect, useRef } from 'react';
import { Music, Play, Pause, ExternalLink, Disc3, Volume2 } from 'lucide-react';

interface Track {
  name: string;
  artists: string[];
  album: string;
  album_image: string;
  duration_ms: number;
  progress_ms: number;
  url: string;
  played_at?: string;
}

interface NowPlayingData {
  is_playing: boolean;
  track: Track | null;
  configured: boolean;
}

export default function NowPlaying() {
  const [data, setData] = useState<NowPlayingData>({
    is_playing: false,
    track: null,
    configured: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchNowPlaying = async () => {
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/spotify-now-playing`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });

      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }

      const json: NowPlayingData = await res.json();

      if (!json.configured) {
        setError(true);
        setLoading(false);
        return;
      }

      setData(json);
      setError(false);
      setLoading(false);

      if (json.is_playing && json.track) {
        setProgress(json.track.progress_ms);
      }
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    const poll = setInterval(fetchNowPlaying, 15000);
    return () => clearInterval(poll);
  }, []);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (data.is_playing && data.track) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= data.track!.duration_ms) {
            return data.track!.duration_ms;
          }
          return p + 1000;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data.is_playing, data.track]);

  if (loading) {
    return (
      <div className="animate-fade-in-up">
        <div className="section-label" style={{ marginBottom: '16px' }}>NOW_PLAYING.SYS</div>
        <div className="retro-card" style={{ padding: '20px', borderRadius: '3px', maxWidth: '360px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '56px', height: '56px', background: 'var(--color-surface-2)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Disc3 size={20} className="animate-spin-slow" style={{ color: 'var(--color-text-dim)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ height: '10px', background: 'var(--color-surface-2)', borderRadius: '2px', marginBottom: '8px', width: '70%' }} />
              <div style={{ height: '8px', background: 'var(--color-surface-2)', borderRadius: '2px', width: '50%' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data.track) {
    return null;
  }

  const { track, is_playing } = data;
  const pct = track.duration_ms > 0 ? (progress / track.duration_ms) * 100 : 0;

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="animate-fade-in-up">
      <div className="section-label" style={{ marginBottom: '16px' }}>NOW_PLAYING.SYS</div>
      <div
        className="retro-card"
        style={{
          padding: '16px',
          borderRadius: '3px',
          maxWidth: '360px',
          borderLeft: `2px solid ${is_playing ? 'var(--color-success)' : 'var(--color-text-dim)'}`,
        }}
      >
        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
          {/* Album art */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            {track.album_image ? (
              <img
                src={track.album_image}
                alt={track.album}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '4px',
                  objectFit: 'cover',
                  filter: is_playing ? 'none' : 'grayscale(40%)',
                }}
              />
            ) : (
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '4px',
                  background: 'var(--color-surface-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Music size={20} style={{ color: 'var(--color-text-dim)' }} />
              </div>
            )}
            {is_playing && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '4px',
                  right: '4px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 8px var(--color-success)',
                }}
              >
                <Volume2 size={9} style={{ color: '#000' }} />
              </div>
            )}
          </div>

          {/* Track info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              {is_playing ? (
                <Play size={9} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
              ) : (
                <Pause size={9} style={{ color: 'var(--color-text-dim)', flexShrink: 0 }} />
              )}
              <span className="font-mono" style={{ fontSize: '0.55rem', color: is_playing ? 'var(--color-success)' : 'var(--color-text-dim)', letterSpacing: '0.12em' }}>
                {is_playing ? 'PLAYING NOW' : 'LAST PLAYED'}
              </span>
            </div>
            <div
              className="font-display"
              style={{
                color: 'var(--color-text-bright)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.03em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginBottom: '2px',
              }}
            >
              {track.name}
            </div>
            <div
              className="font-mono"
              style={{
                color: 'var(--color-text-dim)',
                fontSize: '0.68rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginBottom: '2px',
              }}
            >
              {track.artists.join(', ')}
            </div>
            <div
              className="font-mono"
              style={{
                color: 'var(--color-text-dim)',
                fontSize: '0.6rem',
                opacity: 0.7,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {track.album}
            </div>
          </div>

          {/* External link */}
          {track.url && (
            <a
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flexShrink: 0,
                color: 'var(--color-text-dim)',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-dim)')}
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: '14px' }}>
          <div className="progress-track" style={{ height: '5px' }}>
            <div
              className="progress-fill"
              style={{
                width: `${pct}%`,
                background: is_playing
                  ? 'linear-gradient(90deg, var(--color-success), var(--color-success))'
                  : 'linear-gradient(90deg, var(--color-text-dim), var(--color-text-dim))',
                boxShadow: is_playing ? '0 0 6px var(--color-success)' : 'none',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
            <span className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--color-text-dim)' }}>
              {formatTime(progress)}
            </span>
            <span className="font-mono" style={{ fontSize: '0.55rem', color: 'var(--color-text-dim)' }}>
              {formatTime(track.duration_ms)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

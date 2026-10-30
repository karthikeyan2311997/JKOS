import { useState, useEffect } from 'react';

interface Props {
  onComplete: () => void;
}

const BOOT_LINES = [
  { text: 'ஜெಕ_OS v2.0 — INITIALIZING...', delay: 0 },
  { text: 'Loading kernel modules...', delay: 300 },
  { text: 'Mounting design systems...............OK', delay: 600 },
  { text: 'Mounting code runtime..................OK', delay: 900 },
  { text: 'Calibrating spatial logic..............OK', delay: 1200 },
  { text: 'Loading architecture database..........OK', delay: 1500 },
  { text: 'Loading development index..............OK', delay: 1800 },
  { text: 'Syncing neural interface...............OK', delay: 2100 },
  { text: '', delay: 2400 },
  { text: '> ALL SYSTEMS NOMINAL', delay: 2600 },
  { text: '> IDENTITY: Architect × Developer', delay: 2900 },
  { text: '> BOOT COMPLETE', delay: 3200 },
];

export default function BootScreen({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (skipped) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines(i + 1);
      }, line.delay));
    });

    timers.push(setTimeout(() => setShowPrompt(true), 3700));

    return () => timers.forEach(clearTimeout);
  }, [skipped]);

  const handleSkip = () => {
    setSkipped(true);
    onComplete();
  };

  return (
    <div
      className="min-h-screen grid-pattern animate-flicker"
      style={{ background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      onClick={showPrompt ? onComplete : undefined}
    >
      <div style={{ width: '100%', maxWidth: '900px', padding: '0 24px' }}>
        {/* Logo */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <div
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--color-primary)', letterSpacing: '0.1em', textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}
          >
            ஜெಕ.OS
          </div>
          <div className="font-mono" style={{ color: 'var(--color-text-dim)', fontSize: '0.7rem', letterSpacing: '0.3em', marginTop: '6px' }}>
            SYSTEM BOOT SEQUENCE
                     
          </div>
           
        </div>

        {/* Terminal */}
        <div className="terminal-window" style={{ padding: '20px 24px', minHeight: '280px' }}>
          <div className="terminal-header">
            <button style={{ width: '16px', height: '14px', background: '#d0d0d0', border: '1px solid #808080', padding: 0, cursor: 'pointer', fontSize: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>_</button>
            <button style={{ width: '16px', height: '14px', background: '#d0d0d0', border: '1px solid #808080', padding: 0, cursor: 'pointer', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>□</button>
            <button style={{ width: '16px', height: '14px', background: '#d0d0d0', border: '1px solid #808080', padding: 0, cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>×</button>
            <span className="font-mono" style={{ marginLeft: '8px', color: 'black', fontSize: '0.65rem', fontWeight: 'bold' }}>
              ஜெಕ_os — boot.log
            </span>
          </div>
          <div style={{ padding: '20px 0' }}>
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                className="font-mono animate-fade-in"
                style={{
                  fontSize: '0.75rem',
                  lineHeight: '1.8',
                  color: line.text.startsWith('>') ? 'var(--color-primary)' : 'var(--color-text)',
                  marginBottom: line.text === '' ? '8px' : '0',
                  opacity: line.text === '' ? 0 : 1,
                  textShadow: line.text.startsWith('>') ? '0 0 8px var(--color-primary)' : 'none',
                }}
              >
                {line.text === '' ? '\u00A0' : line.text}
              </div>
            ))}
            {visibleLines > 0 && visibleLines < BOOT_LINES.length && (
              <span className="font-mono cursor-blink" style={{ fontSize: '0.75rem' }} />
            )}
          </div>
        </div>

        {/* Press start */}
        <div style={{ textAlign: 'center', marginTop: '32px', height: '40px' }}>
          {showPrompt ? (
            <button
              className="font-mono animate-pulse-glow"
              onClick={onComplete}
              style={{
                background: 'var(--color-primary)',
                border: '2px solid #0056b3',
                color: 'white',
                padding: '8px 28px',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                boxShadow: 'inset 1px 1px 0px rgba(255,255,255,0.3), 2px 2px 0px rgba(0,0,0,0.2)',
              }}
            >
              PRESS START
            </button>
          ) : (
            <button
              className="font-mono"
              onClick={handleSkip}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-dim)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                cursor: 'pointer',
                textTransform: 'uppercase',
                opacity: 0.5,
              }}
            >
              SKIP INTRO
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { ChevronRight, Sun, Moon } from 'lucide-react';
import type { Section, Theme } from '../App';

interface Props {
  onNavigate: (s: Section) => void;
  theme: Theme;
  onThemeToggle: () => void;
}

const MENU_ITEMS: { id: Section; label: string; desc: string; key: string }[] = [
  { id: 'about',        label: 'ABOUT',        desc: 'Player profile & origin story',  key: '01' },
  { id: 'architecture', label: 'ARCHITECTURE',  desc: 'Built work & design thinking',   key: '02' },
  { id: 'codelab',      label: 'CODE LAB',      desc: 'Systems, tools & dev projects',  key: '03' },
  { id: 'thinking',     label: 'THINKING',      desc: 'Concepts, experiments & ideas',  key: '04' },
  { id: 'skills',       label: 'SKILLS',        desc: 'Inventory & equipped stack',     key: '05' },
  { id: 'contact',      label: 'CONTACT',       desc: 'Connect & collaborate',          key: '06' },
];

export default function MainMenu({ onNavigate, theme, onThemeToggle }: Props) {
  const [selected, setSelected] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, MENU_ITEMS.length - 1));
    if (e.key === 'ArrowUp')   setSelected(s => Math.max(s - 1, 0));
    if (e.key === 'Enter')     onNavigate(MENU_ITEMS[selected].id);
  }, [selected, onNavigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div
      className="min-h-screen grid-pattern"
      style={{ background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ width: '100%', maxWidth: '1000px', padding: '40px 24px', display: 'grid', gap: '48px', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>

        {/* Left: Identity */}
        <div className={visible ? 'animate-fade-in-up' : ''} style={{ opacity: visible ? 1 : 0 }}>
          <div className="section-label" style={{ marginBottom: '12px' }}>ஜெಕ.EXE</div>
          <h1
            className="font-display glow-primary"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1, letterSpacing: '0.05em', marginBottom: '8px' }}
          >
            Karthikeyan J K
          </h1>
          <div
            className="font-mono"
            style={{ fontSize: '0.85rem', color: 'var(--color-accent)', letterSpacing: '0.15em', marginBottom: '24px' }}
          >
            ARCHITECT × DEVELOPER
          </div>
          <p style={{ color: 'var(--color-text-dim)', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '320px' }}>
            I design spaces and systems —<br />
            both physical and digital.
          </p>

          {/* Stats */}
          <div style={{ marginTop: '32px', display: 'flex', gap: '24px' }}>
            {[
              { label: 'PROJECTS', value: '12+' },
              { label: 'BUILDS', value: '8+' },
              { label: 'LVL', value: '09' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="font-display" style={{ color: 'var(--color-primary)', fontSize: '1.4rem', fontWeight: 700 }}>
                  {stat.value}
                </div>
                <div className="section-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Menu */}
        <div>
          <div className="section-label" style={{ marginBottom: '16px' }}>SELECT OPTION</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {MENU_ITEMS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                onMouseEnter={() => setSelected(i)}
                className={`menu-item ${selected === i ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  background: selected === i ? 'var(--color-primary)' : 'var(--color-surface)',
                  border: `2px solid ${selected === i ? 'var(--color-primary-dim)' : 'var(--color-border)'}`,
                  color: selected === i ? 'white' : 'var(--color-text)',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  opacity: visible ? 1 : 0,
                  animation: visible ? `fadeInUp 0.4s ease ${0.1 + i * 0.07}s both` : 'none',
                  boxShadow: selected === i
                    ? 'inset 1px 1px 0px rgba(255,255,255,0.3), 2px 2px 0px rgba(0,0,0,0.2)'
                    : 'inset 1px 1px 0px rgba(255,255,255,0.5), inset -1px -1px 0px rgba(0,0,0,0.1)',
                }}
              >
                <span className="font-mono" style={{ color: 'var(--color-text-dim)', fontSize: '0.6rem', minWidth: '18px' }}>
                  {item.key}
                </span>
                {selected === i && (
                  <ChevronRight size={12} style={{ color: 'white', flexShrink: 0 }} />
                )}
                <span className="font-display" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: selected === i ? 'white' : 'var(--color-text)', fontWeight: 700 }}>
                  {item.label}
                </span>
                <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--color-text-dim)', marginLeft: 'auto' }}>
                  {item.desc}
                </span>
              </button>
            ))}
          </div>

          {/* Keyboard hint */}
          <div className="font-mono" style={{ marginTop: '20px', color: 'var(--color-text-dim)', fontSize: '0.6rem', opacity: 0.5, letterSpacing: '0.1em' }}>
            USE ↑ ↓ ENTER OR CLICK
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          borderTop: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          padding: '8px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span className="font-mono" style={{ color: 'var(--color-text-dim)', fontSize: '0.6rem' }}>
          ஜெಕ v2.0 — ALL SYSTEMS NOMINAL
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onThemeToggle}
            className="theme-toggle"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            aria-label="Toggle theme"
            style={{
              position: 'relative',
              width: '44px',
              height: '22px',
              borderRadius: '11px',
              border: '1px solid var(--color-border)',
              background: theme === 'dark' ? 'var(--color-surface-2)' : 'var(--color-surface)',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              transition: 'background 0.25s ease, border-color 0.25s ease',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: theme === 'dark' ? '22px' : '2px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: theme === 'dark' ? 'var(--color-primary)' : 'var(--color-warning)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1), background 0.25s ease',
                boxShadow: theme === 'dark' ? '0 0 8px var(--color-primary)' : '0 0 6px rgba(255,193,7,0.4)',
              }}
            >
              {theme === 'dark'
                ? <Moon size={10} style={{ color: '#0a0e14' }} />
                : <Sun size={10} style={{ color: '#1a1a1a' }} />}
            </span>
          </button>
          <span className="font-mono" style={{ color: 'var(--color-primary)', fontSize: '0.6rem' }}>
            2026
          </span>
        </div>
      </div>
    </div>
  );
}

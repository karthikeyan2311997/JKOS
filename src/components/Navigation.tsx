import { useState } from 'react';
import { Menu, X, ChevronLeft, Sun, Moon } from 'lucide-react';
import type { Section, Theme } from '../App';

interface Props {
  current: Section;
  onNavigate: (s: Section) => void;
  theme: Theme;
  onThemeToggle: () => void;
}

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: 'about',        label: 'ABOUT'    },
  { id: 'architecture', label: 'ARCH'     },
  { id: 'codelab',      label: 'CODE LAB' },
  { id: 'thinking',     label: 'THINKING' },
  { id: 'skills',       label: 'SKILLS'   },
  { id: 'contact',      label: 'CONTACT'  },
];

export default function Navigation({ current, onNavigate, theme, onThemeToggle }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: theme === 'dark' ? 'rgba(10,14,20,0.92)' : 'rgba(245,245,240,0.92)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--color-border)',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: '8px',
        }}
      >
        {/* Back to menu */}
        <button
          onClick={() => onNavigate('menu')}
          className="font-display"
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '6px',
            padding: '4px 8px',
            transition: 'opacity 0.15s',
          }}
        >
          <ChevronLeft size={14} />
          ஜெಕ
        </button>

        <div style={{ width: '1px', height: '20px', background: 'var(--color-border)', margin: '0 8px' }} />

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: '4px', flex: 1 }} className="hidden-mobile">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="font-mono"
              style={{
                background: current === item.id ? 'rgba(0,212,255,0.06)' : 'transparent',
                border: `1px solid ${current === item.id ? 'rgba(0,212,255,0.2)' : 'transparent'}`,
                borderRadius: '2px',
                color: current === item.id ? 'var(--color-primary)' : 'var(--color-text-dim)',
                padding: '4px 12px',
                fontSize: '0.62rem',
                letterSpacing: '0.12em',
                cursor: 'pointer',
                transition: 'all 0.15s',
                textShadow: current === item.id ? '0 0 8px var(--color-primary)' : 'none',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right status */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="font-mono hidden-mobile" style={{ color: 'var(--color-text-dim)', fontSize: '0.58rem', letterSpacing: '0.1em' }}>
            ESC → MENU
          </span>
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
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text)', display: 'none' }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed', top: '56px', left: 0, right: 0, zIndex: 99,
            background: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            padding: '12px 0',
          }}
        >
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
              className="font-mono"
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '12px 24px',
                background: current === item.id ? 'rgba(0,212,255,0.06)' : 'transparent',
                border: 'none',
                color: current === item.id ? 'var(--color-primary)' : 'var(--color-text)',
                fontSize: '0.75rem', letterSpacing: '0.1em',
                cursor: 'pointer',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        .theme-toggle:focus { outline: 2px solid var(--color-primary); outline-offset: 2px; }
      `}</style>
    </>
  );
}

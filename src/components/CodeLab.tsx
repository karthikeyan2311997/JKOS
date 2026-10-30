import { useState } from 'react';
import { ExternalLink, Github, Terminal, Layers, Database, Zap } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    name: 'SUGAR RUSH POS',
    tagline: 'Bakery management software',
    status: 'SHIPPED',
    problem: 'Local bakeries were managing orders on paper — no inventory tracking, no sales reports, no customer records.',
    solution: 'A lightweight POS and inventory system built for bakeries. Handles orders, billing, stock, and daily reports.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Vite'],
    outcome: 'Used by 2 bakeries across Kerala. Reduced order errors by ~70% and gave owners daily revenue visibility.',
    type: 'Product',
    color: 'var(--color-accent)',
    icon: Layers,
    github: null,
    live: null,
  },
  {
    id: 2,
    name: 'MUMPARIMANAM',
    tagline: 'Local marketplace platform',
    status: 'IN PROGRESS',
    problem: "Local vendors in tier-2 Kerala cities have no digital marketplace that's culturally fitted and Malayalam-first.",
    solution: 'A hyperlocal marketplace with vernacular-first UX, WhatsApp integration, and simplified seller onboarding.',
    stack: ['React', 'Supabase', 'Tailwind', 'Node.js'],
    outcome: 'MVP in progress. 12 vendors pre-signed. Targeting Thrissur & Palakkad districts for pilot.',
    type: 'Platform',
    color: 'var(--color-primary)',
    icon: Database,
    github: null,
    live: null,
  },
  {
    id: 3,
    name: 'FLOW AUTOMATOR',
    tagline: 'No-code workflow automation',
    status: 'CONCEPT',
    problem: "Pipedream and Zapier are expensive for small businesses and require too much technical understanding.",
    solution: 'A drag-and-drop automation builder for small businesses in India — supports local payment gateways, WhatsApp, and SMS.',
    stack: ['React', 'Node.js', 'Redis', 'PostgreSQL'],
    outcome: 'Architecture designed. Targeting ₹499/mo price point vs Zapier\'s ₹4000+/mo.',
    type: 'Tool',
    color: 'var(--color-success)',
    icon: Zap,
    github: null,
    live: null,
  },
  {
    id: 4,
    name: 'ARCH BRIEF GEN',
    tagline: 'AI-powered architecture brief generator',
    status: 'BUILT',
    problem: 'Architects spend hours writing project briefs from client interview notes. The structure is always similar but content varies.',
    solution: 'Feed raw client notes into the tool, get a structured architectural brief in 30 seconds. Saves 2+ hours per project.',
    stack: ['React', 'OpenAI API', 'Node.js', 'Vite'],
    outcome: 'Personal tool used on 6 projects. Accuracy is 85% — minor edits needed. Saved ~12 hours total.',
    type: 'Tool',
    color: 'var(--color-warning)',
    icon: Terminal,
    github: null,
    live: null,
  },
  {
    id: 5,
    name: 'JAYK.OS',
    tagline: 'This portfolio — retro OS concept',
    status: 'SHIPPED',
    problem: "Standard portfolio sites don't reflect a dual architect/developer identity well.",
    solution: 'Designed and built as a retro OS — boot screen, menu system, terminal aesthetics. Every interaction reflects the dual identity.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'TypeScript'],
    outcome: "You're looking at it.",
    type: 'Portfolio',
    color: 'var(--color-primary)',
    icon: Terminal,
    github: null,
    live: null,
  },
];

const STATUS_COLORS: Record<string, string> = {
  'SHIPPED':     'var(--color-success)',
  'IN PROGRESS': 'var(--color-warning)',
  'CONCEPT':     'var(--color-accent)',
  'BUILT':       'var(--color-primary)',
};

export default function CodeLab() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = PROJECTS.find(p => p.id === selected);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <div className="animate-fade-in-up" style={{ marginBottom: '40px' }}>
        <div className="section-label" style={{ marginBottom: '8px' }}>CODE_LAB.INDEX</div>
        <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, color: 'var(--color-text-bright)', letterSpacing: '0.04em' }}>
          CODE<span style={{ color: 'var(--color-primary)' }}>_</span>LAB
        </h2>
        <p style={{ color: 'var(--color-text-dim)', fontSize: '0.82rem', marginTop: '10px', maxWidth: '500px', lineHeight: 1.7 }}>
          Systems I've built — products, tools, and experiments. Each starts with a real problem.
        </p>
      </div>

      {!active ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              className="retro-card animate-fade-in-up"
              style={{
                padding: '24px', borderRadius: '3px', cursor: 'pointer',
                borderLeft: `2px solid ${p.color}`,
                animationDelay: `${i * 0.07}s`,
              }}
              onClick={() => setSelected(p.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '36px', height: '36px',
                    background: `${p.color}15`,
                    border: `1px solid ${p.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <p.icon size={16} style={{ color: p.color }} />
                </div>
                <span className="font-mono" style={{ fontSize: '0.6rem', color: STATUS_COLORS[p.status], letterSpacing: '0.1em' }}>
                  {p.status}
                </span>
              </div>

              <div className="font-display" style={{ color: 'var(--color-text-bright)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px', letterSpacing: '0.05em' }}>
                {p.name}
              </div>
              <div className="font-mono" style={{ color: p.color, fontSize: '0.62rem', marginBottom: '12px', letterSpacing: '0.05em' }}>
                {p.tagline}
              </div>
              <p style={{ color: 'var(--color-text-dim)', fontSize: '0.75rem', lineHeight: 1.65, marginBottom: '16px' }}>
                {p.problem.substring(0, 100)}...
              </p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {p.stack.map(s => <span key={s} className="retro-tag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="animate-fade-in">
          <button
            onClick={() => setSelected(null)}
            className="font-mono"
            style={{
              background: 'transparent', border: '1px solid var(--color-border)',
              color: 'var(--color-text-dim)', padding: '6px 16px', fontSize: '0.62rem',
              letterSpacing: '0.12em', cursor: 'pointer', marginBottom: '24px',
            }}
          >
            ← BACK TO LAB
          </button>

          <div className="terminal-window" style={{ maxWidth: '720px' }}>
            <div className="terminal-header">
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
              <span className="font-mono" style={{ marginLeft: '8px', color: 'var(--color-text-dim)', fontSize: '0.62rem' }}>
                {active.name.toLowerCase().replace(/ /g, '_')}.exe
              </span>
              <span className="font-mono" style={{ marginLeft: 'auto', fontSize: '0.6rem', color: STATUS_COLORS[active.status] }}>
                [{active.status}]
              </span>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ borderLeft: `2px solid ${active.color}`, paddingLeft: '16px', marginBottom: '28px' }}>
                <div className="font-display" style={{ color: 'var(--color-text-bright)', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '0.05em' }}>
                  {active.name}
                </div>
                <div className="font-mono" style={{ color: active.color, fontSize: '0.65rem', marginTop: '4px', letterSpacing: '0.08em' }}>
                  {active.tagline}
                </div>
              </div>

              {[
                { label: '> PROBLEM STATEMENT', text: active.problem },
                { label: '> SOLUTION', text: active.solution },
                { label: '> OUTCOME', text: active.outcome },
              ].map(block => (
                <div key={block.label} style={{ marginBottom: '20px' }}>
                  <div className="font-mono" style={{ color: active.color, fontSize: '0.65rem', marginBottom: '6px', letterSpacing: '0.08em' }}>
                    {block.label}
                  </div>
                  <p style={{ color: 'var(--color-text)', fontSize: '0.82rem', lineHeight: 1.75, paddingLeft: '12px' }}>
                    {block.text}
                  </p>
                </div>
              ))}

              <div style={{ marginBottom: '20px' }}>
                <div className="font-mono" style={{ color: active.color, fontSize: '0.65rem', marginBottom: '10px', letterSpacing: '0.08em' }}>
                  {'> STACK'}
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingLeft: '12px' }}>
                  {active.stack.map(s => (
                    <span key={s} className="font-mono" style={{
                      padding: '4px 12px', fontSize: '0.65rem',
                      border: `1px solid ${active.color}30`,
                      color: active.color, background: `${active.color}08`,
                      letterSpacing: '0.05em',
                    }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingLeft: '12px', marginTop: '24px' }}>
                {active.github && (
                  <a href={active.github} className="font-mono" style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    border: '1px solid var(--color-border)', color: 'var(--color-text-dim)',
                    padding: '6px 16px', fontSize: '0.62rem', letterSpacing: '0.12em',
                    textDecoration: 'none', transition: 'all 0.2s',
                  }}>
                    <Github size={11} /> GITHUB
                  </a>
                )}
                {active.live && (
                  <a href={active.live} className="font-mono" style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    border: `1px solid ${active.color}40`, color: active.color,
                    padding: '6px 16px', fontSize: '0.62rem', letterSpacing: '0.12em',
                    textDecoration: 'none', transition: 'all 0.2s',
                  }}>
                    <ExternalLink size={11} /> LIVE DEMO
                  </a>
                )}
                {!active.github && !active.live && (
                  <span className="font-mono" style={{ color: 'var(--color-text-dim)', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                    LINKS AVAILABLE ON REQUEST
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

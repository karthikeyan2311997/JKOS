import { useState, useEffect } from 'react';
import { MapPin, Calendar, Zap, Code2, Building2 } from 'lucide-react';
import type { Section } from '../App';
import NowPlaying from './NowPlaying';

interface Props {
  onNavigate: (s: Section) => void;
}

const TIMELINE = [
  { year: '2014', event: 'Enrolled in Architecture school', type: 'arch' },
  { year: '2018', event: 'First built project — residential, Internship', type: 'arch' },
  { year: '2019', event: 'Graduated B.Arch', type: 'arch' },
  { year: '2021', event: 'Discovered coding during a small thought of building systems for architecture', type: 'dev' },
  { year: '2021', event: 'Built first web tool — workflow automation', type: 'dev' },
  { year: '2022', event: 'Graduated M.Sc Urban Design with distinction', type: 'arch' },
  { year: '2023', event: 'Launched Sugar Rush bakery software', type: 'dev' },
  { year: '2024', event: 'Merged both disciplines — systems thinking', type: 'both' },
  { year: '2025', event: 'Building at the intersection of space + software', type: 'both' },
];

const SKILLS_QUICK = [
  { label: 'Architectural Design', lvl: 9, type: 'arch' },
  { label: 'Site Planning',        lvl: 9, type: 'arch' },
  { label: 'Construction Docs',    lvl: 8, type: 'arch' },
  { label: 'React / Vite',         lvl: 8, type: 'dev' },
  { label: 'Node.js',              lvl: 7, type: 'dev' },
  { label: 'Systems Thinking',     lvl: 9, type: 'both' },
];

export default function About({ onNavigate }: Props) {
  const [lvls, setLvls] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLvls(true), 400);
    return () => clearTimeout(t);
  }, []);

  const typeColor = (t: string) =>
    t === 'arch' ? 'var(--color-accent)' : t === 'dev' ? 'var(--color-primary)' : 'var(--color-success)';

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Header */}
      <div className="animate-fade-in-up" style={{ marginBottom: '48px' }}>
        <div className="section-label" style={{ marginBottom: '8px' }}>PLAYER PROFILE</div>
        <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, color: 'var(--color-text-bright)', letterSpacing: '0.04em' }}>
          ABOUT<span style={{ color: 'var(--color-primary)' }}>_</span>ME
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
        {/* Bio card */}
        <div className="retro-card animate-fade-in-up delay-100" style={{ padding: '28px', borderRadius: '3px' }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '56px', height: '56px', flexShrink: 0,
                background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(255,107,53,0.1))',
                border: '1px solid var(--color-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem',
              }}
            >
              ஜெಕ
            </div>
            <div>
              <div className="font-display" style={{ color: 'var(--color-text-bright)', fontWeight: 700, fontSize: '1rem' }}>Jay Kay</div>
              <div className="font-mono" style={{ color: 'var(--color-accent)', fontSize: '0.65rem', letterSpacing: '0.1em' }}>ARCHITECT × DEVELOPER</div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <span className="font-mono" style={{ color: 'var(--color-text-dim)', fontSize: '0.62rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={9} /> India
                </span>
                <span className="font-mono" style={{ color: 'var(--color-text-dim)', fontSize: '0.62rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={9} /> Available
                </span>
              </div>
            </div>
          </div>

          <p style={{ color: 'var(--color-text)', fontSize: '0.85rem', lineHeight: 1.75, marginBottom: '16px' }}>
            I started in architecture — learning to see problems spatially,
            understand context, and design at every scale. Then I discovered
            software, and realised both disciplines share the same core skill:
            <span style={{ color: 'var(--color-primary)' }}> systems thinking</span>.
          </p>
          <p style={{ color: 'var(--color-text-dim)', fontSize: '0.82rem', lineHeight: 1.75 }}>
            Today I build at that intersection — physical spaces that are designed
            intelligently, and digital tools that solve real operational problems.
          </p>

          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {['AutoCAD','SketchUp','Revit','React','Node','PostgreSQL'].map(t => (
              <span key={t} className="retro-tag">{t}</span>
            ))}
          </div>
        </div>

        {/* Dual identity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            {
              icon: Building2,
              title: 'THE ARCHITECT',
              color: 'var(--color-accent)',
              points: [
                'Spatial problem solver',
                'Material & structural awareness',
                'Scale from site to detail',
                'Client communication & documentation',
              ],
              action: () => onNavigate('architecture'),
              actionLabel: 'VIEW PROJECTS',
            },
            {
              icon: Code2,
              title: 'THE DEVELOPER',
              color: 'var(--color-primary)',
              points: [
                'Full-stack web applications',
                'Workflow automation tools',
                'Business software products',
                'AI integration & prompt systems',
              ],
              action: () => onNavigate('codelab'),
              actionLabel: 'VIEW CODE LAB',
            },
          ].map(card => (
            <div
              key={card.title}
              className="retro-card animate-fade-in-up delay-200"
              style={{ padding: '20px', borderRadius: '3px', borderLeft: `2px solid ${card.color}` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <card.icon size={16} style={{ color: card.color }} />
                <span className="font-display" style={{ color: card.color, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em' }}>
                  {card.title}
                </span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
                {card.points.map(p => (
                  <li key={p} className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-text-dim)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: card.color, fontSize: '0.5rem' }}>▶</span>{p}
                  </li>
                ))}
              </ul>
              <button
                onClick={card.action}
                className="font-mono"
                style={{
                  background: 'transparent', border: `1px solid ${card.color}`,
                  color: card.color, padding: '6px 16px', fontSize: '0.6rem',
                  letterSpacing: '0.15em', cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {card.actionLabel} →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Skill bars */}
      <div style={{ marginTop: '48px' }}>
        <div className="section-label" style={{ marginBottom: '20px' }}>SKILL TREE — QUICK VIEW</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {SKILLS_QUICK.map((skill, i) => (
            <div key={skill.label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--color-text)', letterSpacing: '0.05em' }}>{skill.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={9} style={{ color: typeColor(skill.type) }} />
                  <span className="font-display" style={{ fontSize: '0.65rem', color: typeColor(skill.type), fontWeight: 700 }}>LV.{skill.lvl}</span>
                </div>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: lvls ? `${(skill.lvl / 10) * 100}%` : '0%',
                    background: `linear-gradient(90deg, ${typeColor(skill.type)}66, ${typeColor(skill.type)})`,
                    boxShadow: `0 0 8px ${typeColor(skill.type)}`,
                    transitionDelay: `${i * 0.08}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => onNavigate('skills')}
          className="font-mono"
          style={{
            marginTop: '20px', background: 'transparent',
            border: '1px solid var(--color-border)', color: 'var(--color-text-dim)',
            padding: '8px 20px', fontSize: '0.62rem', letterSpacing: '0.15em',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
        >
          VIEW FULL SKILL TREE →
        </button>
      </div>

      {/* Timeline */}
      <div style={{ marginTop: '56px', marginBottom: '48px' }}>
        <div className="section-label" style={{ marginBottom: '24px' }}>GAME PROGRESS — TIMELINE</div>
        <div style={{ position: 'relative', paddingLeft: '32px', borderLeft: '1px solid var(--color-border)' }}>
          {TIMELINE.map((item, i) => (
            <div
              key={i}
              className="animate-fade-in-up"
              style={{ marginBottom: '20px', position: 'relative', animationDelay: `${i * 0.06}s` }}
            >
              <div
                style={{
                  position: 'absolute', left: '-37px', top: '4px',
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: typeColor(item.type),
                  boxShadow: `0 0 6px ${typeColor(item.type)}`,
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="font-display" style={{ color: 'var(--color-text-dim)', fontSize: '0.65rem', fontWeight: 700, minWidth: '36px' }}>
                  {item.year}
                </span>
                <span style={{ color: 'var(--color-text)', fontSize: '0.8rem' }}>{item.event}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spotify Now Playing */}
      <NowPlaying />
</div>
  );
}

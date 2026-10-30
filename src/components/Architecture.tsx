import { useState } from 'react';
import { MapPin, Eye, Grid2x2 as Grid, List } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    name: 'VERDANA RESIDENCE',
    location: 'Kerala, India',
    year: '2023',
    type: 'Residential',
    status: 'BUILT',
    concept: 'A courtyard house that mediates between dense urban fabric and natural light. Every room connects to a layer of greenery.',
    challenge: 'Tight 5-cent plot in a dense neighbourhood with neighbour setback constraints.',
    solution: 'Vertical layering — green terraces instead of horizontal gardens. Borrowed light from a central skylit void.',
    tags: ['Residential', 'Courtyard', 'Tropical'],
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    drawings: true,
  },
  {
    id: 2,
    name: 'GRID HOUSE 02',
    location: 'Coimbatore, Tamil Nadu',
    year: '2022',
    type: 'Residential',
    status: 'BUILT',
    concept: 'A modular home designed using a 600mm structural grid. Every wall, opening, and furniture piece is a multiple of the grid.',
    challenge: 'Client needed expandability — the house had to grow with the family.',
    solution: 'Designed a plug-in wing system. Two wings already constructed, third wing ready to add without demolition.',
    tags: ['Modular', 'Grid System', 'Expandable'],
    image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800',
    drawings: true,
  },
  {
    id: 3,
    name: 'SPICE ROUTE MARKET',
    location: 'Kozhikode, Kerala',
    year: '2022',
    type: 'Commercial',
    status: 'CONCEPT',
    concept: 'A market hall that references the historic spice trading routes of Kerala. A linear arcade with variable ceiling heights.',
    challenge: 'Creating a distinct identity for a market in a city over-saturated with generic retail.',
    solution: 'Barrel vault arcade in exposed brick, punctuated by light wells that change the atmosphere across the day.',
    tags: ['Commercial', 'Heritage Ref', 'Public Space'],
    image: 'https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=800',
    drawings: false,
  },
  {
    id: 4,
    name: 'PAVILION 01',
    location: 'Thrissur, Kerala',
    year: '2021',
    type: 'Pavilion',
    status: 'BUILT',
    concept: 'A bamboo-steel hybrid pavilion for a cultural event. Designed for assembly in 3 days, disassembly in 1.',
    challenge: 'Budget of ₹2L, 180sqft footprint, needs to seat 40 people and withstand monsoon rain.',
    solution: 'Tension-compression bamboo structure with GI sheet roof. All joints designed for hand tools only.',
    tags: ['Bamboo', 'Temporary', 'Low-budget'],
    image: 'https://images.pexels.com/photos/1109354/pexels-photo-1109354.jpeg?auto=compress&cs=tinysrgb&w=800',
    drawings: true,
  },
  {
    id: 5,
    name: 'DIGITAL-PHYSICAL WORKSPACE',
    location: 'Bangalore, Karnataka',
    year: '2024',
    type: 'Interior',
    status: 'CONCEPT',
    concept: 'A co-working interior designed for hybrid teams — physical presence and remote collaboration treated equally.',
    challenge: 'Most offices are optimised for in-person; remote workers become second class citizens.',
    solution: 'Camera-optimised booths, directional acoustics, and digital whiteboards at every collaboration node.',
    tags: ['Interior', 'Hybrid Work', 'Tech-integrated'],
    image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800',
    drawings: false,
  },
];

const TYPE_COLORS: Record<string, string> = {
  'BUILT':   'var(--color-success)',
  'CONCEPT': 'var(--color-warning)',
  'WIP':     'var(--color-accent)',
};

export default function Architecture() {
  const [selected, setSelected] = useState<number | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<string>('ALL');

  const filters = ['ALL', 'Residential', 'Commercial', 'Pavilion', 'Interior'];
  const filtered = filter === 'ALL' ? PROJECTS : PROJECTS.filter(p => p.type === filter);
  const activeProject = PROJECTS.find(p => p.id === selected);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Header */}
      <div className="animate-fade-in-up" style={{ marginBottom: '40px' }}>
        <div className="section-label" style={{ marginBottom: '8px' }}>ARCHITECTURE_PORTFOLIO.DB</div>
        <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, color: 'var(--color-text-bright)', letterSpacing: '0.04em' }}>
          BUILT<span style={{ color: 'var(--color-accent)' }}>_</span>WORK
        </h2>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '4px', flex: 1, flexWrap: 'wrap' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="font-mono"
              style={{
                background: filter === f ? 'rgba(255,107,53,0.08)' : 'transparent',
                border: `1px solid ${filter === f ? 'rgba(255,107,53,0.4)' : 'var(--color-border)'}`,
                color: filter === f ? 'var(--color-accent)' : 'var(--color-text-dim)',
                padding: '5px 14px', fontSize: '0.62rem', letterSpacing: '0.1em',
                cursor: 'pointer', transition: 'all 0.15s', borderRadius: '2px',
              }}
            >
              {f}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {([['grid', Grid], ['list', List]] as const).map(([v, Icon]) => (
            <button key={v} onClick={() => setView(v)}
              style={{
                background: view === v ? 'rgba(0,212,255,0.06)' : 'transparent',
                border: `1px solid ${view === v ? 'rgba(0,212,255,0.2)' : 'var(--color-border)'}`,
                color: view === v ? 'var(--color-primary)' : 'var(--color-text-dim)',
                padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center',
              }}
            >
              <Icon size={14} />
            </button>
          ))}
        </div>
      </div>

      {/* Project grid */}
      {!activeProject ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr',
          gap: '16px',
        }}>
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="retro-card animate-fade-in-up"
              style={{
                borderRadius: '3px', overflow: 'hidden', cursor: 'pointer',
                animationDelay: `${i * 0.07}s`,
                display: view === 'list' ? 'grid' : 'flex',
                gridTemplateColumns: view === 'list' ? '200px 1fr' : undefined,
                flexDirection: view === 'grid' ? 'column' : undefined,
              }}
              onClick={() => setSelected(project.id)}
            >
              {view === 'grid' && (
                <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={project.image}
                    alt={project.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', filter: 'grayscale(30%)' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div style={{
                    position: 'absolute', top: '10px', right: '10px',
                    background: 'rgba(10,14,20,0.8)', padding: '3px 8px',
                  }}>
                    <span className="font-mono" style={{ fontSize: '0.6rem', color: TYPE_COLORS[project.status], letterSpacing: '0.1em' }}>
                      {project.status}
                    </span>
                  </div>
                </div>
              )}

              {view === 'list' && (
                <div style={{ height: '120px', overflow: 'hidden' }}>
                  <img src={project.image} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)' }} />
                </div>
              )}

              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div className="font-display" style={{ color: 'var(--color-text-bright)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.06em' }}>
                      {project.name}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <span className="font-mono" style={{ color: 'var(--color-text-dim)', fontSize: '0.6rem', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <MapPin size={8} /> {project.location}
                      </span>
                      <span className="font-mono" style={{ color: 'var(--color-text-dim)', fontSize: '0.6rem' }}>{project.year}</span>
                    </div>
                  </div>
                  {view === 'list' && (
                    <span className="font-mono" style={{ fontSize: '0.6rem', color: TYPE_COLORS[project.status], letterSpacing: '0.1em' }}>
                      {project.status}
                    </span>
                  )}
                </div>
                <p style={{ color: 'var(--color-text-dim)', fontSize: '0.75rem', lineHeight: 1.6, marginBottom: '12px' }}>
                  {project.concept.substring(0, 90)}...
                </p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {project.tags.map(t => <span key={t} className="retro-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Project detail */
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
            ← BACK TO LIST
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <div>
              <img
                src={activeProject.image}
                alt={activeProject.name}
                style={{ width: '100%', height: '260px', objectFit: 'cover', marginBottom: '16px', filter: 'grayscale(10%)' }}
              />
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {activeProject.tags.map(t => <span key={t} className="retro-tag">{t}</span>)}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                <div className="font-display" style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-text-bright)', letterSpacing: '0.05em' }}>
                  {activeProject.name}
                </div>
                <span className="font-mono" style={{ fontSize: '0.6rem', color: TYPE_COLORS[activeProject.status], letterSpacing: '0.12em' }}>
                  [{activeProject.status}]
                </span>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <span className="font-mono" style={{ color: 'var(--color-text-dim)', fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={9} /> {activeProject.location}
                </span>
                <span className="font-mono" style={{ color: 'var(--color-text-dim)', fontSize: '0.65rem' }}>{activeProject.year}</span>
                <span className="font-mono" style={{ color: 'var(--color-text-dim)', fontSize: '0.65rem' }}>{activeProject.type}</span>
              </div>

              {[
                { label: 'CONCEPT', text: activeProject.concept },
                { label: 'CHALLENGE', text: activeProject.challenge },
                { label: 'SOLUTION', text: activeProject.solution },
              ].map(block => (
                <div key={block.label} style={{ marginBottom: '20px' }}>
                  <div className="section-label" style={{ marginBottom: '6px' }}>{block.label}</div>
                  <p style={{ color: 'var(--color-text)', fontSize: '0.82rem', lineHeight: 1.75 }}>{block.text}</p>
                </div>
              ))}

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '16px' }}>
                <Eye size={12} style={{ color: 'var(--color-text-dim)' }} />
                <span className="font-mono" style={{ color: 'var(--color-text-dim)', fontSize: '0.62rem' }}>
                  {activeProject.drawings ? 'DRAWINGS AVAILABLE ON REQUEST' : 'CONCEPT STAGE — DRAWINGS IN PROGRESS'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

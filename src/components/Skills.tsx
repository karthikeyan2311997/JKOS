import { useState, useEffect } from 'react';
import { Building2, Code2, Brain, Package } from 'lucide-react';

const SKILL_TREE = {
  architecture: {
    label: 'ARCHITECTURE',
    color: 'var(--color-accent)',
    icon: Building2,
    skills: [
      { name: 'Architectural Design',   lvl: 9, xp: 920 },
      { name: 'Site Planning',          lvl: 9, xp: 890 },
      { name: 'Construction Documents', lvl: 8, xp: 830 },
      { name: 'AutoCAD',                lvl: 9, xp: 940 },
      { name: 'SketchUp',               lvl: 8, xp: 810 },
      { name: 'Revit',                  lvl: 6, xp: 620 },
      { name: 'Client Communication',   lvl: 8, xp: 820 },
      { name: 'Vernacular Architecture',lvl: 8, xp: 800 },
    ],
  },
  development: {
    label: 'DEVELOPMENT',
    color: 'var(--color-primary)',
    icon: Code2,
    skills: [
      { name: 'React',          lvl: 8, xp: 840 },
      { name: 'TypeScript',     lvl: 7, xp: 720 },
      { name: 'Node.js',        lvl: 7, xp: 740 },
      { name: 'PostgreSQL',     lvl: 7, xp: 700 },
      { name: 'Vite',           lvl: 8, xp: 820 },
      { name: 'Tailwind CSS',   lvl: 9, xp: 900 },
      { name: 'Supabase',       lvl: 7, xp: 710 },
      { name: 'REST APIs',      lvl: 7, xp: 750 },
    ],
  },
  systems: {
    label: 'SYSTEMS THINKING',
    color: 'var(--color-success)',
    icon: Brain,
    skills: [
      { name: 'Problem Framing',    lvl: 9, xp: 950 },
      { name: 'Product Design',     lvl: 8, xp: 820 },
      { name: 'Workflow Analysis',  lvl: 8, xp: 800 },
      { name: 'AI Prompt Eng.',     lvl: 8, xp: 790 },
      { name: 'Research',           lvl: 8, xp: 810 },
      { name: 'Documentation',      lvl: 7, xp: 720 },
    ],
  },
};

const EQUIPPED = [
  { category: 'FRONTEND',  items: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS'] },
  { category: 'BACKEND',   items: ['Node.js', 'Express', 'Supabase', 'PostgreSQL'] },
  { category: 'ARCH CAD',  items: ['AutoCAD', 'SketchUp', 'Revit', 'Photoshop'] },
  { category: 'WORKFLOW',  items: ['Git', 'Figma', 'Notion', 'WhatsApp API'] },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<keyof typeof SKILL_TREE>('architecture');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  const tree = SKILL_TREE[activeTab];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <div className="animate-fade-in-up" style={{ marginBottom: '40px' }}>
        <div className="section-label" style={{ marginBottom: '8px' }}>INVENTORY.SYS</div>
        <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, color: 'var(--color-text-bright)', letterSpacing: '0.04em' }}>
          SKILLS<span style={{ color: 'var(--color-warning)' }}>_</span>TREE
        </h2>
      </div>

      {/* Overall stats */}
      <div className="animate-fade-in-up delay-100" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '40px' }}>
        {[
          { label: 'OVERALL LEVEL', value: '08', color: 'var(--color-warning)' },
          { label: 'ARCH POINTS',   value: '920', color: 'var(--color-accent)' },
          { label: 'DEV POINTS',    value: '840', color: 'var(--color-primary)' },
          { label: 'SYS POINTS',    value: '950', color: 'var(--color-success)' },
        ].map(stat => (
          <div key={stat.label} className="retro-card" style={{ padding: '16px', textAlign: 'center' }}>
            <div className="font-display" style={{ color: stat.color, fontSize: '1.6rem', fontWeight: 900, lineHeight: 1 }}>
              {stat.value}
            </div>
            <div className="section-label" style={{ marginTop: '6px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Skill tree tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {(Object.keys(SKILL_TREE) as Array<keyof typeof SKILL_TREE>).map(key => {
          const t = SKILL_TREE[key];
          return (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setLoaded(false); setTimeout(() => setLoaded(true), 100); }}
              className="font-mono"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px',
                background: activeTab === key ? `${t.color}10` : 'transparent',
                border: `1px solid ${activeTab === key ? `${t.color}40` : 'var(--color-border)'}`,
                color: activeTab === key ? t.color : 'var(--color-text-dim)',
                fontSize: '0.65rem', letterSpacing: '0.1em', cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <t.icon size={12} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Skill bars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '48px' }}>
        {tree.skills.map((skill, i) => (
          <div key={skill.name} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-text)', letterSpacing: '0.03em' }}>
                {skill.name}
              </span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="font-mono" style={{ fontSize: '0.58rem', color: 'var(--color-text-dim)' }}>
                  {skill.xp} XP
                </span>
                <span className="font-display" style={{ fontSize: '0.65rem', color: tree.color, fontWeight: 700 }}>
                  LV.{skill.lvl}
                </span>
              </div>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: loaded ? `${(skill.lvl / 10) * 100}%` : '0%',
                  background: `linear-gradient(90deg, ${tree.color}66, ${tree.color})`,
                  boxShadow: `0 0 8px ${tree.color}`,
                  transitionDelay: `${i * 0.06}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Equipped stack */}
      <div>
        <div className="section-label" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Package size={11} />
          EQUIPPED STACK
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
          {EQUIPPED.map((cat, i) => (
            <div
              key={cat.category}
              className="retro-card animate-fade-in-up"
              style={{ padding: '16px', borderRadius: '3px', animationDelay: `${i * 0.08}s` }}
            >
              <div className="section-label" style={{ marginBottom: '12px' }}>{cat.category}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {cat.items.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '5px', height: '5px', background: 'var(--color-primary)', borderRadius: '50%', flexShrink: 0 }} />
                    <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--color-text)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

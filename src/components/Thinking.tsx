import { useState } from 'react';
import { BookOpen, Cpu, Lightbulb, ArrowRight } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    title: 'The Grid as Universal Language',
    category: 'ARCHITECTURE',
    type: 'essay',
    color: 'var(--color-accent)',
    icon: BookOpen,
    date: '2024-11',
    summary: "Whether you're laying out a building or a UI, the grid does the same job: it imposes order on chaos while leaving room for variation. I've started seeing grids everywhere I design — from structural column grids to CSS Grid.",
    body: `Every architect is taught the grid. 600mm, 900mm, 1200mm — multiples of the human hand and the material module. Every developer encounters CSS Grid. At first these seem like different tools for different problems. But they're not.

Both are systems that answer the same question: how do you place things in space so that they feel ordered, intentional, and scalable?

In architecture, a grid gives you column positions, which give you beam spans, which determine your room sizes, which shape the building. One decision ripples. In code, a grid system gives you alignment, which gives you visual rhythm, which shapes perception. Same cascade.

What I find fascinating is that most architects don't think about their grid system mathematically, and most UI developers don't think about their grid system spatially. But they're solving the same class of problem.

The best work — in either field — usually comes from people who understand the grid deeply enough to know when to break it.`,
    tags: ['Design Systems', 'Architecture', 'UI'],
  },
  {
    id: 2,
    title: 'Why Small Businesses in India Need Different Software',
    category: 'PRODUCT',
    type: 'analysis',
    color: 'var(--color-primary)',
    icon: Cpu,
    date: '2024-09',
    summary: 'Western SaaS assumes stable electricity, a credit card, English literacy, and a salaried employee to maintain the system. None of these are safe assumptions in tier-2 India. The product design implications are significant.',
    body: `When I built Sugar Rush, I started with Shopify's model in my head. Point of sale, inventory, reports. Clean. Logical. Wrong.

The first thing the bakery owner told me: "I don't always have internet." So the app needs offline mode. Not as a feature — as the default assumption.

Second thing: "My staff uses it." Staff who aren't always literate in English, who need the interface in their language, who should not be able to accidentally delete six months of data.

Third thing: Price. ₹999/month for a product tool is a lot for a business making ₹30,000/month net. The software needs to earn its subscription cost visibly — otherwise it gets cancelled.

These aren't "edge cases." They are the main case for this market. And no major SaaS product is designed for it, which means there's a real market waiting.

The design principles that emerge:
1. Offline-first
2. Malayalam/Tamil UI option
3. Aggressive undo, almost no destructive actions
4. ROI visible on the dashboard — show the owner what the software is saving them
5. WhatsApp integration because that's where business communication actually happens`,
    tags: ['Product Thinking', 'India Market', 'Software Design'],
  },
  {
    id: 3,
    title: 'Prompting as Architecture',
    category: 'AI',
    type: 'experiment',
    color: 'var(--color-success)',
    icon: Cpu,
    date: '2024-08',
    summary: "A well-structured prompt has the same properties as a well-designed architectural brief: clear constraints, defined outcomes, understood context, and space for creative interpretation. I've been exploring this parallel.",
    body: `When you write a good architectural brief, you do several things:
- Define the user and their needs
- Establish the constraints (site, budget, regulations)
- Communicate the intent without over-specifying the solution
- Leave room for the designer's interpretation

When you write a good prompt, you do the same things. The mistake people make with both is either over-specifying (leaving no room for intelligence) or under-specifying (getting random noise back).

I've started structuring my prompts like I structure briefs:

1. Context — who is this for, what is the situation
2. Constraints — what must be true about the output
3. Intent — what is the underlying goal
4. Format — how should the response be structured

This isn't a "prompt hack." It's just good communication design. The model — like a good architect or developer — will respond to the quality of the brief you give it.

The interesting corollary: the better I got at writing architectural briefs, the better my prompts got. And vice versa. Both skills are fundamentally about precise communication under uncertainty.`,
    tags: ['AI', 'Prompt Engineering', 'Communication'],
  },
  {
    id: 4,
    title: 'The Vernacular Tech Stack',
    category: 'EXPERIMENT',
    type: 'experiment',
    color: 'var(--color-warning)',
    icon: Lightbulb,
    date: '2024-06',
    summary: 'What if we designed software tools the same way vernacular architects designed buildings — using local materials, local knowledge, solving local problems, without importing foreign patterns that don\'t fit?',
    body: `Kerala's vernacular architecture is extraordinary — not because it imported foreign styles, but because it solved local problems with local materials. The nalukettu courtyard isn't just beautiful; it's a passive cooling system that works in a humid tropical climate.

Western software patterns are often like importing European minimalism into a tropical climate — it looks good but doesn't work. Dark mode might be lovely in San Francisco. In rural Tamil Nadu where most usage is outdoor daytime with glare, a high-contrast light mode is more usable.

The "Vernacular Tech Stack" is a design philosophy I'm developing:

- Use what's available: WhatsApp over push notifications. UPI over Stripe. SMS over email.
- Respect local literacy: Design for the actual education level of users, not the assumed one.
- Fit the environment: Rural connectivity patterns, power backup assumptions, shared device scenarios.
- Respect local time: Business hours differ. Cultural events affect usage. Calendar integrations should know Onam exists.

This isn't localization in the translate-the-interface sense. It's design that starts from local reality and builds up, rather than importing global patterns and trying to adapt.`,
    tags: ['Design Philosophy', 'India', 'UX Research'],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  'ARCHITECTURE': 'var(--color-accent)',
  'PRODUCT':      'var(--color-primary)',
  'AI':           'var(--color-success)',
  'EXPERIMENT':   'var(--color-warning)',
};

export default function Thinking() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = POSTS.find(p => p.id === selected);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <div className="animate-fade-in-up" style={{ marginBottom: '40px' }}>
        <div className="section-label" style={{ marginBottom: '8px' }}>THINKING.LOG</div>
        <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, color: 'var(--color-text-bright)', letterSpacing: '0.04em' }}>
          THINKING<span style={{ color: 'var(--color-success)' }}>_</span>OUT_LOUD
        </h2>
        <p style={{ color: 'var(--color-text-dim)', fontSize: '0.82rem', marginTop: '10px', maxWidth: '480px', lineHeight: 1.7 }}>
          Essays, experiments, and ideas from building at the intersection of space and software.
        </p>
      </div>

      {!active ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {POSTS.map((post, i) => (
            <div
              key={post.id}
              className="retro-card animate-fade-in-up"
              style={{
                padding: '24px', borderRadius: '3px', cursor: 'pointer',
                borderLeft: `2px solid ${CATEGORY_COLORS[post.category]}`,
                animationDelay: `${i * 0.08}s`,
              }}
              onClick={() => setSelected(post.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="font-mono" style={{ fontSize: '0.58rem', color: CATEGORY_COLORS[post.category], letterSpacing: '0.12em', padding: '2px 6px', border: `1px solid ${CATEGORY_COLORS[post.category]}30`, background: `${CATEGORY_COLORS[post.category]}08` }}>
                      {post.category}
                    </span>
                    <span className="font-mono" style={{ fontSize: '0.58rem', color: 'var(--color-text-dim)', letterSpacing: '0.1em' }}>
                      {post.date}
                    </span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-bright)', letterSpacing: '0.04em', marginBottom: '8px' }}>
                    {post.title}
                  </h3>
                  <p style={{ color: 'var(--color-text-dim)', fontSize: '0.78rem', lineHeight: 1.7, maxWidth: '560px' }}>
                    {post.summary}
                  </p>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '12px', flexWrap: 'wrap' }}>
                    {post.tags.map(t => <span key={t} className="retro-tag">{t}</span>)}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-dim)', flexShrink: 0 }}>
                  <span className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.08em' }}>READ</span>
                  <ArrowRight size={12} />
                </div>
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
              letterSpacing: '0.12em', cursor: 'pointer', marginBottom: '32px',
            }}
          >
            ← BACK TO THINKING
          </button>

          <div style={{ maxWidth: '680px' }}>
            <div style={{ marginBottom: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className="font-mono" style={{ fontSize: '0.58rem', color: CATEGORY_COLORS[active.category], letterSpacing: '0.12em', padding: '2px 6px', border: `1px solid ${CATEGORY_COLORS[active.category]}30` }}>
                {active.category}
              </span>
              <span className="font-mono" style={{ color: 'var(--color-text-dim)', fontSize: '0.58rem' }}>{active.date}</span>
            </div>

            <h1 className="font-display" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 900, color: 'var(--color-text-bright)', letterSpacing: '0.04em', marginBottom: '24px', lineHeight: 1.2 }}>
              {active.title}
            </h1>

            <div style={{ borderLeft: `2px solid ${CATEGORY_COLORS[active.category]}`, paddingLeft: '20px', marginBottom: '32px' }}>
              <p style={{ color: 'var(--color-text)', fontSize: '0.9rem', lineHeight: 1.8, fontStyle: 'italic' }}>
                {active.summary}
              </p>
            </div>

            <div style={{ color: 'var(--color-text)', fontSize: '0.85rem', lineHeight: 1.9 }}>
              {active.body.split('\n\n').map((para, i) => (
                <p key={i} style={{ marginBottom: '20px' }}>{para}</p>
              ))}
            </div>

            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {active.tags.map(t => <span key={t} className="retro-tag">{t}</span>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

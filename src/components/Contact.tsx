import { useState, useRef } from 'react';
import { Mail, Linkedin, Phone, FileText, Send, CheckCircle } from 'lucide-react';

const LINES = [
  "I'm open to architecture commissions, development projects,",
  "and building things that sit at the intersection of both.",
  "",
  "If you have a real problem that needs thoughtful design —",
  "physical or digital — let's talk.",
];

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: 'EMAIL',
    value: 'jay@jayk.in',
    href: 'mailto:jay@jayk.in',
    color: 'var(--color-primary)',
  },
  {
    icon: Linkedin,
    label: 'LINKEDIN',
    value: 'linkedin.com/in/jaykay',
    href: '#',
    color: 'var(--color-primary)',
  },
  {
    icon: Phone,
    label: 'WHATSAPP',
    value: '+91 XXXXX XXXXX',
    href: '#',
    color: 'var(--color-success)',
  },
  {
    icon: FileText,
    label: 'RESUME',
    value: 'Download CV',
    href: '#',
    color: 'var(--color-accent)',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  };

  const handleTerminal = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    const cmd = terminalInput.trim().toLowerCase();
    let response = '';

    if (cmd === 'hello' || cmd === 'hi') response = '> Hello there. Use the form above or check contact links.';
    else if (cmd === 'whoami') response = '> You are a visitor. Welcome to JAYK_OS.';
    else if (cmd === 'contact') response = '> jay@jayk.in — or use the form.';
    else if (cmd === 'skills') response = '> Architecture LV.9 | React LV.8 | Systems Thinking LV.9';
    else if (cmd === 'help') response = '> Commands: hello, whoami, contact, skills, clear';
    else if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else response = `> Command not found: "${cmd}". Type "help" for available commands.`;

    setTerminalHistory(h => [...h, `$ ${terminalInput}`, response]);
    setTerminalInput('');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>
      <div className="animate-fade-in-up" style={{ marginBottom: '48px' }}>
        <div className="section-label" style={{ marginBottom: '8px' }}>END_GAME.SCREEN</div>
        <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, color: 'var(--color-text-bright)', letterSpacing: '0.04em' }}>
          CONTACT<span style={{ color: 'var(--color-primary)' }}>_</span>ME
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
        {/* Left: Links + intro */}
        <div>
          <div className="terminal-window animate-fade-in-up delay-100" style={{ marginBottom: '24px' }}>
            <div className="terminal-header">
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28c840' }} />
              <span className="font-mono" style={{ marginLeft: '8px', color: 'var(--color-text-dim)', fontSize: '0.62rem' }}>
                jay_kay — intro.txt
              </span>
            </div>
            <div style={{ padding: '20px' }}>
              {LINES.map((line, i) => (
                <div
                  key={i}
                  className="font-mono animate-fade-in-up"
                  style={{
                    fontSize: '0.75rem',
                    lineHeight: '1.9',
                    color: line === '' ? 'transparent' : 'var(--color-text)',
                    animationDelay: `${0.1 + i * 0.08}s`,
                    opacity: 0,
                  }}
                >
                  {line || '\u00A0'}
                </div>
              ))}
            </div>
          </div>

          {/* Contact links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {CONTACT_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className="retro-card animate-fade-in-up"
                style={{
                  padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: '12px',
                  textDecoration: 'none',
                  animationDelay: `${0.2 + i * 0.07}s`,
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    width: '32px', height: '32px', flexShrink: 0,
                    background: `${link.color}10`,
                    border: `1px solid ${link.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <link.icon size={14} style={{ color: link.color }} />
                </div>
                <div>
                  <div className="section-label" style={{ marginBottom: '2px' }}>{link.label}</div>
                  <div className="font-mono" style={{ color: 'var(--color-text)', fontSize: '0.72rem' }}>{link.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right: Form + Terminal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Message form */}
          {!sent ? (
            <form
              onSubmit={handleSubmit}
              className="animate-fade-in-up delay-200"
              style={{ opacity: 0 }}
            >
              <div className="section-label" style={{ marginBottom: '16px' }}>SEND MESSAGE</div>
              {[
                { key: 'name', label: 'YOUR NAME', type: 'text', placeholder: 'Jay Kay' },
                { key: 'email', label: 'EMAIL', type: 'email', placeholder: 'you@example.com' },
              ].map(field => (
                <div key={field.key} style={{ marginBottom: '16px' }}>
                  <label className="font-mono" style={{ display: 'block', color: 'var(--color-text-dim)', fontSize: '0.6rem', letterSpacing: '0.12em', marginBottom: '6px' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    value={form[field.key as 'name' | 'email']}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    className="font-mono"
                    style={{
                      width: '100%', background: 'white',
                      border: '2px solid var(--color-border)',
                      color: 'var(--color-text)', padding: '8px 12px',
                      fontSize: '0.78rem', outline: 'none',
                      transition: 'border-color 0.15s',
                      boxShadow: 'inset 1px 1px 0px rgba(0,0,0,0.05)',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; }}
                    onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                  />
                </div>
              ))}
              <div style={{ marginBottom: '20px' }}>
                <label className="font-mono" style={{ display: 'block', color: 'var(--color-text-dim)', fontSize: '0.6rem', letterSpacing: '0.12em', marginBottom: '6px' }}>
                  MESSAGE
                </label>
                <textarea
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="font-mono"
                  style={{
                    width: '100%', background: 'white',
                    border: '2px solid var(--color-border)',
                    color: 'var(--color-text)', padding: '8px 12px',
                    fontSize: '0.78rem', outline: 'none', resize: 'vertical',
                    transition: 'border-color 0.15s',
                    boxShadow: 'inset 1px 1px 0px rgba(0,0,0,0.05)',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--color-primary)'; }}
                  onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="font-mono"
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'var(--color-primary)',
                  border: '2px solid var(--color-primary-dim)',
                  color: 'white', padding: '8px 24px',
                  fontSize: '0.68rem', letterSpacing: '0.15em', fontWeight: 'bold',
                  cursor: sending ? 'wait' : 'pointer',
                  transition: 'all 0.2s', width: '100%', justifyContent: 'center',
                  boxShadow: 'inset 1px 1px 0px rgba(255,255,255,0.3), 2px 2px 0px rgba(0,0,0,0.2)',
                }}
              >
                <Send size={12} />
                {sending ? 'TRANSMITTING...' : 'SEND MESSAGE'}
              </button>
            </form>
          ) : (
            <div className="animate-fade-in" style={{ textAlign: 'center', padding: '40px 0' }}>
              <CheckCircle size={36} style={{ color: 'var(--color-success)', marginBottom: '16px' }} />
              <div className="font-display" style={{ color: 'var(--color-success)', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '8px' }}>
                MESSAGE TRANSMITTED
              </div>
              <p className="font-mono" style={{ color: 'var(--color-text-dim)', fontSize: '0.72rem' }}>
                I'll get back to you within 24 hours.
              </p>
            </div>
          )}

          {/* Mini terminal */}
          <div>
            <div className="section-label" style={{ marginBottom: '8px' }}>OR — USE THE TERMINAL</div>
            <div
              className="terminal-window"
              style={{ cursor: 'text' }}
              onClick={() => inputRef.current?.focus()}
            >
              <div className="terminal-header">
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#28c840' }} />
                <span className="font-mono" style={{ marginLeft: '8px', color: 'var(--color-text-dim)', fontSize: '0.6rem' }}>
                  jayk_os — terminal
                </span>
              </div>
              <div style={{ padding: '12px 16px', minHeight: '120px', maxHeight: '200px', overflowY: 'auto' }}>
                <div className="font-mono" style={{ color: 'var(--color-text-dim)', fontSize: '0.65rem', marginBottom: '8px' }}>
                  Type "help" for available commands.
                </div>
                {terminalHistory.map((line, i) => (
                  <div key={i} className="font-mono" style={{
                    fontSize: '0.7rem',
                    color: line.startsWith('>') ? 'var(--color-primary)' : 'var(--color-text)',
                    lineHeight: '1.7',
                  }}>
                    {line}
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <span className="font-mono" style={{ color: 'var(--color-primary)', fontSize: '0.7rem' }}>$</span>
                  <input
                    ref={inputRef}
                    value={terminalInput}
                    onChange={e => setTerminalInput(e.target.value)}
                    onKeyDown={handleTerminal}
                    className="font-mono"
                    style={{
                      background: 'transparent', border: 'none', outline: 'none',
                      color: 'var(--color-text)', fontSize: '0.7rem', flex: 1,
                    }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                  <span className="cursor-blink font-mono" style={{ fontSize: '0.7rem' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

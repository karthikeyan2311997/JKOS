import { useState, useEffect } from 'react';
import BootScreen from './components/BootScreen';
import MainMenu from './components/MainMenu';
import Navigation from './components/Navigation';
import About from './components/About';
import Architecture from './components/Architecture';
import CodeLab from './components/CodeLab';
import Thinking from './components/Thinking';
import Skills from './components/Skills';
import Contact from './components/Contact';

export type Section = 'boot' | 'menu' | 'about' | 'architecture' | 'codelab' | 'thinking' | 'skills' | 'contact';
export type Theme = 'light' | 'dark';

function App() {
  const [section, setSection] = useState<Section>('boot');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const navigate = (target: Section) => {
    setSection(target);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && section !== 'boot' && section !== 'menu') {
        navigate('menu');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [section]);

  if (section === 'boot') {
    return <BootScreen onComplete={() => setSection('menu')} />;
  }

  if (section === 'menu') {
    return <MainMenu onNavigate={navigate} theme={theme} onThemeToggle={toggleTheme} />;
  }

  return (
    <div className="min-h-screen grid-pattern" style={{ background: 'var(--color-bg)' }}>
      <Navigation current={section} onNavigate={navigate} theme={theme} onThemeToggle={toggleTheme} />
      <main className="pt-16">
        {section === 'about'        && <About onNavigate={navigate} />}
        {section === 'architecture' && <Architecture />}
        {section === 'codelab'      && <CodeLab />}
        {section === 'thinking'     && <Thinking />}
        {section === 'skills'       && <Skills />}
        {section === 'contact'      && <Contact />}
      </main>
    </div>
  );
}

export default App;

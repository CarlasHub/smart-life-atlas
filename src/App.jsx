import { useEffect, useRef, useState } from 'react';
import { Home as HomeScreen } from './components/Home';
import { Briefing } from './components/Briefing';
import { Memory } from './components/Memory';
import { AskAtlas } from './components/AskAtlas';
import { Connect } from './components/Connect';
import { Guide } from './components/Guide';
import { AtlasLogo } from './components/AtlasLogo';
import { Home, Zap, History, MessageSquare, ShieldCheck, Info } from 'lucide-react';
import './styles/main.scss';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'briefing', label: 'Briefing', icon: Zap },
  { id: 'memory', label: 'Memory', icon: History },
  { id: 'ask', label: 'Ask Atlas', icon: MessageSquare },
  { id: 'connect', label: 'Connect', icon: ShieldCheck },
  { id: 'guide', label: 'Guide', icon: Info },
];

function App() {
  const [activeView, setActiveView] = useState('home');
  const [activeDimensions, setActiveDimensions] = useState(['health', 'travel', 'integrity', 'family', 'memory']);
  const mainViewportRef = useRef(null);

  useEffect(() => {
    if (mainViewportRef.current) {
      mainViewportRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [activeView]);

  const toggleDimension = (id) => {
    setActiveDimensions((prev) =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const renderView = () => {
    switch (activeView) {
      case 'briefing':
        return <Briefing activeDimensions={activeDimensions} onNavigate={setActiveView} />;
      case 'memory':
        return <Memory activeDimensions={activeDimensions} onNavigate={setActiveView} />;
      case 'ask':
        return <AskAtlas activeDimensions={activeDimensions} onNavigate={setActiveView} />;
      case 'connect':
        return <Connect activeDimensions={activeDimensions} onToggle={toggleDimension} />;
      case 'guide':
        return <Guide activeDimensions={activeDimensions} onNavigate={setActiveView} />;
      case 'home':
      default:
        return <HomeScreen activeDimensions={activeDimensions} onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <nav className="nav-rail" aria-label="Primary Navigation">
        <div className="nav-brand" aria-hidden="true">
          <span className="brand-mark"><AtlasLogo size={34} /></span>
          <span className="brand-copy">Atlas</span>
        </div>

        <div className="nav-items">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`m3-nav-item ${activeView === id ? 'active' : ''}`}
              onClick={() => setActiveView(id)}
              aria-current={activeView === id ? 'page' : undefined}
            >
              <span className="icon-container"><Icon size={22} aria-hidden="true" /></span>
              <span className="nav-label">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="main-viewport" id="main-content" ref={mainViewportRef}>
        {renderView()}
      </main>
    </div>
  );
}

export default App;

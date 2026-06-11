import { useCallback, useEffect, useRef, useState } from 'react';
import { Home as HomeScreen } from './components/Home';
import { Briefing } from './components/Briefing';
import { Memory } from './components/Memory';
import { AskAtlas } from './components/AskAtlas';
import { Connect } from './components/Connect';
import { Guide } from './components/Guide';
import { AtlasLogo } from './components/AtlasLogo';
import { ProductTour } from './components/ProductTour';
import { APP_SOURCES } from './data/sources';
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

function createInitialSourceSync() {
  const now = Date.now();

  return Object.fromEntries(
    APP_SOURCES.map((source, index) => [
      source.id,
      {
        status: 'idle',
        lastSyncedAt: new Date(now - (index + 2) * 6 * 60 * 1000).toISOString(),
      }
    ])
  );
}

function App() {
  const [activeView, setActiveView] = useState('home');
  const [activeDimensions, setActiveDimensions] = useState(['health', 'travel', 'integrity', 'family', 'memory']);
  const [productTourOpen, setProductTourOpen] = useState(true);
  const [productTourStepIndex, setProductTourStepIndex] = useState(0);
  const [askDemoQuery, setAskDemoQuery] = useState(null);
  const [guideTab, setGuideTab] = useState('steps');
  const [sourceSync, setSourceSync] = useState(createInitialSourceSync);
  const mainViewportRef = useRef(null);
  const syncTimersRef = useRef([]);

  useEffect(() => {
    if (mainViewportRef.current) {
      mainViewportRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [activeView]);

  useEffect(() => () => {
    syncTimersRef.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const toggleDimension = (id) => {
    setActiveDimensions((prev) =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const navigateTo = (view) => {
    if (view === 'guide') {
      setGuideTab('steps');
    }

    setActiveView(view);
  };

  const restoreDemoSources = () => {
    setActiveDimensions(['health', 'travel', 'integrity', 'family', 'memory']);
  };

  const disableTravelForDemo = () => {
    setActiveDimensions(['health', 'integrity', 'family', 'memory']);
  };

  const openGuideSecurity = () => {
    setGuideTab('security');
    setActiveView('guide');
  };

  const askDemoQuestion = (queryId, options = {}) => {
    setAskDemoQuery({
      id: queryId,
      reset: Boolean(options.reset),
      requestId: `${queryId}-${Date.now()}`
    });
  };

  const clearAskDemoQuery = useCallback(() => {
    setAskDemoQuery(null);
  }, []);

  const syncSources = useCallback((sourceIds) => {
    const ids = [...new Set(sourceIds)].filter(Boolean);

    if (!ids.length) {
      return;
    }

    setSourceSync((prev) => {
      const next = { ...prev };
      ids.forEach((id) => {
        next[id] = {
          ...(next[id] || {}),
          status: 'syncing',
        };
      });
      return next;
    });

    const timer = window.setTimeout(() => {
      const syncedAt = new Date().toISOString();

      setSourceSync((prev) => {
        const next = { ...prev };
        ids.forEach((id) => {
          next[id] = {
            ...(next[id] || {}),
            status: 'idle',
            lastSyncedAt: syncedAt,
          };
        });
        return next;
      });

      syncTimersRef.current = syncTimersRef.current.filter((savedTimer) => savedTimer !== timer);
    }, 700);

    syncTimersRef.current.push(timer);
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'briefing':
        return <Briefing activeDimensions={activeDimensions} onNavigate={navigateTo} />;
      case 'memory':
        return <Memory activeDimensions={activeDimensions} onNavigate={navigateTo} />;
      case 'ask':
        return <AskAtlas activeDimensions={activeDimensions} onNavigate={navigateTo} demoQuery={askDemoQuery} onDemoQueryHandled={clearAskDemoQuery} />;
      case 'connect':
        return <Connect activeDimensions={activeDimensions} onToggle={toggleDimension} sourceSync={sourceSync} onSyncSources={syncSources} />;
      case 'guide':
        return <Guide activeDimensions={activeDimensions} onNavigate={navigateTo} activeTab={guideTab} onTabChange={setGuideTab} />;
      case 'home':
      default:
        return <HomeScreen activeDimensions={activeDimensions} onNavigate={navigateTo} />;
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
              onClick={() => navigateTo(id)}
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

      <ProductTour
        isOpen={productTourOpen}
        onClose={() => setProductTourOpen(false)}
        stepIndex={productTourStepIndex}
        onStepChange={setProductTourStepIndex}
        onNavigate={navigateTo}
        onRestoreSources={restoreDemoSources}
        onDisableTravel={disableTravelForDemo}
        onAskDemoQuery={askDemoQuestion}
        onOpenGuideSecurity={openGuideSecurity}
      />
    </div>
  );
}

export default App;

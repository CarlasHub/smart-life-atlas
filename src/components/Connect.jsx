import { Info, ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react';
import { APP_SOURCES, LIFE_DIMENSIONS } from '../data/sources';

export function Connect({ activeDimensions, onToggle }) {
  const isDimensionActive = (id) => activeDimensions.includes(id);
  const isAppActive = (app) => app.dimensions.some(isDimensionActive);

  return (
    <div className="main-content connect-page animate-fade-in">
      <header className="page-kicker">
        <p className="eyebrow">Connect</p>
        <h1 className="text-display-large">Choose the life areas Atlas can read.</h1>
        <p className="text-body-large">Turn on only the synthetic sources you want Atlas to use. Off means unavailable for the narrative, briefing, memory, and assistant answers.</p>
      </header>

      <section className="dimensions-connect" aria-labelledby="life-area-permissions-title">
        <div className="section-heading">
          <p className="eyebrow">Life areas first</p>
          <h2 id="life-area-permissions-title" className="text-headline-medium">Permissions that make sense to people.</h2>
        </div>

        <div className="life-area-grid">
          {LIFE_DIMENSIONS.map((dim) => {
            const isActive = isDimensionActive(dim.id);

            return (
              <article key={dim.id} className={`dimension-card accent-${dim.accent} ${isActive ? 'active' : ''}`}>
                <header className="card-topline">
                  <div className="icon-wrap" aria-hidden="true">
                    <dim.icon size={24} />
                  </div>
                  <button
                    type="button"
                    className="toggle-btn"
                    onClick={() => onToggle(dim.id)}
                    aria-pressed={isActive}
                    aria-label={`${isActive ? 'Disconnect' : 'Connect'} ${dim.label}`}
                  >
                    {isActive ? <ToggleRight size={34} aria-hidden="true" /> : <ToggleLeft size={34} aria-hidden="true" />}
                    <span>{isActive ? 'On' : 'Off'}</span>
                  </button>
                </header>

                <h3 className="text-title-large">{dim.label}</h3>
                <p className="text-body-medium">{dim.learns}</p>

                <div className="source-examples" aria-label={`${dim.label} source examples`}>
                  {dim.sources.map((source) => (
                    <span key={source}>{source}</span>
                  ))}
                </div>

                <footer className="card-footer">
                  <span className="signal-count">{dim.signalCount} signals</span>
                  <span className="privacy">
                    <ShieldCheck size={15} aria-hidden="true" />
                    {dim.reassurance}
                  </span>
                </footer>
              </article>
            );
          })}
        </div>
      </section>

      <section className="app-sources-list" aria-labelledby="app-source-title">
        <div className="section-heading compact">
          <p className="eyebrow">App-level details</p>
          <h2 id="app-source-title" className="text-headline-medium">Synthetic sources behind each area.</h2>
        </div>

        <div className="app-source-grid">
          {APP_SOURCES.map((app) => (
            <article key={app.id} className={`app-item ${isAppActive(app) ? 'available' : ''}`}>
              <div>
                <h3 className="text-title-medium">{app.label}</h3>
                <p className="text-body-medium">{app.learns}</p>
              </div>
              <div className="app-meta">
                <span className="dimension-list">
                  {app.dimensions.map((dimension) => LIFE_DIMENSIONS.find((d) => d.id === dimension)?.label).join(', ')}
                </span>
                <span className="m3-badge-planned">{isAppActive(app) ? 'Enabled by area' : 'Waiting'}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="privacy-disclaimer" aria-label="Privacy reassurance">
        <Info size={22} aria-hidden="true" />
        <div>
          <h2 className="text-title-medium">Your controls are live in the demo.</h2>
          <p className="text-body-medium">Turning a life area off immediately removes it from the life brief, memory retrieval, and Ask Atlas answers.</p>
        </div>
      </aside>
    </div>
  );
}

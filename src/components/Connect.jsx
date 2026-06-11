import { CheckCircle2, Clock3, Info, RefreshCw, ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react';
import { APP_SOURCES, LIFE_DIMENSIONS } from '../data/sources';

function formatSyncTime(value) {
  if (!value) {
    return 'Not synced yet';
  }

  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function getLatestSync(syncItems) {
  const timestamps = syncItems
    .map((item) => item?.lastSyncedAt ? new Date(item.lastSyncedAt).getTime() : 0)
    .filter(Boolean);

  if (!timestamps.length) {
    return null;
  }

  return new Date(Math.max(...timestamps)).toISOString();
}

export function Connect({ activeDimensions, onToggle, sourceSync, onSyncSources }) {
  const isDimensionActive = (id) => activeDimensions.includes(id);
  const isAppActive = (app) => app.dimensions.some(isDimensionActive);
  const activeApps = APP_SOURCES.filter(isAppActive);
  const activeAppIds = activeApps.map((app) => app.id);
  const activeSyncItems = activeAppIds.map((id) => sourceSync[id]);
  const latestSync = getLatestSync(activeSyncItems);
  const isSyncing = activeAppIds.some((id) => sourceSync[id]?.status === 'syncing');

  return (
    <div className="main-content connect-page animate-fade-in">
      <header className="page-kicker">
        <p className="eyebrow">Connect</p>
        <h1 className="text-display-large">Choose the life areas Atlas can read.</h1>
        <p className="text-body-large">Turn on only the synthetic sources you want Atlas to use. Off means unavailable for the narrative, briefing, memory, and assistant answers.</p>
      </header>

      <section className="sync-console" aria-labelledby="sync-console-title" aria-live="polite">
        <div className="section-heading compact">
          <p className="eyebrow">Sync status</p>
          <h2 id="sync-console-title" className="text-headline-medium">Approved app signals are checked before Atlas reasons.</h2>
          <p className="text-body-medium">
            {activeApps.length
              ? `Last full check: ${formatSyncTime(latestSync)} across ${activeApps.length} approved synthetic app ${activeApps.length === 1 ? 'source' : 'sources'}.`
              : 'No app signals are available until at least one life area is connected.'}
          </p>
        </div>

        <div className="sync-console-actions">
          <span className={`sync-state-pill ${isSyncing ? 'syncing' : ''}`}>
            {isSyncing ? <RefreshCw size={17} aria-hidden="true" /> : <CheckCircle2 size={17} aria-hidden="true" />}
            {isSyncing ? 'Syncing approved signals' : 'All approved signals checked'}
          </span>
          <button
            type="button"
            className="m3-button primary"
            onClick={() => onSyncSources(activeAppIds)}
            disabled={!activeAppIds.length || isSyncing}
          >
            <RefreshCw size={18} aria-hidden="true" />
            Sync now
          </button>
        </div>
      </section>

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
          {APP_SOURCES.map((app) => {
            const isActive = isAppActive(app);
            const sync = sourceSync[app.id] || {};
            const appSyncing = sync.status === 'syncing';

            return (
              <article key={app.id} className={`app-item ${isActive ? 'available' : ''}`}>
                <div>
                  <h3 className="text-title-medium">{app.label}</h3>
                  <p className="text-body-medium">{app.learns}</p>
                </div>
                <div className="app-meta">
                  <span className="dimension-list">
                    {app.dimensions.map((dimension) => LIFE_DIMENSIONS.find((d) => d.id === dimension)?.label).join(', ')}
                  </span>
                  <span className="m3-badge-planned">{isActive ? 'Enabled by area' : 'Waiting'}</span>
                  <span className={`app-sync-status ${isActive ? 'synced' : ''} ${appSyncing ? 'syncing' : ''}`}>
                    {appSyncing ? <RefreshCw size={15} aria-hidden="true" /> : <Clock3 size={15} aria-hidden="true" />}
                    {isActive ? `Last sync ${formatSyncTime(sync.lastSyncedAt)}` : 'Not connected'}
                  </span>
                  <button
                    type="button"
                    className="sync-mini-button"
                    onClick={() => onSyncSources([app.id])}
                    disabled={!isActive || appSyncing}
                    aria-label={`Sync ${app.label}`}
                  >
                    <RefreshCw size={15} aria-hidden="true" />
                    {appSyncing ? 'Syncing' : 'Sync'}
                  </button>
                </div>
              </article>
            );
          })}
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

import { CheckCircle2, ChevronRight, Clock, Eye, ShieldCheck } from 'lucide-react';
import { INSIGHTS } from '../data/insights';

export function Briefing({ activeDimensions, onNavigate }) {
  const insight = INSIGHTS[0];
  const isConnected = insight.requiredDimensions.every((d) => activeDimensions.includes(d));

  if (!isConnected) {
    return (
      <div className="main-content briefing-page animate-fade-in">
        <header className="page-kicker">
          <p className="eyebrow">Briefing</p>
          <h1 className="text-display-large">Life Brief is waiting for sources.</h1>
          <p className="text-body-large">Connect Health, Travel, and Integrity to let Atlas read the full synthetic timing conflict.</p>
        </header>

        <section className="locked-panel" aria-label="Required sources">
          <ShieldCheck size={28} aria-hidden="true" />
          <div>
            <h2 className="text-title-large">Required life areas</h2>
            <p className="text-body-medium">Atlas will not produce this briefing until every required source area is connected.</p>
          </div>
          <button type="button" className="m3-button primary" onClick={() => onNavigate('connect')}>
            Connect sources <ChevronRight size={18} aria-hidden="true" />
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="main-content briefing-page animate-fade-in">
      <header className="briefing-hero">
        <div>
          <p className="eyebrow">Life Brief</p>
          <h1 className="text-display-large">{insight.title}</h1>
          <p className="text-body-large">{insight.summary}</p>
        </div>
        <div
          className="confidence-card"
          role="meter"
          aria-label="Insight confidence"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.round(insight.confidence * 100)}
        >
          <span className="text-label-large">Confidence</span>
          <strong>{Math.round(insight.confidence * 100)}%</strong>
          <span>Evidence-backed</span>
        </div>
      </header>

      <section className="life-brief-panel" aria-labelledby="life-brief-title">
        <div className="section-heading compact">
          <p className="eyebrow">Supportive summary</p>
          <h2 id="life-brief-title" className="text-headline-medium">Life Brief</h2>
        </div>
        <p className="text-body-large">{insight.narrative}</p>
      </section>

      <div className="briefing-grid">
        <section className="report-card important-conflict" aria-labelledby="conflict-title">
          <header className="card-heading">
            <Eye size={22} aria-hidden="true" />
            <div>
              <p className="eyebrow">Important conflict found</p>
              <h2 id="conflict-title" className="text-title-large">The medical window and legal deadline do not fit.</h2>
            </div>
          </header>
          <ul className="points">
            {insight.points.map((point) => (
              <li key={point} className="text-body-medium"><CheckCircle2 size={17} aria-hidden="true" />{point}</li>
            ))}
          </ul>
        </section>

        <section className="report-card timeline-reasoning" aria-labelledby="timeline-title">
          <header className="card-heading">
            <Clock size={22} aria-hidden="true" />
            <div>
              <p className="eyebrow">Timeline reasoning</p>
              <h2 id="timeline-title" className="text-title-large">Why Atlas is confident.</h2>
            </div>
          </header>
          <div className="timeline-list">
            {insight.timeline.map((item) => (
              <div key={item.time} className="timeline-item">
                <time>{item.time}</time>
                <div>
                  <h3 className="text-title-medium">{item.title}</h3>
                  <p className="text-body-medium">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="evidence-access" aria-labelledby="evidence-title">
        <div className="section-heading compact">
          <p className="eyebrow">Evidence access</p>
          <h2 id="evidence-title" className="text-headline-medium">Signals behind the brief.</h2>
        </div>
        <div className="evidence-grid">
          {insight.evidence.map((evidence) => (
            <details key={evidence.id} className="evidence-card">
              <summary>
                <span className="evidence-category">{evidence.category}</span>
                <strong>{evidence.label}</strong>
                <span>{evidence.context}</span>
              </summary>
              <p className="text-body-medium">{evidence.detail}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="briefing-grid secondary">
        <section className="report-card resolution-path" aria-labelledby="resolution-title">
          <div className="section-heading compact">
            <p className="eyebrow">Resolution path</p>
            <h2 id="resolution-title" className="text-headline-medium">A safer route is already in the documents.</h2>
          </div>
          <div className="resolution-list">
            {insight.resolutions.map((resolution) => (
              <article key={resolution.id}>
                <h3 className="text-title-medium">{resolution.label}</h3>
                <p className="text-body-medium">{resolution.desc}</p>
                <button type="button" className="m3-button outlined">Action planned</button>
              </article>
            ))}
          </div>
        </section>

        <section className="impact-summary" aria-labelledby="impact-title">
          <p className="eyebrow">Impact summary</p>
          <h2 id="impact-title" className="text-headline-medium">{insight.impactSummary}</h2>
          <p className="text-body-medium">The recommended path is the {insight.workaround}. It keeps the medical instruction intact and gives counsel a concrete next action.</p>
        </section>
      </div>
    </div>
  );
}

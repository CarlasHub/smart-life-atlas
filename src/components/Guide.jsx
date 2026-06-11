import { CheckCircle2, ChevronRight, Cloud, Database, ShieldCheck } from 'lucide-react';
import { SimulatedEnvironment } from './SimulatedEnvironment';

const STEPS = [
  { title: 'Choose life areas', desc: 'Turn on only the areas Atlas may use, such as Health, Travel, Money, Family, Integrity, or Memory.' },
  { title: 'Read your life brief', desc: 'Start with the simple daily story before opening the details.' },
  { title: 'Review hidden conflicts', desc: 'Look for timing problems that normal calendars and notes do not connect.' },
  { title: 'Inspect evidence', desc: 'Open the cited signals so every conclusion remains traceable.' },
  { title: 'Ask Atlas', desc: 'Use preset questions when you want a calmer explanation or a direct next step.' },
  { title: 'Choose a resolution', desc: 'Pick the safest action path and keep the reason visible.' }
];

const PLATFORM_STATUS = [
  {
    title: 'Live web demo',
    desc: 'This page is a static React/Vite demo with local synthetic data. It runs on Vercel or GitHub Pages without a backend.',
    icon: Cloud,
  },
  {
    title: 'Agent proof',
    desc: 'The repo includes Agent Builder instructions, MongoDB-shaped seed data, and a local proof script for source-gated reasoning.',
    icon: Database,
  },
  {
    title: 'Backend path',
    desc: 'A real agent deployment needs Google Cloud Agent Builder, Gemini, MongoDB Atlas, and secrets stored outside the public repo.',
    icon: ShieldCheck,
  },
];

export function Guide({ activeDimensions, onNavigate }) {
  return (
    <div className="main-content guide-page animate-fade-in">
      <header className="page-kicker">
        <p className="eyebrow">Guide</p>
        <h1 className="text-display-large">Start with one clear path.</h1>
        <p className="text-body-large">Atlas is designed for people who need simple wording, visible evidence, and obvious next actions.</p>
      </header>

      <section className="guide-steps" aria-label="First-time user steps">
        {STEPS.map((step, index) => (
          <article key={step.title} className="step-card">
            <div className="number">{index + 1}</div>
            <div className="content">
              <h2 className="text-title-large">{step.title}</h2>
              <p className="text-body-medium">{step.desc}</p>
            </div>
            <CheckCircle2 size={22} aria-hidden="true" />
          </article>
        ))}
      </section>

      <section className="platform-status" aria-labelledby="platform-status-title">
        <div className="section-heading">
          <p className="eyebrow">Platform status</p>
          <h2 id="platform-status-title" className="text-headline-medium">What is live, and what is ready to connect.</h2>
          <p className="text-body-medium">
            The demo is intentionally safe and synthetic. The agent architecture is documented in the repository so it can move to Google Cloud and MongoDB with credentials.
          </p>
        </div>

        <div className="platform-status-grid">
          {PLATFORM_STATUS.map((item) => (
            <article key={item.title} className="platform-card">
              <span className="platform-icon">
                <item.icon size={22} aria-hidden="true" />
              </span>
              <h3 className="text-title-large">{item.title}</h3>
              <p className="text-body-medium">{item.desc}</p>
            </article>
          ))}
        </div>

        <p className="platform-note">
          Use the Vercel link for the live demo and the GitHub link for source code. GitHub Pages is fine for static hosting, but it cannot run the future agent backend.
        </p>
      </section>

      <SimulatedEnvironment activeDimensions={activeDimensions} />

      <footer className="guide-footer">
        <button type="button" className="m3-button primary" onClick={() => onNavigate('connect')}>
          Choose life areas <ChevronRight size={18} aria-hidden="true" />
        </button>
        <button type="button" className="m3-button tonal" onClick={() => onNavigate('briefing')}>
          Read the brief
        </button>
      </footer>
    </div>
  );
}

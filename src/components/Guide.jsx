import { CheckCircle2, ChevronRight } from 'lucide-react';

const STEPS = [
  { title: 'Choose life areas', desc: 'Turn on only the areas Atlas may use, such as Health, Travel, Money, Family, Integrity, or Memory.' },
  { title: 'Read your life brief', desc: 'Start with the simple daily story before opening the details.' },
  { title: 'Review hidden conflicts', desc: 'Look for timing problems that normal calendars and notes do not connect.' },
  { title: 'Inspect evidence', desc: 'Open the cited signals so every conclusion remains traceable.' },
  { title: 'Ask Atlas', desc: 'Use preset questions when you want a calmer explanation or a direct next step.' },
  { title: 'Choose a resolution', desc: 'Pick the safest action path and keep the reason visible.' }
];

export function Guide({ onNavigate }) {
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

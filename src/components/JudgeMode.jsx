import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Map,
  PlayCircle,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  X
} from 'lucide-react';
import { AtlasSpark } from './AtlasSpark';

const STEPS = [
  {
    id: 'start',
    shortLabel: 'Home',
    eyebrow: 'Judge Mode',
    title: 'Run the 60-second Atlas demo.',
    body: 'Start from the morning story, then follow the exact path judges should see: consent, conflict detection, evidence, assistant answer, refusal, and trust model.',
    lookFor: 'A human product experience, not a dashboard.',
    takeaway: 'Atlas frames scattered life signals as one calm daily story.',
    actionLabel: 'Start from Home',
    view: 'home',
    checklist: ['Reset demo sources', 'Open the landing experience'],
  },
  {
    id: 'connect',
    shortLabel: 'Consent',
    eyebrow: 'Consent first',
    title: 'Show that intelligence starts with approval.',
    body: 'Atlas only reasons over connected life areas. The demo opens with Health, Travel, Integrity, Family, and Memory on, while Money stays off.',
    lookFor: 'Life areas come before app-level details.',
    takeaway: 'The product makes consent understandable to normal users.',
    actionLabel: 'Open Connect',
    view: 'connect',
    checklist: ['Life areas are visible', 'Source toggles are real'],
  },
  {
    id: 'briefing',
    shortLabel: 'Conflict',
    eyebrow: 'Hidden conflict',
    title: 'Open the Post-Op Compliance Trap.',
    body: 'This is the strongest demo moment: procedure at 08:00, no flying for 36 hours, flight at 19:30, legal signing Friday 09:00, and a Friday 12:00 deadline.',
    lookFor: 'The medical, travel, and legal facts become one story.',
    takeaway: 'Atlas finds a cross-app risk a normal calendar would miss.',
    actionLabel: 'Open Briefing',
    view: 'briefing',
    checklist: ['Timing conflict visible', '$250,000 risk visible'],
  },
  {
    id: 'evidence',
    shortLabel: 'Evidence',
    eyebrow: 'Evidence layer',
    title: 'Show why Atlas reached the conclusion.',
    body: 'Use the briefing trace and evidence cards to show that Atlas connects source records before suggesting Clause 8.1 as the remote notary path.',
    lookFor: 'The trace, evidence cards, and Clause 8.1 workaround.',
    takeaway: 'Every important claim has a supporting signal.',
    actionLabel: 'Review evidence',
    view: 'briefing',
    checklist: ['Trace is inspectable', 'Clause 8.1 is cited'],
  },
  {
    id: 'ask',
    shortLabel: 'Ask',
    eyebrow: 'Assistant proof',
    title: 'Ask why tomorrow is risky.',
    body: 'Atlas answers from approved synthetic sources. This demonstrates the Gemini-style assistant behavior without a backend or cloud charge.',
    lookFor: 'The assistant sends the preset question and answers from approved sources.',
    takeaway: 'Atlas feels agentic while remaining deterministic and safe.',
    actionLabel: 'Ask the risky question',
    view: 'ask',
    queryId: 'risky',
    resetChat: true,
    checklist: ['Question is sent', 'Answer explains the conflict'],
  },
  {
    id: 'refusal',
    shortLabel: 'Refusal',
    eyebrow: 'Source gate',
    title: 'Turn Travel off and ask again.',
    body: 'This proves Atlas is not just a scripted warning screen. When a required source is unavailable, the assistant refuses instead of guessing.',
    lookFor: 'Travel is removed, then the same question is refused.',
    takeaway: 'Consent changes the answer path immediately.',
    actionLabel: 'Show source refusal',
    view: 'ask',
    disableTravel: true,
    queryId: 'risky',
    checklist: ['Travel is disconnected', 'Assistant refuses cleanly'],
  },
  {
    id: 'security',
    shortLabel: 'Trust',
    eyebrow: 'Trust model',
    title: 'Finish on Trust & security.',
    body: 'Show that the live demo is synthetic and free to open, while the future path is Google Sign-In, Agent Builder, Gemini, and MongoDB MCP.',
    lookFor: 'No cloud calls, synthetic data, and the future backend path.',
    takeaway: 'The demo is safe today and has a credible production architecture.',
    actionLabel: 'Open Trust & security',
    view: 'guide',
    guideTab: 'security',
    restoreSources: true,
    checklist: ['No cloud calls in demo', 'Backend path is clear'],
  },
  {
    id: 'finish',
    shortLabel: 'Ready',
    eyebrow: 'Ready to judge',
    title: 'The core story is complete.',
    body: 'Atlas has shown the full path: approved sources become a daily story, hidden risks become explainable, evidence stays visible, and missing sources stop the answer.',
    lookFor: 'A complete concept, not only isolated screens.',
    takeaway: 'Atlas is a Google ecosystem life intelligence layer with a safe static proof.',
    actionLabel: 'Restart demo',
    view: 'home',
    restoreSources: true,
    checklist: ['Concept is clear', 'No-cost demo path is complete'],
  },
];

export function JudgeMode({
  isOpen,
  onOpen,
  onClose,
  stepIndex,
  onStepChange,
  onNavigate,
  onRestoreSources,
  onDisableTravel,
  onAskDemoQuery,
  onOpenGuideSecurity,
  onResetDemo,
}) {
  const step = STEPS[stepIndex] || STEPS[0];
  const isLastStep = stepIndex === STEPS.length - 1;
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const runStep = () => {
    if (step.restoreSources || step.id === 'start' || step.id === 'connect' || step.id === 'briefing' || step.id === 'evidence' || step.id === 'ask') {
      onRestoreSources();
    }

    if (step.disableTravel) {
      onDisableTravel();
    }

    if (step.guideTab === 'security') {
      onOpenGuideSecurity();
    } else {
      onNavigate(step.view);
    }

    if (step.queryId) {
      onAskDemoQuery(step.queryId, { reset: step.resetChat });
    }

    if (isLastStep) {
      onStepChange(0);
      return;
    }

    onStepChange(stepIndex + 1);
  };

  if (!isOpen) {
    return (
      <button type="button" className="judge-mode-launcher" onClick={onOpen}>
        <span className="judge-launch-icon"><PlayCircle size={20} aria-hidden="true" /></span>
        <span>
          <strong>Judge Mode</strong>
          <small>60-second guided demo</small>
        </span>
      </button>
    );
  }

  return (
    <aside className="judge-mode-panel" aria-label="Judge Mode walkthrough">
      <header className="judge-mode-header">
        <div className="judge-mode-title">
          <AtlasSpark size={34} active />
          <div>
            <p className="eyebrow">{step.eyebrow}</p>
            <h2 className="text-title-large">Guided demo</h2>
          </div>
        </div>
        <button type="button" className="judge-icon-button" onClick={onClose} aria-label="Close Judge Mode">
          <X size={19} aria-hidden="true" />
        </button>
      </header>

      <div className="judge-route" aria-label="Demo route">
        <div className="judge-route-heading">
          <Map size={16} aria-hidden="true" />
          <span>Demo route</span>
        </div>
        <div className="judge-route-steps">
          {STEPS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`judge-route-step ${index === stepIndex ? 'active' : ''} ${index < stepIndex ? 'complete' : ''}`}
              onClick={() => onStepChange(index)}
              aria-current={index === stepIndex ? 'step' : undefined}
            >
              <span>{index + 1}</span>
              <small>{item.shortLabel}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="judge-progress" aria-label={`Step ${stepIndex + 1} of ${STEPS.length}`}>
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="judge-step-copy" aria-live="polite">
        <span className="judge-step-count">Step {stepIndex + 1} of {STEPS.length}</span>
        <h3 className="text-headline-medium">{step.title}</h3>
        <p className="text-body-medium">{step.body}</p>
      </div>

      <div className="judge-proof-list" aria-label="What this step proves">
        {step.checklist.map((item) => (
          <span key={item}>
            {step.id === 'refusal' ? <ShieldCheck size={16} aria-hidden="true" /> : <CheckCircle2 size={16} aria-hidden="true" />}
            {item}
          </span>
        ))}
      </div>

      <div className="judge-context-grid">
        <article>
          <span>Look for</span>
          <p>{step.lookFor}</p>
        </article>
        <article>
          <span>Judge takeaway</span>
          <p>{step.takeaway}</p>
        </article>
      </div>

      <footer className="judge-mode-actions">
        <button
          type="button"
          className="judge-icon-button"
          onClick={() => onStepChange(Math.max(0, stepIndex - 1))}
          aria-label="Previous Judge Mode step"
          disabled={stepIndex === 0}
        >
          <ChevronLeft size={19} aria-hidden="true" />
        </button>

        <button type="button" className="m3-button primary" onClick={runStep}>
          {isLastStep ? <RotateCcw size={17} aria-hidden="true" /> : <Sparkles size={17} aria-hidden="true" />}
          {isLastStep ? 'Restart demo' : step.actionLabel}
        </button>

        <button
          type="button"
          className="judge-icon-button"
          onClick={() => onStepChange(Math.min(STEPS.length - 1, stepIndex + 1))}
          aria-label="Next Judge Mode step"
          disabled={isLastStep}
        >
          <ChevronRight size={19} aria-hidden="true" />
        </button>
      </footer>

      <button type="button" className="judge-reset-button" onClick={onResetDemo}>
        <RotateCcw size={15} aria-hidden="true" />
        Reset demo state
      </button>

      <p className="judge-mode-note">
        <Eye size={15} aria-hidden="true" />
        Built for judging: one clear path through consent, evidence, reasoning, refusal, and trust.
      </p>
    </aside>
  );
}

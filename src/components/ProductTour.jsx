import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, X } from 'lucide-react';
import { AtlasSpark } from './AtlasSpark';

const STEPS = [
  {
    id: 'start',
    shortLabel: 'Home',
    eyebrow: 'Guided tour',
    title: 'Start with the morning story.',
    body: 'Atlas opens like a personal intelligence companion: one clear life narrative, one important insight, and simple next actions.',
    lookFor: 'A human product experience, not a dashboard.',
    actionLabel: 'Next: Consent',
    view: 'home',
    targetSelector: '.hero-actions',
    restoreSources: true,
  },
  {
    id: 'connect',
    shortLabel: 'Consent',
    eyebrow: 'Consent first',
    title: 'Life areas control the reasoning.',
    body: 'The Connect page shows plain-language permission areas before app-level detail. Turning a life area off changes what Atlas can answer.',
    lookFor: 'Life areas come before app-level details.',
    actionLabel: 'Next: Conflict',
    view: 'connect',
    targetSelector: '.life-area-grid .dimension-card',
    restoreSources: true,
  },
  {
    id: 'briefing',
    shortLabel: 'Conflict',
    eyebrow: 'Hidden conflict',
    title: 'The conflict becomes one story.',
    body: 'Atlas connects the 08:00 procedure, 36-hour no-fly rule, 19:30 flight, Friday 09:00 signing, and Friday 12:00 deadline.',
    lookFor: 'The medical, travel, and legal facts become one story.',
    actionLabel: 'Next: Evidence',
    view: 'briefing',
    targetSelector: '.important-conflict',
    restoreSources: true,
  },
  {
    id: 'evidence',
    shortLabel: 'Evidence',
    eyebrow: 'Evidence layer',
    title: 'Every claim has a source.',
    body: 'The evidence section lets a reviewer inspect the signals behind the timing conflict and Clause 8.1 remote notary path.',
    lookFor: 'The trace, evidence cards, and Clause 8.1 workaround.',
    actionLabel: 'Next: Ask',
    view: 'briefing',
    targetSelector: '.evidence-grid .evidence-card',
    restoreSources: true,
  },
  {
    id: 'ask',
    shortLabel: 'Ask',
    eyebrow: 'Assistant proof',
    title: 'The assistant answers from approved sources.',
    body: 'The preset question demonstrates deterministic source-aware reasoning without a backend or cloud charge.',
    lookFor: 'The assistant sends the preset question and answers from approved sources.',
    actionLabel: 'Next: Refusal',
    view: 'ask',
    targetSelector: '.preset-queries',
    queryId: 'risky',
    resetChat: true,
    restoreSources: true,
  },
  {
    id: 'refusal',
    shortLabel: 'Refusal',
    eyebrow: 'Source gate',
    title: 'Missing sources stop the answer.',
    body: 'Travel is turned off, then the same risky-tomorrow question is refused. Atlas does not guess when required context is missing.',
    lookFor: 'Travel is removed, then the same question is refused.',
    actionLabel: 'Next: Trust',
    view: 'ask',
    targetSelector: '.message-list',
    disableTravel: true,
    queryId: 'risky',
  },
  {
    id: 'security',
    shortLabel: 'Trust',
    eyebrow: 'Trust model',
    title: 'The safe demo path is explicit.',
    body: 'Trust & security explains what is live, what is simulated, and how the future Google Sign-In, Agent Builder, Gemini, and MongoDB MCP path would work.',
    lookFor: 'No cloud calls, synthetic data, and the future backend path.',
    actionLabel: 'Next: Finish',
    view: 'guide',
    guideTab: 'security',
    targetSelector: '.platform-status-grid .platform-card',
    restoreSources: true,
  },
  {
    id: 'finish',
    shortLabel: 'Ready',
    eyebrow: 'You are ready',
    title: 'The product story is complete.',
    body: 'The tour has shown the core loop: approved sources become a daily story, hidden risks become explainable, and missing sources block answers.',
    lookFor: 'A complete concept, not only isolated screens.',
    actionLabel: 'Finish tour',
    view: 'home',
    targetSelector: '.insight-main',
    restoreSources: true,
  },
];

const DEFAULT_SPOTLIGHT = {
  top: 88,
  left: 260,
  width: 420,
  height: 260,
};

export function ProductTour({
  isOpen,
  onClose,
  stepIndex,
  onStepChange,
  onNavigate,
  onRestoreSources,
  onDisableTravel,
  onAskDemoQuery,
  onOpenGuideSecurity,
}) {
  const step = STEPS[stepIndex] || STEPS[0];
  const isLastStep = stepIndex === STEPS.length - 1;
  const progress = ((stepIndex + 1) / STEPS.length) * 100;
  const [spotlight, setSpotlight] = useState(DEFAULT_SPOTLIGHT);
  const [cardPosition, setCardPosition] = useState({ top: 112, left: 704 });

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const mainViewport = document.querySelector('.main-viewport');
    let scrollTimer;
    let measureTimer;

    const measure = () => {
      const target = document.querySelector(step.targetSelector) || document.querySelector('.main-content') || document.querySelector('.main-viewport');

      if (!target) {
        setSpotlight(DEFAULT_SPOTLIGHT);
        setCardPosition({ top: 112, left: 704 });
        return;
      }

      const rect = target.getBoundingClientRect();
      const pad = window.innerWidth <= 640 ? 6 : 10;
      const nextSpotlight = {
        top: Math.max(8, rect.top - pad),
        left: Math.max(8, rect.left - pad),
        width: Math.min(window.innerWidth - 16, rect.width + pad * 2),
        height: Math.min(window.innerHeight - 16, rect.height + pad * 2),
      };

      const cardWidth = Math.min(360, window.innerWidth - 32);
      const cardHeight = 250;
      let left = rect.right + 18;
      let top = Math.max(16, rect.top + 16);

      if (left + cardWidth > window.innerWidth - 16) {
        left = rect.left - cardWidth - 18;
      }

      if (left < 16) {
        left = Math.min(window.innerWidth - cardWidth - 16, rect.left + 16);
      }

      if (top + cardHeight > window.innerHeight - 16) {
        top = Math.max(16, window.innerHeight - cardHeight - 16);
      }

      setSpotlight(nextSpotlight);
      setCardPosition({ top, left });
    };

    const scrollTargetIntoView = () => {
      const target = document.querySelector(step.targetSelector);

      if (target) {
        target.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'center',
          inline: 'nearest',
        });
      }

      measureTimer = window.setTimeout(measure, 220);
    };

    scrollTimer = window.setTimeout(scrollTargetIntoView, 80);
    window.addEventListener('resize', measure);
    mainViewport?.addEventListener('scroll', measure, { passive: true });

    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(measureTimer);
      window.removeEventListener('resize', measure);
      mainViewport?.removeEventListener('scroll', measure);
    };
  }, [isOpen, step]);

  const prepareStep = (targetStep) => {
    if (targetStep.restoreSources || targetStep.id === 'start' || targetStep.id === 'connect' || targetStep.id === 'briefing' || targetStep.id === 'evidence' || targetStep.id === 'ask') {
      onRestoreSources();
    }

    if (targetStep.disableTravel) {
      onDisableTravel();
    }

    if (targetStep.guideTab === 'security') {
      onOpenGuideSecurity();
    } else {
      onNavigate(targetStep.view);
    }

    if (targetStep.queryId) {
      window.setTimeout(() => {
        onAskDemoQuery(targetStep.queryId, { reset: targetStep.resetChat });
      }, 160);
    }
  };

  const goToStep = (nextIndex) => {
    const safeIndex = Math.min(Math.max(nextIndex, 0), STEPS.length - 1);
    const nextStep = STEPS[safeIndex];

    prepareStep(nextStep);
    onStepChange(safeIndex);
  };

  const runStep = () => {
    if (isLastStep) {
      onClose();
      onStepChange(0);
      return;
    }

    goToStep(stepIndex + 1);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="product-tour-spotlight"
        style={{
          '--spotlight-top': `${spotlight.top}px`,
          '--spotlight-left': `${spotlight.left}px`,
          '--spotlight-width': `${spotlight.width}px`,
          '--spotlight-height': `${spotlight.height}px`,
        }}
        aria-hidden="true"
      />

      <aside
        className="product-tour-card"
        style={{
          '--tour-card-top': `${cardPosition.top}px`,
          '--tour-card-left': `${cardPosition.left}px`,
        }}
        aria-label="Atlas guided tour"
      >
        <header className="product-tour-header">
          <div className="product-tour-title">
            <AtlasSpark size={30} active />
            <div>
              <p className="eyebrow">{step.eyebrow}</p>
              <h2 className="text-title-medium">{step.shortLabel}</h2>
            </div>
          </div>
          <button type="button" className="tour-icon-button" onClick={onClose} aria-label="Close guided tour">
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="tour-progress" aria-label={`Step ${stepIndex + 1} of ${STEPS.length}`}>
          <span style={{ width: `${progress}%` }} />
        </div>

        <div className="product-tour-copy" aria-live="polite">
          <span className="tour-step-count">Step {stepIndex + 1} of {STEPS.length}</span>
          <h3 className="text-title-large">{step.title}</h3>
          <p className="text-body-medium">{step.body}</p>
        </div>

        <footer className="product-tour-actions">
          <button
            type="button"
            className="tour-icon-button"
            onClick={() => goToStep(stepIndex - 1)}
            aria-label="Previous guided tour step"
            disabled={stepIndex === 0}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>

          <button type="button" className="m3-button primary" onClick={runStep}>
            {isLastStep ? <Sparkles size={17} aria-hidden="true" /> : <ChevronRight size={17} aria-hidden="true" />}
            {step.actionLabel}
          </button>

          <button
            type="button"
            className="tour-icon-button"
            onClick={() => goToStep(stepIndex + 1)}
            aria-label="Next guided tour step"
            disabled={isLastStep}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </footer>

      </aside>

      <div className="product-tour-stepper" aria-label="Tour steps">
        {STEPS.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={index === stepIndex ? 'active' : ''}
            onClick={() => goToStep(index)}
            aria-label={`Go to ${item.shortLabel} guided tour step`}
            aria-current={index === stepIndex ? 'step' : undefined}
          >
            <span>{index + 1}</span>
          </button>
        ))}
      </div>
    </>
  );
}

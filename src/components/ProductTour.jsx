import { useEffect, useRef, useState } from 'react';
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
    actionLabel: 'Next: Avatar',
    view: 'home',
    targetSelector: '.home-hero',
    restoreSources: true,
  },
  {
    id: 'avatar',
    shortLabel: 'Avatar',
    eyebrow: 'Assistant presence',
    title: 'The smart avatar makes Atlas feel alive.',
    body: 'The orb is an abstract assistant presence. It shows connected context, active reasoning, and whether the important insight is ready.',
    lookFor: 'A familiar assistant signal without using a realistic face.',
    actionLabel: 'Next: Context',
    view: 'home',
    targetSelector: '.immersive-panel',
    restoreSources: true,
  },
  {
    id: 'context',
    shortLabel: 'Today',
    eyebrow: 'Personal context',
    title: 'Today, tomorrow, and memory stay visible.',
    body: 'Atlas gives the user familiar anchors before asking them to inspect deeper reasoning.',
    lookFor: 'Procedure, signing, and Lisbon memory are introduced in plain language.',
    actionLabel: 'Next: Story',
    view: 'home',
    targetSelector: '.personal-context-strip',
    restoreSources: true,
  },
  {
    id: 'life-story',
    shortLabel: 'Story',
    eyebrow: 'Life Story Mode',
    title: 'The daily story is interactive.',
    body: 'Reviewers can switch lenses and click each story beat to see how approved signals become a narrative.',
    lookFor: 'Daily story, risk lens, next step, evidence labels, and source gates.',
    actionLabel: 'Next: Add data',
    view: 'home',
    targetSelector: '.life-story-mode',
    restoreSources: true,
  },
  {
    id: 'add-data',
    shortLabel: 'Add',
    eyebrow: 'User-fed context',
    title: 'Users can add what apps may miss.',
    body: 'Add to Atlas simulates user-approved notes, document names, commitments, evidence, and memory corrections without uploading files.',
    lookFor: 'The prototype stores added signals only for the current browser session.',
    actionLabel: 'Next: Insight',
    view: 'home',
    targetSelector: '.add-atlas-summary',
    restoreSources: true,
  },
  {
    id: 'home-insight',
    shortLabel: 'Insight',
    eyebrow: 'Important insight',
    title: 'The strongest risk is visible from Home.',
    body: 'Atlas gives one primary finding and a clear path into the evidence instead of burying the user in a dashboard.',
    lookFor: 'Confidence, source gating, and the evidence entry point.',
    actionLabel: 'Next: Sync',
    view: 'home',
    targetSelector: '.insight-feature',
    restoreSources: true,
  },
  {
    id: 'sync',
    shortLabel: 'Sync',
    eyebrow: 'Signal freshness',
    title: 'Users can see when sources were checked.',
    body: 'The sync panel answers a basic trust question: what has Atlas read, and when did it last check approved app signals?',
    lookFor: 'Last sync time, approved signal count, and Sync now.',
    actionLabel: 'Next: Consent',
    view: 'connect',
    targetSelector: '.sync-console',
    restoreSources: true,
  },
  {
    id: 'connect',
    shortLabel: 'Consent',
    eyebrow: 'Consent first',
    title: 'Life areas control the reasoning.',
    body: 'The Connect page shows plain-language permission areas before app-level detail. Turning a life area off changes what Atlas can answer.',
    lookFor: 'Life areas come before app-level details.',
    actionLabel: 'Next: Apps',
    view: 'connect',
    targetSelector: '.life-area-grid .dimension-card',
    restoreSources: true,
  },
  {
    id: 'apps',
    shortLabel: 'Apps',
    eyebrow: 'App-level detail',
    title: 'App sources stay compact and understandable.',
    body: 'Atlas shows the synthetic app layer underneath life areas so users can understand where signals come from without reading a settings table.',
    lookFor: 'Google-style app examples, status labels, and per-source sync controls.',
    actionLabel: 'Next: Brief',
    view: 'connect',
    targetSelector: '.app-source-grid .app-item',
    restoreSources: true,
  },
  {
    id: 'life-brief',
    shortLabel: 'Brief',
    eyebrow: 'Life Brief',
    title: 'The briefing starts supportive, not alarming.',
    body: 'Atlas frames the situation as a timing conflict that needs attention before tomorrow evening.',
    lookFor: 'Plain-language summary before the detailed evidence.',
    actionLabel: 'Next: Trace',
    view: 'briefing',
    targetSelector: '.life-brief-panel',
    restoreSources: true,
  },
  {
    id: 'trace',
    shortLabel: 'Trace',
    eyebrow: 'Agent reasoning',
    title: 'The reasoning path is visible.',
    body: 'The trace shows how the agent connects approved sources, recovery rules, travel, legal deadlines, and the workaround.',
    lookFor: 'A reviewer can inspect each reasoning stage instead of trusting a black box.',
    actionLabel: 'Next: Conflict',
    view: 'briefing',
    targetSelector: '.agent-trace',
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
    actionLabel: 'Next: Resolution',
    view: 'briefing',
    targetSelector: '.evidence-grid .evidence-card',
    restoreSources: true,
  },
  {
    id: 'resolution',
    shortLabel: 'Resolve',
    eyebrow: 'Resolution path',
    title: 'Atlas suggests a safer route.',
    body: 'The briefing points to Clause 8.1 as a remote notary workaround, keeping the medical restriction and deadline visible together.',
    lookFor: 'A next step is shown with its evidence and impact.',
    actionLabel: 'Next: Persona',
    view: 'briefing',
    targetSelector: '.resolution-path',
    restoreSources: true,
  },
  {
    id: 'persona',
    shortLabel: 'Persona',
    eyebrow: 'Assistant tone',
    title: 'The user chooses how Atlas speaks.',
    body: 'Persona choices make the assistant feel more personal while keeping the same source-gated reasoning underneath.',
    lookFor: 'Calm Guide, Executive Assistant, Warm Coach, and Direct Analyst.',
    actionLabel: 'Next: Ask',
    view: 'ask',
    targetSelector: '.persona-selection',
    restoreSources: true,
  },
  {
    id: 'ask',
    shortLabel: 'Ask',
    eyebrow: 'Assistant proof',
    title: 'The assistant answers from approved sources.',
    body: 'The preset question demonstrates deterministic source-aware reasoning from local synthetic product data.',
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
    id: 'memory',
    shortLabel: 'Memory',
    eyebrow: 'Memory recall',
    title: 'Atlas can explain a remembered day.',
    body: 'The Memory page reconstructs 11 June 2022 with a likely location, confidence, evidence, timeline, and uncertainty note.',
    lookFor: 'The Lisbon answer is helpful but does not claim perfect certainty.',
    actionLabel: 'Next: Guide',
    view: 'memory',
    targetSelector: '.memory-answer',
    restoreSources: true,
  },
  {
    id: 'guide',
    shortLabel: 'Guide',
    eyebrow: 'First-time path',
    title: 'The guide keeps onboarding simple.',
    body: 'The first-time guide shows the workflow as six clear steps so users with cognitive load concerns can follow the product.',
    lookFor: 'Choose areas, read brief, review conflicts, inspect evidence, ask, resolve.',
    actionLabel: 'Next: Trust',
    view: 'guide',
    targetSelector: '.guide-steps .step-card',
    restoreSources: true,
  },
  {
    id: 'security',
    shortLabel: 'Trust',
    eyebrow: 'Trust model',
    title: 'The safe demo path is explicit.',
    body: 'Trust & security explains what is live, what is simulated, and how the capped Gemini and MongoDB MCP proof is guarded.',
    lookFor: 'Synthetic product data, a capped live proof, and the backend path.',
    actionLabel: 'Next: Finish',
    view: 'guide',
    guideTab: 'security',
    targetSelector: '.platform-status-grid .platform-card',
    restoreSources: true,
  },
  {
    id: 'simulated-agent',
    shortLabel: 'Agent',
    eyebrow: 'Simulated agent environment',
    title: 'The future cloud path is demonstrated safely.',
    body: 'The Guide page shows the planned Google Sign-In, MongoDB MCP, Agent Builder, and Gemini flow alongside the capped live proof panel.',
    lookFor: 'The simulation makes the agent architecture visible while the live proof stays capped.',
    actionLabel: 'Next: Finish',
    view: 'guide',
    guideTab: 'security',
    targetSelector: '.sim-env-workbench',
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
    targetSelector: '.home-hero',
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
  const cardRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const mainViewport = document.querySelector('.main-viewport');
    let scrollTimer;
    let measureTimer;

    const getTarget = () => document.querySelector(step.targetSelector) || document.querySelector('.main-content') || document.querySelector('.main-viewport');

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const measure = () => {
      const target = getTarget();

      if (!target) {
        setSpotlight(DEFAULT_SPOTLIGHT);
        setCardPosition({ top: 112, left: 704 });
        return;
      }

      const rect = target.getBoundingClientRect();
      const pad = window.innerWidth <= 640 ? 6 : 10;
      const viewportMargin = window.innerWidth <= 860 ? 12 : 16;
      const reservedBottom = window.innerWidth <= 860 ? 112 : 84;
      const nextSpotlight = {
        top: clamp(rect.top - pad, 8, window.innerHeight - 24),
        left: clamp(rect.left - pad, 8, window.innerWidth - 24),
        width: Math.min(window.innerWidth - 16, rect.width + pad * 2),
        height: Math.min(window.innerHeight - 16, rect.height + pad * 2),
      };

      const cardWidth = Math.min(376, window.innerWidth - viewportMargin * 2);
      const measuredHeight = cardRef.current?.offsetHeight || 360;
      const cardHeight = Math.min(measuredHeight, window.innerHeight - reservedBottom - viewportMargin);
      const maxLeft = window.innerWidth - cardWidth - viewportMargin;
      const maxTop = window.innerHeight - cardHeight - reservedBottom;
      let left = rect.right + 18;
      let top = rect.top + 12;

      if (left + cardWidth > window.innerWidth - viewportMargin) {
        left = rect.left - cardWidth - 18;
      }

      if (window.innerWidth <= 860) {
        left = viewportMargin;
        top = Math.max(viewportMargin, window.innerHeight - cardHeight - reservedBottom);
      } else {
        left = clamp(left, viewportMargin, Math.max(viewportMargin, maxLeft));
        top = clamp(top, viewportMargin, Math.max(viewportMargin, maxTop));
      }

      setSpotlight(nextSpotlight);
      setCardPosition({ top, left });
    };

    const scrollTargetIntoView = () => {
      const target = getTarget();

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
    const lateMeasureTimer = window.setTimeout(measure, 480);
    window.addEventListener('resize', measure);
    mainViewport?.addEventListener('scroll', measure, { passive: true });

    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(measureTimer);
      window.clearTimeout(lateMeasureTimer);
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
        ref={cardRef}
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
          <p className="tour-look-for"><strong>What to notice:</strong> {step.lookFor}</p>
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

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileSignature,
  FileText,
  HeartPulse,
  LockKeyhole,
  Plane,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const STORY_LENSES = [
  {
    id: 'daily',
    label: 'Daily story',
    helper: 'Plain-language narrative',
  },
  {
    id: 'risk',
    label: 'Risk lens',
    helper: 'What changes the plan',
  },
  {
    id: 'next',
    label: 'Next step',
    helper: 'What Atlas would prepare',
  },
];

const STORY_BEATS = [
  {
    id: 'procedure',
    time: 'Thu 08:00',
    label: 'Procedure begins',
    thread: 'Recovery',
    source: 'Medical Portal',
    requiredDimensions: ['health'],
    icon: HeartPulse,
    daily: 'Your day starts with a medical procedure at 08:00. Atlas treats that appointment as the anchor for the rest of the story.',
    risk: 'The procedure matters because it triggers recovery instructions that can change travel and signing plans.',
    next: 'Keep the recovery instruction visible and compare every commitment against the post-op safety window.',
    evidence: 'Medical Portal appointment record confirms the Thursday 08:00 procedure.',
    why: 'This is the first signal that changes the safe timeline.',
  },
  {
    id: 'restriction',
    time: 'Thu 10:30',
    label: 'No-fly rule appears',
    thread: 'Recovery',
    source: 'Post-op PDF',
    requiredDimensions: ['health'],
    icon: FileText,
    daily: 'The recovery instructions add a 36-hour no-flying rule. Atlas keeps that rule attached to the day instead of leaving it buried in a PDF.',
    risk: 'The 36-hour window extends past the evening flight and into the next day.',
    next: 'Use this medical instruction as the supporting evidence for any travel or signing change.',
    evidence: 'Post-op instruction PDF says no flying for 36 hours after anesthesia.',
    why: 'A hidden rule inside a document becomes a timeline constraint.',
  },
  {
    id: 'flight',
    time: 'Thu 19:30',
    label: 'Flight conflicts',
    thread: 'Travel',
    source: 'Gmail and Travel App',
    requiredDimensions: ['health', 'travel'],
    icon: Plane,
    daily: 'Your confirmed 19:30 flight now sits inside the medical recovery window. Atlas connects the flight to the instruction instead of treating it as a separate booking.',
    risk: 'The flight leaves about 11.5 hours after the procedure, well before the 36-hour no-fly window ends.',
    next: 'Review the briefing evidence before deciding whether to move the flight or use the signing workaround.',
    evidence: 'UA242 is confirmed for Thursday 19:30, inside the recovery restriction.',
    why: 'This is the hidden cross-app conflict normal calendar views can miss.',
  },
  {
    id: 'signing',
    time: 'Fri 09:00',
    label: 'Signing window',
    thread: 'Integrity',
    source: 'Legal Archive',
    requiredDimensions: ['travel', 'integrity'],
    icon: FileSignature,
    daily: 'The Friday 09:00 signing depends on resolving the flight problem. Atlas links the travel decision to the legal obligation.',
    risk: 'Missing or delaying the signing can push the user toward the Friday 12:00 deadline.',
    next: 'Prepare the legal workaround path before the travel decision becomes urgent.',
    evidence: 'Legal Archive signing packet requires presence unless an approved exception is invoked.',
    why: 'A travel conflict becomes an obligation conflict.',
  },
  {
    id: 'deadline',
    time: 'Fri 12:00',
    label: '$250,000 deadline risk',
    thread: 'Money and Integrity',
    source: 'Legal Archive Clause 4.2',
    requiredDimensions: ['integrity'],
    icon: CalendarDays,
    daily: 'The story becomes serious because the legal deadline carries a possible $250,000 valuation impact.',
    risk: 'The risk is not just being late. It is missing a deadline with financial consequences attached.',
    next: 'Keep the deadline and valuation clause visible while choosing the safest resolution.',
    evidence: 'Clause 4.2 marks a potential $250,000 valuation adjustment if the closing is missed.',
    why: 'This explains why the conflict deserves attention before tomorrow evening.',
  },
  {
    id: 'workaround',
    time: 'Now',
    label: 'Clause 8.1 path',
    thread: 'Resolution',
    source: 'Legal Archive Clause 8.1',
    requiredDimensions: ['health', 'integrity'],
    icon: ShieldCheck,
    daily: 'Atlas finds a calmer path: Clause 8.1 allows remote execution with medical certification.',
    risk: 'The workaround reduces the risk without asking the user to ignore recovery instructions.',
    next: 'Ask counsel to trigger Clause 8.1 and attach the medical certificate before Friday 12:00.',
    evidence: 'Clause 8.1 allows remote notarization when medical certification supports the request.',
    why: 'This turns Atlas from a warning surface into an action-oriented companion.',
  },
];

const DIMENSION_LABELS = {
  health: 'Health',
  travel: 'Travel',
  integrity: 'Integrity',
  money: 'Money',
  family: 'Family',
  memory: 'Memory',
};

function formatList(items) {
  const labels = items.map((item) => DIMENSION_LABELS[item] || item);

  if (labels.length <= 1) {
    return labels[0] || '';
  }

  if (labels.length === 2) {
    return `${labels[0]} and ${labels[1]}`;
  }

  return `${labels.slice(0, -1).join(', ')}, and ${labels.at(-1)}`;
}

export function LifeStoryMode({ activeDimensions, onNavigate }) {
  const [activeBeatId, setActiveBeatId] = useState(STORY_BEATS[0].id);
  const [activeLensId, setActiveLensId] = useState(STORY_LENSES[0].id);

  const activeBeat = STORY_BEATS.find((beat) => beat.id === activeBeatId) || STORY_BEATS[0];
  const activeLens = STORY_LENSES.find((lens) => lens.id === activeLensId) || STORY_LENSES[0];
  const ActiveIcon = activeBeat.icon;
  const hasDimension = (dimension) => activeDimensions.includes(dimension);
  const missingDimensions = activeBeat.requiredDimensions.filter((dimension) => !hasDimension(dimension));
  const isBeatReady = missingDimensions.length === 0;

  const readyBeatCount = useMemo(
    () => STORY_BEATS.filter((beat) => beat.requiredDimensions.every((dimension) => activeDimensions.includes(dimension))).length,
    [activeDimensions]
  );

  const storyReady = ['health', 'travel', 'integrity'].every(hasDimension);
  const storyCopy = isBeatReady
    ? activeBeat[activeLens.id]
    : `Atlas cannot include this part of the story because ${formatList(missingDimensions)} ${missingDimensions.length === 1 ? 'is' : 'are'} not connected.`;

  return (
    <section className={`life-story-mode ${storyReady ? 'ready' : 'gated'}`} aria-labelledby="life-story-title">
      <div className="life-story-header">
        <div className="section-heading compact">
          <p className="eyebrow">Atlas Life Story Mode</p>
          <h2 id="life-story-title" className="text-headline-medium">A daily story built from approved signals.</h2>
          <p className="text-body-large">
            This product view turns local synthetic evidence into an interactive life narrative without real account data or autonomous actions.
          </p>
        </div>

        <div className="life-story-score" aria-label={`${readyBeatCount} of ${STORY_BEATS.length} story beats ready`}>
          <Sparkles size={22} aria-hidden="true" />
          <strong>{readyBeatCount}/{STORY_BEATS.length}</strong>
          <span>beats ready</span>
        </div>
      </div>

      <div className="life-story-lenses" aria-label="Story lenses">
        {STORY_LENSES.map((lens) => (
          <button
            key={lens.id}
            type="button"
            className={activeLens.id === lens.id ? 'active' : ''}
            onClick={() => setActiveLensId(lens.id)}
            aria-pressed={activeLens.id === lens.id}
          >
            <span>{lens.label}</span>
            <small>{lens.helper}</small>
          </button>
        ))}
      </div>

      <div className="life-story-shell">
        <div className="life-story-map" aria-label="Life story beats">
          {STORY_BEATS.map((beat) => {
            const Icon = beat.icon;
            const ready = beat.requiredDimensions.every(hasDimension);
            const active = beat.id === activeBeat.id;

            return (
              <button
                key={beat.id}
                type="button"
                className={`life-story-beat ${active ? 'active' : ''} ${ready ? 'ready' : 'blocked'}`}
                onClick={() => setActiveBeatId(beat.id)}
                aria-pressed={active}
              >
                <span className="life-story-beat-icon">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <span className="life-story-beat-copy">
                  <span className="life-story-beat-time">{beat.time}</span>
                  <strong>{beat.label}</strong>
                  <span>{beat.source}</span>
                </span>
                <span className="life-story-beat-state">
                  {ready ? <CheckCircle2 size={17} aria-hidden="true" /> : <LockKeyhole size={17} aria-hidden="true" />}
                  {ready ? 'Ready' : 'Needs source'}
                </span>
              </button>
            );
          })}
        </div>

        <article className={`life-story-detail ${isBeatReady ? 'ready' : 'blocked'}`} aria-live="polite">
          <div className="life-story-detail-topline">
            <span className="life-story-detail-icon">
              <ActiveIcon size={24} aria-hidden="true" />
            </span>
            <span className="signal-pill">{activeLens.label}</span>
          </div>

          <div className="life-story-detail-copy">
            <p className="eyebrow">{activeBeat.thread}</p>
            <h3 className="text-title-large">{isBeatReady ? activeBeat.label : 'This story beat is paused.'}</h3>
            <p className="text-body-large">{storyCopy}</p>
          </div>

          <dl className="life-story-evidence">
            <div>
              <dt>Evidence</dt>
              <dd>{isBeatReady ? activeBeat.evidence : `Connect ${formatList(missingDimensions)} to reveal this evidence.`}</dd>
            </div>
            <div>
              <dt>Why it matters</dt>
              <dd>{isBeatReady ? activeBeat.why : 'Atlas keeps unsupported conclusions out of the story.'}</dd>
            </div>
            <div>
              <dt>Source gate</dt>
              <dd>{activeBeat.requiredDimensions.length ? formatList(activeBeat.requiredDimensions) : 'No source required'}</dd>
            </div>
          </dl>

          <div className="life-story-actions" aria-label="Life story actions">
            <button type="button" className="m3-button primary" onClick={() => onNavigate('briefing')}>
              Review briefing <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button type="button" className="m3-button tonal" onClick={() => onNavigate('ask')}>
              Ask Atlas
            </button>
            <button type="button" className="m3-button outlined" onClick={() => onNavigate('connect')}>
              Manage sources
            </button>
          </div>
        </article>
      </div>

      <div className="life-story-footer" aria-label="Life Story Mode safeguards">
        <span><ShieldCheck size={16} aria-hidden="true" /> Local synthetic evidence only</span>
        <span><LockKeyhole size={16} aria-hidden="true" /> Source-gated story beats</span>
        <span><Sparkles size={16} aria-hidden="true" /> Designed for future Gemini and Agent Builder reasoning</span>
      </div>
    </section>
  );
}

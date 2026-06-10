import { useMemo, useState } from 'react';
import { CheckCircle2, Database, FileText, Gavel, HeartPulse, Plane, Route, ShieldCheck, Sparkles } from 'lucide-react';

const TRACE_STEPS = [
  {
    id: 'sources',
    label: 'Approved sources',
    title: 'Atlas reads only connected life areas.',
    detail: 'Health, Travel, and Integrity are connected, so Atlas can compare recovery rules, flights, and legal obligations.',
    dimensions: ['health', 'travel', 'integrity'],
    evidence: ['Medical Portal', 'Gmail', 'Legal Archive'],
    icon: ShieldCheck,
  },
  {
    id: 'restriction',
    label: 'Recovery rule',
    title: 'The post-op instruction changes the day.',
    detail: 'A 36-hour no-fly rule starts after the 08:00 procedure. The 19:30 flight is only 11.5 hours later.',
    dimensions: ['health', 'travel'],
    evidence: ['sig-001', 'sig-002', 'sig-004'],
    icon: HeartPulse,
  },
  {
    id: 'deadline',
    label: 'Hidden dependency',
    title: 'The flight affects a legal signing window.',
    detail: 'The Friday 09:00 signing and Friday 12:00 deadline depend on resolving the travel conflict before it becomes expensive.',
    dimensions: ['travel', 'integrity'],
    evidence: ['sig-004', 'sig-006', 'sig-007'],
    icon: Plane,
  },
  {
    id: 'evidence',
    label: 'Evidence check',
    title: 'Every conclusion points back to records.',
    detail: 'Atlas keeps the medical PDF, flight confirmation, signing packet, valuation clause, and workaround visible.',
    dimensions: ['health', 'travel', 'integrity'],
    evidence: ['No-fly PDF', 'UA242', 'Clause 4.2', 'Clause 8.1'],
    icon: FileText,
  },
  {
    id: 'resolution',
    label: 'Next step',
    title: 'Clause 8.1 creates a safer path.',
    detail: 'The suggested route is to ask counsel to use remote notarization with medical certification before the Friday deadline.',
    dimensions: ['integrity'],
    evidence: ['Remote notary workaround'],
    icon: Gavel,
  },
];

const QUERY_CHIPS = [
  { label: 'Why is tomorrow risky?', stepId: 'deadline' },
  { label: 'What evidence supports this?', stepId: 'evidence' },
  { label: 'What should I do next?', stepId: 'resolution' },
];

export function AgentTrace({ activeDimensions }) {
  const [activeStepId, setActiveStepId] = useState(TRACE_STEPS[0].id);
  const activeStep = TRACE_STEPS.find((step) => step.id === activeStepId) || TRACE_STEPS[0];

  const connectedTraceCount = useMemo(
    () => TRACE_STEPS.filter((step) => step.dimensions.every((dimension) => activeDimensions.includes(dimension))).length,
    [activeDimensions]
  );

  return (
    <section className="agent-trace" aria-labelledby="agent-trace-title">
      <div className="agent-trace-header">
        <div className="section-heading compact">
          <p className="eyebrow">Agent trace</p>
          <h2 id="agent-trace-title" className="text-headline-medium">Watch Atlas connect the hidden conflict.</h2>
          <p className="text-body-medium">
            This is a local synthetic reasoning trace. It mirrors the Agent Builder and MongoDB MCP flow documented in the repo.
          </p>
        </div>
        <div className="trace-score" aria-label={`${connectedTraceCount} of ${TRACE_STEPS.length} trace steps ready`}>
          <Sparkles size={20} aria-hidden="true" />
          <strong>{connectedTraceCount}/{TRACE_STEPS.length}</strong>
          <span>steps ready</span>
        </div>
      </div>

      <div className="trace-query-row" aria-label="Sample questions">
        {QUERY_CHIPS.map((query) => (
          <button key={query.label} type="button" className="trace-query-chip" onClick={() => setActiveStepId(query.stepId)}>
            {query.label}
          </button>
        ))}
      </div>

      <div className="trace-workbench">
        <div className="trace-map" role="list" aria-label="Reasoning steps">
          {TRACE_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isReady = step.dimensions.every((dimension) => activeDimensions.includes(dimension));
            const isActive = activeStep.id === step.id;

            return (
              <button
                key={step.id}
                type="button"
                className={`trace-node ${isActive ? 'active' : ''} ${isReady ? 'ready' : 'blocked'}`}
                onClick={() => setActiveStepId(step.id)}
                aria-pressed={isActive}
              >
                <span className="trace-index">{index + 1}</span>
                <span className="trace-icon"><Icon size={20} aria-hidden="true" /></span>
                <span className="trace-copy">
                  <span className="text-label-large">{step.label}</span>
                  <span>{isReady ? 'Connected' : 'Needs source'}</span>
                </span>
                {isReady ? <CheckCircle2 size={18} aria-hidden="true" /> : <Database size={18} aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        <article className="trace-detail" aria-live="polite">
          <div className="trace-detail-topline">
            <span className="trace-icon large"><activeStep.icon size={24} aria-hidden="true" /></span>
            <span className="signal-pill">Local agent proof</span>
          </div>
          <h3 className="text-title-large">{activeStep.title}</h3>
          <p className="text-body-large">{activeStep.detail}</p>

          <div className="trace-evidence-list" aria-label="Evidence used in this step">
            {activeStep.evidence.map((item) => (
              <span key={item}>
                <Route size={15} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

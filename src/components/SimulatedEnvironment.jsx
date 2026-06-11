import { useMemo, useState } from 'react';
import { CheckCircle2, Database, FileText, KeyRound, ServerOff, ShieldCheck, Sparkles } from 'lucide-react';
import { LIFE_DIMENSIONS } from '../data/sources';

const SIMULATION_STAGES = [
  {
    id: 'consent',
    label: 'Google Sign-In consent',
    title: 'Identity and approval are simulated.',
    detail: 'Atlas shows what a Google Account consent flow would protect: the user signs in, chooses life areas, and Atlas can only reason over those approved areas.',
    input: 'Simulated Google Account: Carla',
    output: 'Approved life areas become the reasoning boundary.',
    icon: KeyRound,
  },
  {
    id: 'mcp',
    label: 'MongoDB MCP read',
    title: 'The life-signal store is represented locally.',
    detail: 'The repo includes MongoDB-shaped collections for life areas, life signals, evidence items, memory events, resolution paths, and deterministic agent tests.',
    input: 'agent/mongodb/seed-data.json',
    output: 'life_signals, evidence_items, resolution_paths, memory_events',
    icon: Database,
  },
  {
    id: 'reasoning',
    label: 'Agent reasoning',
    title: 'Agent Builder and Gemini are shown as a visible trace.',
    detail: 'The Briefing Agent trace mirrors the live proof flow: read approved sources, query evidence IDs, connect the timeline, and propose the safest next step.',
    input: 'Why is tomorrow risky?',
    output: 'Post-Op Compliance Trap with Clause 8.1 workaround.',
    icon: Sparkles,
  },
  {
    id: 'answer',
    label: 'Evidence-backed answer',
    title: 'The answer is generated locally from synthetic records.',
    detail: 'This workbench uses deterministic local data. The separate live proof panel calls the capped server endpoint when Google Cloud and MongoDB Atlas secrets are configured.',
    input: 'sig-001, sig-002, sig-004, sig-006, sig-007, sig-008',
    output: 'Timing conflict, evidence list, impact summary, and resolution path.',
    icon: FileText,
  },
];

const STATIC_GUARDS = [
  { label: 'Backend', value: 'Capped API route', icon: ServerOff },
  { label: 'Cloud calls', value: 'Preset proof only', icon: ShieldCheck },
  { label: 'Data', value: 'Synthetic local records', icon: Database },
];

export function SimulatedEnvironment({ activeDimensions }) {
  const [activeStageId, setActiveStageId] = useState(SIMULATION_STAGES[0].id);
  const activeStage = SIMULATION_STAGES.find((stage) => stage.id === activeStageId) || SIMULATION_STAGES[0];
  const ActiveIcon = activeStage.icon;

  const approvedAreas = useMemo(
    () => LIFE_DIMENSIONS
      .filter((dimension) => activeDimensions.includes(dimension.id))
      .map((dimension) => dimension.label),
    [activeDimensions]
  );

  const requiredReady = ['Health', 'Travel', 'Integrity'].every((label) => approvedAreas.includes(label));
  const approvalText = approvedAreas.length > 0 ? approvedAreas.join(', ') : 'No life areas connected';

  return (
    <section className="sim-env" aria-labelledby="sim-env-title">
      <div className="sim-env-header">
        <div className="section-heading compact">
          <p className="eyebrow">Simulated agent environment</p>
          <h2 id="sim-env-title" className="text-headline-medium">The cloud path, shown safely in the browser.</h2>
          <p className="text-body-medium">
            This workbench simulates Google Sign-In consent and source-gated reasoning. The live proof panel above is the only part designed to make a capped backend call.
          </p>
        </div>

        <div className={`sim-env-readiness ${requiredReady ? 'ready' : 'needs-sources'}`}>
          <CheckCircle2 size={20} aria-hidden="true" />
          <strong>{requiredReady ? 'Conflict demo ready' : 'Needs key areas'}</strong>
          <span>{approvalText}</span>
        </div>
      </div>

      <div className="sim-env-guards" aria-label="Live demo safety guards">
        {STATIC_GUARDS.map((guard) => (
          <div key={guard.label}>
            <guard.icon size={18} aria-hidden="true" />
            <span>{guard.label}</span>
            <strong>{guard.value}</strong>
          </div>
        ))}
      </div>

      <div className="sim-env-workbench">
        <div className="sim-env-stage-list" role="list" aria-label="Simulated architecture stages">
          {SIMULATION_STAGES.map((stage, index) => {
            const StageIcon = stage.icon;
            const isActive = activeStage.id === stage.id;

            return (
              <button
                key={stage.id}
                type="button"
                className={`sim-env-stage ${isActive ? 'active' : ''}`}
                onClick={() => setActiveStageId(stage.id)}
                aria-pressed={isActive}
              >
                <span className="sim-env-stage-index">{index + 1}</span>
                <StageIcon size={20} aria-hidden="true" />
                <span>{stage.label}</span>
              </button>
            );
          })}
        </div>

        <article className="sim-env-detail" aria-live="polite">
          <div className="sim-env-detail-topline">
            <span className="sim-env-detail-icon">
              <ActiveIcon size={24} aria-hidden="true" />
            </span>
            <span className="signal-pill">Frontend simulation</span>
          </div>

          <h3 className="text-title-large">{activeStage.title}</h3>
          <p className="text-body-large">{activeStage.detail}</p>

          <dl className="sim-env-io">
            <div>
              <dt>Input</dt>
              <dd>{activeStage.id === 'consent' ? `${activeStage.input}; approved: ${approvalText}` : activeStage.input}</dd>
            </div>
            <div>
              <dt>Output</dt>
              <dd>{activeStage.output}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}

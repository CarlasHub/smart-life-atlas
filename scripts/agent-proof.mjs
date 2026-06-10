import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedPath = resolve(__dirname, '../agent/mongodb/seed-data.json');
const seed = JSON.parse(readFileSync(seedPath, 'utf8'));
const collections = seed.collections;

const REQUIRED_COLLECTIONS = [
  'life_areas',
  'life_signals',
  'evidence_items',
  'resolution_paths',
  'memory_events',
  'agent_tests'
];

const args = new Map(
  process.argv
    .slice(2)
    .filter((arg) => arg.startsWith('--') && arg.includes('='))
    .map((arg) => {
      const [key, ...value] = arg.slice(2).split('=');
      return [key, value.join('=')];
    })
);

const defaultEnabledDimensions = collections.life_areas
  .filter((area) => area.enabledByDefault)
  .map((area) => area.dimension);

const enabledDimensions = new Set(
  (args.get('enabled') || defaultEnabledDimensions.join(','))
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
);

const query = args.get('query') || 'post-op';

function fail(message, extra = {}) {
  console.error(JSON.stringify({ status: 'error', message, ...extra }, null, 2));
  process.exitCode = 1;
}

function assertSeedShape() {
  const missingCollections = REQUIRED_COLLECTIONS.filter((name) => !Array.isArray(collections[name]));

  if (missingCollections.length > 0) {
    fail('Seed data is missing required MongoDB collections.', { missingCollections });
    return false;
  }

  return true;
}

function refusal(test, missingDimensions) {
  return {
    status: 'blocked_by_consent',
    query: test.question,
    enabledDimensions: [...enabledDimensions],
    missingDimensions,
    answer: 'I cannot answer that because the required source is not connected.'
  };
}

function byId(items) {
  return new Map(items.map((item) => [item.id, item]));
}

function hoursBetween(startTimestamp, endTimestamp) {
  return Number(((Date.parse(endTimestamp) - Date.parse(startTimestamp)) / 36e5).toFixed(1));
}

function runPostOpProof() {
  const test = collections.agent_tests.find((item) => item.id === 'post-op-compliance-trap');
  const missingDimensions = test.requiredDimensions.filter((dimension) => !enabledDimensions.has(dimension));

  if (missingDimensions.length > 0) {
    return refusal(test, missingDimensions);
  }

  const signalById = byId(collections.life_signals);
  const evidenceBySignalId = new Map(
    collections.evidence_items.map((item) => [item.signalId, item])
  );

  const evidence = test.evidenceSignalIds.map((signalId) => {
    const signal = signalById.get(signalId);
    const evidenceItem = evidenceBySignalId.get(signalId);

    if (!signal || !evidenceItem) {
      return { signalId, status: 'missing' };
    }

    return {
      signalId,
      source: signal.source,
      dimension: signal.dimension,
      label: evidenceItem.label,
      detail: evidenceItem.detail
    };
  });

  const procedure = signalById.get('sig-001');
  const noFlyRule = signalById.get('sig-002');
  const flight = signalById.get('sig-004');
  const signing = signalById.get('sig-006');
  const valuationRisk = signalById.get('sig-007');
  const workaround = signalById.get('sig-008');
  const resolution = collections.resolution_paths.find((item) => item.id === test.expectedResolutionId);

  const flightHoursAfterProcedure = hoursBetween(procedure.timestamp, flight.timestamp);
  const noFlyHours = noFlyRule.restriction.durationHours;

  return {
    status: 'ready',
    query: test.question,
    database: seed.database,
    mcpToolContract: [
      'find agent_tests by id',
      'find life_areas by requiredDimensions',
      'find life_signals by evidenceSignalIds',
      'find evidence_items by signalId',
      'find resolution_paths by challengeId'
    ],
    enabledDimensions: [...enabledDimensions],
    result: {
      lifeBrief: test.expectedConclusion,
      calculation: {
        procedureAt: procedure.timestamp,
        flightAt: flight.timestamp,
        flightHoursAfterProcedure,
        noFlyHours,
        insideRestrictedWindow: flightHoursAfterProcedure < noFlyHours
      },
      impactSummary: 'The Thursday 19:30 flight conflicts with the 36-hour recovery rule and puts the Friday 09:00 legal signing before the Friday 12:00 deadline at risk.',
      valuationRisk: valuationRisk.content,
      workaround: workaround.content,
      suggestedNextStep: resolution.nextStep,
      actionRequiresUserApproval: resolution.requiresUserApproval,
      evidence,
      checkedSignals: {
        procedure: procedure.id,
        noFlyRule: noFlyRule.id,
        flight: flight.id,
        signing: signing.id,
        valuationRisk: valuationRisk.id,
        workaround: workaround.id
      }
    }
  };
}

function runMemoryProof() {
  const test = collections.agent_tests.find((item) => item.id === 'lisbon-memory');
  const missingDimensions = test.requiredDimensions.filter((dimension) => !enabledDimensions.has(dimension));

  if (missingDimensions.length > 0) {
    return refusal(test, missingDimensions);
  }

  const dayEvents = collections.memory_events.filter((event) => event.timestamp.startsWith('2022-06-11'));

  return {
    status: 'ready',
    query: test.question,
    database: seed.database,
    mcpToolContract: [
      'find life_areas where dimension is memory',
      'find memory_events between 2022-06-11T00:00:00Z and 2022-06-11T23:59:59Z'
    ],
    enabledDimensions: [...enabledDimensions],
    result: {
      likelyLocation: 'Belem, Lisbon, Portugal',
      confidence: 0.82,
      uncertainty: 'Atlas does not have GPS-level location history for that day, so this answer is based on calendar, receipt, and archive signals.',
      evidence: dayEvents.map((event) => ({
        signalId: event.id,
        source: event.source,
        timestamp: event.timestamp,
        content: event.content,
        place: event.place
      }))
    }
  };
}

if (assertSeedShape()) {
  const output = query === 'memory' ? runMemoryProof() : runPostOpProof();
  console.log(JSON.stringify(output, null, 2));
}

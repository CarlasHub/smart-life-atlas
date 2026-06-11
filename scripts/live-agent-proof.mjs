import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const seedPath = resolve(rootDir, 'agent/mongodb/seed-data.json');
const usagePath = resolve(rootDir, '.atlas-live-agent-usage.json');
const seed = JSON.parse(readFileSync(seedPath, 'utf8'));
const collections = seed.collections;

const args = new Map(
  process.argv
    .slice(2)
    .filter((arg) => arg.startsWith('--'))
    .map((arg) => {
      const [key, ...value] = arg.slice(2).split('=');
      return [key, value.length > 0 ? value.join('=') : 'true'];
    })
);

const projectId = process.env.ATLAS_AGENT_PROJECT || 'atlas-agent-20260611';
const location = process.env.ATLAS_AGENT_LOCATION || 'global';
const model = process.env.ATLAS_AGENT_MODEL || 'gemini-2.5-flash';
const dailyLimit = Number(process.env.ATLAS_LIVE_AGENT_DAILY_LIMIT || 3);
const live = args.get('live') === 'true';
const query = args.get('query') || 'post-op';

const allowedQueries = new Set(['post-op', 'memory', 'refusal']);

if (!allowedQueries.has(query)) {
  console.error(JSON.stringify({
    status: 'blocked',
    reason: 'Only preset demo queries are allowed.',
    allowedQueries: [...allowedQueries]
  }, null, 2));
  process.exit(1);
}

function byId(items) {
  return new Map(items.map((item) => [item.id, item]));
}

function hoursBetween(startTimestamp, endTimestamp) {
  return Number(((Date.parse(endTimestamp) - Date.parse(startTimestamp)) / 36e5).toFixed(1));
}

function usageForToday() {
  const today = new Date().toISOString().slice(0, 10);

  try {
    const usage = JSON.parse(readFileSync(usagePath, 'utf8'));
    return usage.date === today ? usage : { date: today, calls: 0 };
  } catch {
    return { date: today, calls: 0 };
  }
}

function recordUsage(usage) {
  writeFileSync(usagePath, JSON.stringify({ ...usage, calls: usage.calls + 1 }, null, 2));
}

function buildPostOpTrace({ enabledDimensions }) {
  const test = collections.agent_tests.find((item) => item.id === 'post-op-compliance-trap');
  const missingDimensions = test.requiredDimensions.filter((dimension) => !enabledDimensions.has(dimension));

  if (missingDimensions.length > 0) {
    return {
      question: test.question,
      status: 'blocked_by_consent',
      missingDimensions,
      requiredAnswer: 'I cannot answer that because the required source is not connected.',
      toolTrace: [
        { tool: 'find agent_tests by id', result: test.id },
        { tool: 'check approved life_areas', enabledDimensions: [...enabledDimensions], missingDimensions }
      ]
    };
  }

  const signalById = byId(collections.life_signals);
  const evidenceBySignalId = new Map(collections.evidence_items.map((item) => [item.signalId, item]));
  const resolution = collections.resolution_paths.find((item) => item.id === test.expectedResolutionId);
  const procedure = signalById.get('sig-001');
  const noFlyRule = signalById.get('sig-002');
  const flight = signalById.get('sig-004');

  return {
    question: test.question,
    status: 'ready',
    toolTrace: [
      { tool: 'find agent_tests by id', result: test.id },
      { tool: 'check approved life_areas', enabledDimensions: [...enabledDimensions] },
      { tool: 'find life_signals by evidenceSignalIds', result: test.evidenceSignalIds },
      { tool: 'find evidence_items by signalId', result: test.evidenceSignalIds },
      { tool: 'find resolution_paths by challengeId', result: resolution.id }
    ],
    calculation: {
      procedureAt: procedure.timestamp,
      flightAt: flight.timestamp,
      flightHoursAfterProcedure: hoursBetween(procedure.timestamp, flight.timestamp),
      noFlyHours: noFlyRule.restriction.durationHours,
      insideRestrictedWindow: hoursBetween(procedure.timestamp, flight.timestamp) < noFlyRule.restriction.durationHours
    },
    evidence: test.evidenceSignalIds.map((signalId) => {
      const signal = signalById.get(signalId);
      const evidenceItem = evidenceBySignalId.get(signalId);
      return {
        signalId,
        source: signal.source,
        dimension: signal.dimension,
        label: evidenceItem.label,
        detail: evidenceItem.detail
      };
    }),
    resolution: {
      nextStep: resolution.nextStep,
      requiresUserApproval: resolution.requiresUserApproval
    }
  };
}

function buildMemoryTrace() {
  const test = collections.agent_tests.find((item) => item.id === 'lisbon-memory');
  const dayEvents = collections.memory_events.filter((event) => event.timestamp.startsWith('2022-06-11'));

  return {
    question: test.question,
    status: 'ready',
    toolTrace: [
      { tool: 'find life_areas where dimension is memory', result: 'enabled' },
      { tool: 'find memory_events between 2022-06-11T00:00:00Z and 2022-06-11T23:59:59Z', result: dayEvents.map((event) => event.id) }
    ],
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
  };
}

function buildTrace() {
  if (query === 'memory') {
    return buildMemoryTrace();
  }

  const enabledDimensions = query === 'refusal'
    ? new Set(['health', 'travel'])
    : new Set(collections.life_areas.filter((area) => area.enabledByDefault).map((area) => area.dimension));

  return buildPostOpTrace({ enabledDimensions });
}

function buildPrompt(trace) {
  return `You are Atlas, an evidence-backed life intelligence agent.

Rules:
- Answer only from the provided tool trace.
- If status is blocked_by_consent, use the required refusal exactly.
- Do not claim real Gmail, Calendar, Google API, medical, travel, finance, or legal data was used.
- Do not perform or imply an action was taken.
- If suggesting a next step, say it requires user approval.
- Keep the answer concise and judge-readable.

Tool trace:
${JSON.stringify(trace, null, 2)}

Return the final Atlas answer.`;
}

function getAccessToken() {
  const result = spawnSync('gcloud', ['auth', 'print-access-token'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe']
  });

  if (result.status !== 0) {
    throw new Error(`Could not get gcloud access token: ${result.stderr.trim()}`);
  }

  return result.stdout.trim();
}

async function callGemini(prompt) {
  const accessToken = getAccessToken();
  const apiRoot = location === 'global'
    ? 'https://aiplatform.googleapis.com'
    : `https://${location}-aiplatform.googleapis.com`;
  const endpoint = `${apiRoot}/v1/projects/${projectId}/locations/${location}/publishers/google/models/${model}:generateContent`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 700
      }
    })
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify({ status: response.status, body }, null, 2));
  }

  return body;
}

const trace = buildTrace();
const prompt = buildPrompt(trace);

if (!live) {
  console.log(JSON.stringify({
    status: 'dry_run',
    note: 'No Gemini call was made. Add --live to call Gemini through Agent Platform.',
    projectId,
    location,
    model,
    dailyLimit,
    query,
    trace,
    promptPreview: prompt.slice(0, 1200)
  }, null, 2));
  process.exit(0);
}

const usage = usageForToday();

if (usage.calls >= dailyLimit) {
  console.error(JSON.stringify({
    status: 'blocked',
    reason: 'Daily live Gemini call limit reached.',
    usage,
    dailyLimit
  }, null, 2));
  process.exit(1);
}

const geminiResponse = await callGemini(prompt);
recordUsage(usage);

const answer = geminiResponse.candidates
  ?.flatMap((candidate) => candidate.content?.parts || [])
  ?.map((part) => part.text || '')
  ?.join('\n')
  ?.trim();

console.log(JSON.stringify({
  status: 'ready',
  projectId,
  location,
  model,
  query,
  dailyLimit,
  callsUsedToday: usage.calls + 1,
  trace,
  answer,
  rawUsageMetadata: geminiResponse.usageMetadata || null
}, null, 2));

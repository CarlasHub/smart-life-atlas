# Data Schema

Atlas uses synthetic data only. The live app reads local modules under `src/data`. The future agent proof uses a MongoDB-shaped seed file at `agent/mongodb/seed-data.json`.

The target database name is:

```text
atlas_life_intelligence
```

## Collection: life_areas

Represents user-approved life areas, equivalent to future consent boundaries.

Fields:

- `dimension`: stable key such as `health`, `travel`, `integrity`, `money`, `family`, or `memory`.
- `label`: user-facing name.
- `enabledByDefault`: whether the demo starts with the area enabled.
- `simulatedConsentScope`: plain-language description of what Atlas may read.

Example:

```json
{
  "dimension": "health",
  "label": "Health",
  "enabledByDefault": true,
  "simulatedConsentScope": "Read approved recovery instructions, appointment records, sleep summaries, and physical constraints."
}
```

## Collection: life_signals

Represents normalized events, records, or messages from approved sources.

Fields:

- `id`: stable signal ID, such as `sig-001`.
- `userId`: demo user key.
- `dimension`: life area required to use the signal.
- `timestamp`: ISO timestamp.
- `source`: source name shown to the user.
- `connectedThrough`: simulated connection route.
- `content`: normalized human-readable record.
- `restriction`: optional structured rule, used for medical or timing constraints.
- `usedFor`: optional scenario IDs that use the signal.

Example:

```json
{
  "id": "sig-002",
  "userId": "demo-carla",
  "dimension": "health",
  "timestamp": "2026-06-11T10:30:00Z",
  "source": "Medical Portal",
  "connectedThrough": "Google Sign-In concept",
  "content": "Post-op PDF: Must not fly for 36 hours post-anesthesia due to DVT risk.",
  "restriction": {
    "type": "no_flying",
    "durationHours": 36,
    "startsAfterSignalId": "sig-001"
  },
  "usedFor": ["post-op-compliance-trap"]
}
```

## Collection: evidence_items

Maps important conclusions back to source records.

Fields:

- `id`: stable evidence ID.
- `signalId`: associated `life_signals.id`.
- `category`: user-facing evidence category.
- `label`: short evidence label.
- `context`: source context.
- `detail`: explanation shown in the evidence inspector.

Example:

```json
{
  "id": "ev-no-fly-36h",
  "signalId": "sig-002",
  "category": "Health",
  "label": "No flying for 36 hours",
  "context": "Post-op instruction PDF",
  "detail": "Post-anesthesia instructions prohibit flying for 36 hours because of DVT risk."
}
```

## Collection: resolution_paths

Represents possible user-approved next steps.

Fields:

- `id`: stable resolution ID.
- `challengeId`: scenario ID.
- `label`: user-facing resolution name.
- `nextStep`: recommended action.
- `requiresUserApproval`: must be `true` for action-oriented steps.
- `supportingEvidenceIds`: related evidence IDs.

Example:

```json
{
  "id": "res-notary",
  "challengeId": "post-op-compliance-trap",
  "label": "Use Clause 8.1 remote notary workaround",
  "nextStep": "Ask counsel to trigger the remote notary clause with a medical certificate before the Friday 12:00 deadline.",
  "requiresUserApproval": true,
  "supportingEvidenceIds": ["ev-no-fly-36h", "ev-remote-notary"]
}
```

## Collection: memory_events

Represents historical records used for memory recall.

Fields:

- `id`: stable signal ID.
- `userId`: demo user key.
- `dimension`: currently `memory`.
- `timestamp`: ISO timestamp.
- `source`: memory source.
- `connectedThrough`: simulated connection route.
- `content`: memory detail.
- `place`: likely place connected to the event.

Example:

```json
{
  "id": "sig-013",
  "userId": "demo-carla",
  "dimension": "memory",
  "timestamp": "2022-06-11T13:30:00Z",
  "source": "Life History Archive",
  "connectedThrough": "Google Sign-In concept",
  "content": "Receipt: Brunch @ Pasteis de Belem, Lisbon.",
  "place": "Belem, Lisbon, Portugal"
}
```

## Collection: agent_tests

Defines deterministic test scenarios for the local proof script and future agent evaluation.

Fields:

- `id`: test scenario ID.
- `question`: user question.
- `requiredDimensions`: life areas that must be approved.
- `optionalDimensions`: life areas that enrich the answer but are not mandatory.
- `evidenceSignalIds`: signal IDs required for the answer.
- `expectedConclusion`: expected summary.
- `expectedResolutionId`: optional expected resolution path.

## Validation Rules

- Every `life_signals.dimension` must match a `life_areas.dimension`.
- Every `evidence_items.signalId` must match a `life_signals.id`.
- Every `resolution_paths.supportingEvidenceIds` value must match an `evidence_items.id`.
- Every `agent_tests.evidenceSignalIds` value must match a `life_signals.id` or `memory_events.id`.
- Action-oriented `resolution_paths` must set `requiresUserApproval` to `true`.

## Example Agent Queries

Find the Post-Op Compliance Trap test:

```json
{ "id": "post-op-compliance-trap" }
```

Find evidence signals:

```json
{ "id": { "$in": ["sig-001", "sig-002", "sig-004", "sig-006", "sig-007", "sig-008"] } }
```

Find evidence items:

```json
{ "signalId": { "$in": ["sig-001", "sig-002", "sig-004", "sig-006", "sig-007", "sig-008"] } }
```

Find memory events for 11 June 2022:

```json
{
  "timestamp": {
    "$gte": "2022-06-11T00:00:00Z",
    "$lte": "2022-06-11T23:59:59Z"
  }
}
```

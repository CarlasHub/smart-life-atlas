# Live Agent Proof

Atlas includes a minimal live Gemini proof for the hackathon agent requirement.

The goal is to prove the Google Agent Platform / Gemini reasoning step without exposing a public prompt endpoint or creating an always-on service that can be abused.

For the stronger functional Agent Builder + MongoDB MCP path, see `docs/AGENT_BUILDER_MCP_PROOF.md`.

## Google Cloud Project

Dedicated project:

```text
atlas-agent-20260611
```

Billing guardrail:

```text
Atlas Agent Demo Budget
GBP 1 monthly budget
Scoped to project atlas-agent-20260611
Threshold alerts: 25%, 50%, 90%, 100%
```

Enabled specifically for the live proof:

```text
aiplatform.googleapis.com
billingbudgets.googleapis.com
```

## What The Live Proof Does

`scripts/live-agent-proof.mjs` builds the same tool trace as the local proof:

1. read the synthetic MongoDB-shaped seed data from `agent/mongodb/seed-data.json`
2. allow only preset demo queries
3. construct a tool trace from approved life areas, evidence IDs, and resolution paths
4. send that trace to Gemini through Google Agent Platform / Vertex AI
5. require the answer to stay inside the supplied evidence
6. refuse when a required source area is missing

This proves the Gemini reasoning step while keeping the data local, synthetic, deterministic, and safe for judging.

## Abuse Controls

The live proof is intentionally not a public endpoint.

Controls:

- only these query keys are accepted: `post-op`, `memory`, `refusal`
- arbitrary user prompts are blocked
- no credentials are committed
- no real Gmail, Calendar, Drive, health, finance, legal, travel, or personal data is used
- no action is performed; suggested next steps require user approval
- live calls are limited locally to 3 per UTC day by default
- the local call counter is written to `.atlas-live-agent-usage.json`, which is gitignored
- the cloud project has a GBP 1 monthly budget alert
- the hosted proof route separately requires a Resend email notification to succeed before any non-cached live generation attempt
- the hosted proof route defaults to disabling after `2026-07-16T07:00:00Z`

Environment overrides:

```bash
ATLAS_AGENT_PROJECT=atlas-agent-20260611
ATLAS_AGENT_LOCATION=global
ATLAS_AGENT_MODEL=gemini-2.5-flash
ATLAS_LIVE_AGENT_DAILY_LIMIT=3
```

## Commands

Dry run, no Gemini call:

```bash
npm run agent:live:dry
```

Live Post-Op Compliance Trap proof:

```bash
npm run agent:live -- --query=post-op
```

Live source-gated refusal proof:

```bash
npm run agent:live -- --query=refusal
```

Live memory proof:

```bash
npm run agent:live -- --query=memory
```

## Verified Live Result

One live `post-op` call was run against:

```text
project: atlas-agent-20260611
location: global
model: gemini-2.5-flash
```

The call returned a Gemini answer explaining:

- procedure at 08:00
- 36-hour no-fly restriction
- flight at 19:30
- 11.5 hours between procedure and flight
- legal signing risk
- $250,000 valuation risk

Reported usage for that call:

```text
promptTokenCount: 1024
candidatesTokenCount: 105
thoughtsTokenCount: 572
totalTokenCount: 1701
trafficType: ON_DEMAND
```

## Limitations

This live proof is not a public Google Agent Studio deployment.

It also does not connect to a real MongoDB Atlas cluster or a running hosted MongoDB MCP server. The tool trace is generated locally from MongoDB-shaped seed collections, then Gemini performs the final evidence-backed reasoning step.

This is deliberate: it gives judges a live Gemini / Agent Platform proof while avoiding a public endpoint, uncontrolled prompt abuse, real personal data, and always-on cloud resources.

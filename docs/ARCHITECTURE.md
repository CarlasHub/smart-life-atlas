# Architecture

Atlas is a frontend-first prototype for a future Google ecosystem life intelligence agent.

This document has two jobs:

1. Describe what the current submitted demo actually does.
2. Show the future architecture Google could use to implement Atlas across Google users, Google apps, and third-party apps connected through Google Sign-In.

The live app is React/Vite with local synthetic product data and a capped Vercel proof endpoint. The product UI does not call real OAuth, Gmail, Calendar, Drive, health, finance, travel, legal, or personal APIs. The Guide -> Trust & security live proof panel can call Google Cloud Gemini and MongoDB MCP only when server-side Vercel secrets are configured.

The repo also includes a credential-ready proof path for a future Google Cloud Agent Builder and MongoDB MCP implementation, a Google ADK agent artifact, a local functional MongoDB MCP proof, and a minimal CLI live Gemini proof through Google Agent Platform / Vertex AI.

## Product Architecture Goal

Atlas should become a trusted life intelligence layer for the Google ecosystem.

The user signs in with a Google Account, grants narrow consent to selected life areas, and Atlas turns approved signals from Google apps and Google Sign-In-connected third-party apps into:

- a daily life story
- hidden conflict detection
- evidence-backed explanations
- memory recall
- user-approved next steps

The core architecture principle is simple:

```text
No consent -> no retrieval.
No evidence -> no important claim.
No user approval -> no action.
```

## Current Live Demo

```text
User
  -> React/Vite app on Vercel
  -> local synthetic data in src/data
  -> deterministic source-gated reasoning
  -> UI output: Home, Connect, Briefing, Memory, Ask Atlas, Guide
```

Current behavior:

- Connect toggles simulate user-approved life areas.
- Briefing uses local insight and evidence data.
- Ask Atlas answers deterministic preset questions.
- If required life areas are disabled, Ask Atlas refuses with: `I cannot answer that because the required source is not connected.`
- The Guide page includes a capped live proof panel and a simulated future agent environment.

The current product demo is intentionally local and synthetic so judges can open it safely without real personal data, OAuth secrets, or paid API usage. The live proof endpoint is disabled unless deployment secrets are set.

The CLI live proofs use preset synthetic traces and local daily call counters. The hosted proof endpoint uses the same safety model with a fixed query, server-side secrets, a low daily cap, and Vercel edge caching.

## Future Google-Scale Architecture

```text
Google Account
  -> Google Sign-In
  -> consent by app, scope, and life area
  -> Google app connectors
  -> third-party Google Sign-In app connectors
  -> normalization and policy checks
  -> life signal store
  -> evidence index
  -> MongoDB MCP partner tool layer
  -> Google Cloud Agent Builder
  -> Gemini grounded reasoning
  -> daily story, conflict detection, memory, and next-step plans
  -> user approval
  -> safe action execution through Google-owned workflows
```

At production scale, Google should own the identity, consent, policy, auditing, user surfaces, and action approval layers. The partner MCP layer can provide a structured memory and evidence retrieval system for life signals.

## Recommended Production Components

| Layer | Google-scale responsibility | Atlas role |
| --- | --- | --- |
| Identity | Google Account and Google Sign-In | Establish one trusted user identity. |
| Consent | OAuth scopes, life-area permissions, revocation | Make access visible and narrow. |
| Source connectors | Gmail, Calendar, Drive, Docs, Maps-style context, Photos, Tasks, Workspace, Health Connect, approved third-party apps | Read only approved signals. |
| Ingestion | Event-driven updates, scheduled sync, deduplication | Convert app events into normalized life signals. |
| Policy gate | Consent check, scope check, source check, retention check | Block unauthorized retrieval before reasoning starts. |
| Life signal store | Secure user-scoped data store | Store normalized signals, evidence IDs, and memory events. |
| MCP tool layer | Partner-compatible retrieval interface | Let the agent query approved records without direct database coupling. |
| Agent orchestration | Google Cloud Agent Builder | Plan tool calls, apply safety rules, and coordinate next steps. |
| Reasoning | Gemini | Build grounded daily stories and explain conflicts with evidence. |
| Evidence | Source citations, document references, timeline links | Let users inspect why Atlas reached a conclusion. |
| Actions | User-approved workflows | Draft, schedule, notify, or prepare next steps only after confirmation. |
| Observability | Cloud Logging, Monitoring, audit trails, budget controls | Prove what happened and control cost. |

## Google Implementation Blueprint

### 1. Account And Consent

Atlas should start from a familiar Google Account entry point.

Production consent should be split into two levels:

- App authorization: Gmail, Calendar, Drive, Docs, Photos, Tasks, Workspace, Health Connect, and third-party apps using Google Sign-In.
- Life-area authorization: Health, Travel, Integrity, Money, Family, Work, and Memory.

The product should show users exactly which life areas improve which Atlas features. For example, disabling Travel should remove flight reasoning, and disabling Memory should remove past-day recall.

Consent must be revocable. A revoked source should stop new retrieval immediately and remove that source from future reasoning.

### 2. Source Connectors

Google-native sources should provide first-class signals:

- Gmail: confirmations, notices, commitments, attachments, family messages.
- Calendar: appointments, travel windows, deadlines, reminders.
- Drive and Docs: contracts, forms, instructions, legal clauses, evidence files.
- Maps-style context: trips, locations, arrival feasibility, travel timing.
- Photos and Memory: places, receipts, historical context, personal recall.
- Tasks and Keep-style notes: commitments and open loops.
- Workspace: work documents, meetings, notes, deadlines.
- Health Connect or approved medical portals: constraints such as recovery instructions.

Third-party apps using Google Sign-In should be invited into the same model. Their advantage is clear: connected apps can appear in the user's daily story, evidence layer, and next-step flow.

### 3. Normalization

Raw app data should not be passed directly to the agent.

Each source should be normalized into small life-signal records:

```text
source event
  -> user and consent validation
  -> life area classification
  -> signal extraction
  -> evidence ID attachment
  -> retention policy assignment
  -> storage in the user-scoped life signal store
```

The normalized record should include:

- user ID or pseudonymous account ID
- source app
- connected account
- life area
- timestamp
- signal type
- plain-language summary
- evidence IDs
- sensitivity level
- retention rule

This keeps the agent grounded while reducing unnecessary exposure to full raw documents.

### 4. Life Signal Store And MCP Retrieval

For the hackathon track, Atlas models the memory layer with MongoDB-shaped collections and a MongoDB MCP server configuration.

In a future implementation, the store should support:

- user-scoped records
- consent-aware querying
- evidence lookup
- memory events
- resolution paths
- agent run logs
- revocation and deletion workflows
- retention policies by data type

The agent should never query the store directly without policy checks. Retrieval should go through an MCP tool boundary that can enforce allowed collections, filters, rate limits, and audit logging.

### 5. Agent Builder And Gemini Reasoning

Google Cloud Agent Builder should coordinate the reasoning loop:

```text
User question or daily scheduled brief
  -> identify required life areas
  -> check consent state
  -> retrieve approved signals through MCP
  -> retrieve evidence items
  -> ask Gemini to reason only over approved evidence
  -> produce a daily story, conflict explanation, or answer
  -> show citations and uncertainty
  -> propose next steps
  -> wait for user approval before action
```

Gemini should not be asked to guess from unavailable sources. If a required source is disconnected, Atlas should refuse instead of hallucinating.

### 6. Evidence And User Trust

Every important conclusion should be inspectable.

For each insight, Atlas should show:

- what Atlas noticed
- which life areas were used
- which source apps contributed
- the evidence records
- the confidence level
- the uncertainty
- the next safe move

This is what makes Atlas different from a notification feed. It is not only alerting the user. It is explaining the life situation in a way the user can verify.

### 7. Safe Action Layer

Atlas should suggest actions before it performs actions.

Examples:

- draft a message to counsel
- prepare a remote notary request
- suggest a flight change
- create a checklist
- draft a calendar update
- prepare a family reminder

Actions should require explicit user approval. High-impact actions should show a confirmation screen with evidence, affected apps, and the exact change Atlas will make.

## Multi-User Production Flow

```text
1. User signs in with Google.
2. User chooses life areas and connected apps.
3. Source connectors ingest approved signals.
4. Policy gate validates consent before storage and retrieval.
5. Life signals are stored with evidence IDs and retention rules.
6. Daily brief job asks Agent Builder to generate a life story.
7. Agent Builder queries approved records through MCP.
8. Gemini reasons over approved evidence only.
9. Atlas shows a daily story, conflicts, evidence, and next steps.
10. User approves or rejects suggested actions.
11. Audit logs record sources, tool calls, evidence IDs, and actions.
12. User can revoke access, delete data, or inspect history.
```

## Source-Gated Decision Tree

```text
Does the question require protected life areas?
  No
    -> answer from general app context
  Yes
    -> are all required life areas enabled?
      No
        -> refuse and name the missing source area
      Yes
        -> retrieve approved signals
        -> assemble evidence
        -> answer with confidence, uncertainty, and next step
```

## Main Demo Path

The Post-Op Compliance Trap uses these required life areas:

- Health
- Travel
- Integrity

It connects these facts:

- procedure at 08:00
- no flying for 36 hours
- flight at 19:30
- legal signing Friday 09:00
- legal deadline Friday 12:00
- $250,000 valuation risk
- Clause 8.1 remote notary workaround

The recommended path is to ask counsel to use Clause 8.1 with a medical certificate before the Friday 12:00 deadline.

This scenario is valuable because the risk is cross-app:

- the medical restriction may live in a portal, PDF, or health record
- the flight may live in Gmail or a travel app
- the signing may live in Calendar
- the deadline may live in a legal document
- the resolution may live in a contract clause

A single app cannot reliably see this. A Google-native life intelligence layer can, if the user has granted consent.

## User Surfaces

Atlas should not live in only one web app.

Future Google surfaces could include:

- a standalone Atlas web app
- Android and Pixel experiences
- Gemini app surfaces
- Gmail side panels for message-linked insights
- Calendar side panels for timing conflicts
- Drive and Docs evidence panels
- Workspace admin-safe deployment for work accounts
- mobile widgets for daily brief and unresolved risks
- Assistant-style voice entry after consent and safety controls

The current prototype demonstrates the first surface: a standalone web experience.

## Repository UI Surfaces

- Home: daily life story and high-priority insight.
- Connect: simulated consent and source control.
- Briefing: life brief, Agent trace, timeline, evidence, resolution path.
- Memory: historical recall for 11 June 2022.
- Ask Atlas: source-gated preset assistant answers.
- Guide: first-time guide plus an in-page Trust & security tab for platform status and the simulated agent environment.
- Automatic guided tour: reviewer walkthrough that starts on app load and uses real navigation, source state, Ask Atlas questions, and source-gated refusal.

## Rollout Plan For Google

### Phase 1: Safe Preview

- Launch with Gmail, Calendar, Drive/Docs, and manually connected synthetic or sample data.
- Keep all actions as draft-only.
- Require evidence for every major insight.
- Add revocation, deletion, and activity history from day one.

### Phase 2: Daily Life Story

- Add daily scheduled brief generation.
- Add user feedback on accuracy and usefulness.
- Add memory recall with confidence and uncertainty.
- Expand to Photos, Tasks, Maps-style travel context, and Workspace.

### Phase 3: Cross-App Conflict Detection

- Detect timing conflicts, missing dependencies, health/travel conflicts, legal deadline risk, and family/work collisions.
- Add stronger evidence timelines.
- Add confidence scoring and source freshness checks.

### Phase 4: User-Approved Actions

- Use Agent Builder to prepare next-step workflows.
- Keep high-impact actions behind explicit confirmation.
- Add action receipts and rollback guidance where available.

### Phase 5: Ecosystem Expansion

- Give third-party Google Sign-In apps a way to contribute approved life signals.
- Let users see which connected apps improve Atlas.
- Make Google Sign-In more valuable because connected apps can participate in the daily story.

## Production Safety Requirements

Google-scale Atlas should include:

- strict OAuth scope minimization
- consent-aware retrieval
- source revocation handling
- evidence IDs for important claims
- prompt-injection controls for email, documents, and messages
- data retention controls by source and sensitivity
- audit logs for agent runs and tool calls
- budget and rate limits
- monitoring for abnormal retrieval or token usage
- user-visible deletion and export controls

## Repository Proof Artifacts

- `agent/atlas-agent.md`: instructions for the future Atlas Life Story Agent.
- `agent/google-adk/atlas-agent.mjs`: Google ADK agent artifact configured with Gemini 3 and MongoDB MCP.
- `agent/mongodb/seed-data.json`: MongoDB-shaped synthetic collections.
- `agent/mongodb/mcp-server.example.json`: example MCP server configuration.
- `scripts/agent-proof.mjs`: local verifier for the source-gated reasoning contract.
- `scripts/live-agent-proof.mjs`: preset-only live Gemini proof through Google Agent Platform / Vertex AI.
- `scripts/agent-builder-mongodb-mcp.mjs`: functional local Agent Builder + MongoDB MCP proof with real MCP tool calls.
- `api/live-agent-proof.js`: hosted Vercel proof endpoint for fixed-query Gemini and MongoDB MCP verification.
- `docs/LIVE_AGENT_PROOF.md`: cloud project, budget, command, and limitation notes for the live proof.
- `docs/AGENT_BUILDER_MCP_PROOF.md`: ADK, MongoDB MCP, local MongoDB, and Gemini proof commands.

Run:

```bash
npm run agent:proof
npm run agent:live:dry
npm run agent:builder:mcp:dry
```

## Current Known Limits

- No public Google Cloud Agent Builder deployment.
- Hosted Gemini/MongoDB MCP proof is disabled until Vercel secrets and MongoDB Atlas seed data are configured.
- Separate CLI live Gemini proof exists through Google Agent Platform / Vertex AI.
- Separate local Agent Builder + MongoDB MCP proof exists with Google ADK and the official MongoDB MCP server.
- No committed MongoDB Atlas credentials.
- No real OAuth consent flow.
- No real Google API integration.
- No broad backend beyond the fixed capped proof endpoint.
- No real personal data.

These limits are intentional for the submitted prototype. The architecture above describes the correct future implementation path, not current live behavior.

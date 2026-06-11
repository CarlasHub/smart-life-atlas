# Architecture

Atlas is a frontend-first prototype for a future Google ecosystem life intelligence agent. The live app is static React/Vite with local synthetic data. It does not call Google Cloud, Gemini, MongoDB, OAuth, Gmail, Calendar, Drive, or third-party APIs.

The repository includes a credential-ready proof path for a future Google Cloud Agent Builder and MongoDB MCP implementation.

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
- The Guide page simulates the future agent environment without backend calls.

## Future Agent Architecture

```text
Google Account / Google Sign-In
  -> narrow OAuth consent by app and life area
  -> Google apps and third-party Google Sign-In apps
  -> normalized life signals
  -> MongoDB Atlas life-signal store
  -> MongoDB MCP tools
  -> Google Cloud Agent Builder using Gemini
  -> evidence-backed daily story, conflict detection, and user-approved next steps
```

The future backend is intentionally not included in the live app because the hackathon demo uses synthetic data and avoids real personal data, OAuth secrets, cloud charges, and external API risk.

## Reasoning Flow

```text
User question
  -> determine required life areas
  -> check whether each life area is authorized
  -> if a required area is missing, refuse
  -> query relevant life_signals through MongoDB MCP
  -> query evidence_items by signalId
  -> query resolution_paths for next-step options
  -> pass approved evidence to Gemini
  -> generate a plain-language answer with citations
  -> suggest next steps without taking action
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
        -> retrieve approved synthetic signals
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

## UI Surfaces

- Home: daily life story and high-priority insight.
- Connect: simulated consent and source control.
- Briefing: life brief, Agent trace, timeline, evidence, resolution path.
- Memory: historical recall for 11 June 2022.
- Ask Atlas: source-gated preset assistant answers.
- Guide: first-time guide, platform status, and simulated agent environment.

## Repository Proof Artifacts

- `agent/atlas-agent.md`: instructions for the future Atlas Life Story Agent.
- `agent/mongodb/seed-data.json`: MongoDB-shaped synthetic collections.
- `agent/mongodb/mcp-server.example.json`: example MCP server configuration.
- `scripts/agent-proof.mjs`: local verifier for the source-gated reasoning contract.

Run:

```bash
npm run agent:proof
```

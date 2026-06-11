# Agent Integration Proof

This folder documents the clean Google Cloud Agent Builder + MongoDB MCP path for Atlas.

The React app remains a safe prototype with synthetic local product data. The hosted Vercel app also has a capped proof endpoint that can call Gemini and MongoDB MCP when server-side secrets are configured. The files here show how the same story can be moved into a functional agent architecture without adding real user data to the submission.

## What Is Included

- `atlas-agent.md`: Agent Builder instructions for the Atlas Life Story Agent.
- `mongodb/seed-data.json`: MongoDB-shaped synthetic collections for life signals, evidence, memory, and resolution paths.
- `google-adk/atlas-agent.mjs`: Google ADK `LlmAgent` artifact configured for Gemini 3 and MongoDB MCP.
- `mongodb/mcp-server.example.json`: MCP server configuration using the official `mongodb-mcp-server` package.
- `../scripts/agent-proof.mjs`: local verifier that proves the same source-gated reasoning contract without cloud credentials.
- `../scripts/live-agent-proof.mjs`: live Gemini proof through Google Agent Platform / Vertex AI, using the same MongoDB-shaped evidence trace and strict preset-query limits.
- `../scripts/agent-builder-mongodb-mcp.mjs`: functional Agent Builder + MongoDB MCP proof with local MongoDB, real MCP tool calls, Google ADK agent creation, and optional Gemini call.

## What Is Not Included

- No real Google OAuth flow.
- No real Gmail, Calendar, Drive, health, travel, finance, or legal data.
- No checked-in MongoDB credentials.
- No live Agent Builder deployment from this repository alone.

The live deployment step requires a Google Cloud project, a MongoDB Atlas project, and credentials owned by the submitter or judging environment.

## Local Proof

Run:

```bash
npm run agent:proof
```

Expected result:

- Confirms the synthetic MongoDB collections exist.
- Confirms required life areas are connected.
- Reconstructs the Post-Op Compliance Trap from evidence IDs.
- Produces the Clause 8.1 remote notary resolution path.

To test source-gated refusal:

```bash
node scripts/agent-proof.mjs --enabled=health,travel
```

Expected result:

```text
I cannot answer that because the required source is not connected.
```

To test memory:

```bash
node scripts/agent-proof.mjs --query=memory
```

## Live Gemini Proof

A dedicated Google Cloud project exists for the live proof:

```text
atlas-agent-20260611
```

The project has a GBP 1 monthly budget alert scoped to the project. The live script does not expose a public endpoint and only allows preset demo queries.

Dry run without a Gemini call:

```bash
npm run agent:live:dry
```

Live Gemini call:

```bash
npm run agent:live -- --query=post-op
```

Allowed live query values:

- `post-op`
- `memory`
- `refusal`

The script defaults to `gemini-2.5-flash`, location `global`, and a local daily live-call limit of 3. These can be changed with `ATLAS_AGENT_MODEL`, `ATLAS_AGENT_LOCATION`, and `ATLAS_LIVE_AGENT_DAILY_LIMIT`.

This is still not a public Agent Studio deployment and it does not connect to a real MongoDB Atlas cluster. It proves the Gemini / Agent Platform reasoning step over the same MongoDB-shaped evidence trace while keeping cost and abuse risk low.

## Hosted Vercel Proof Endpoint

The app includes `/api/live-agent-proof?query=post-op` for the Guide -> Trust & security live proof panel.

Required Vercel environment variables:

```bash
ATLAS_LIVE_AGENT_ENABLED=true
MDB_MCP_CONNECTION_STRING="mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/atlas_life_intelligence"
GOOGLE_SERVICE_ACCOUNT_JSON_BASE64="base64-service-account-json"
ATLAS_USAGE_EMAIL_RESEND_API_KEY="resend-api-key"
ATLAS_USAGE_EMAIL_TO="you@example.com"
ATLAS_USAGE_EMAIL_FROM="Atlas Usage <alerts@example.com>"
```

The endpoint defaults to `ATLAS_LIVE_AGENT_DAILY_LIMIT=1`, accepts only the fixed `post-op` query, sends a usage email before any non-cached live generation attempt, starts `mongodb-mcp-server` in read-only mode, and caches successful responses.

The hosted endpoint defaults to `ATLAS_LIVE_AGENT_DISABLE_AFTER_UTC=2026-07-16T07:00:00Z`, which makes it return HTTP `410` automatically two days after the July 13 winner announcement window.

## Functional Agent Builder + MongoDB MCP Proof

The lowest-cost functional proof uses local MongoDB instead of MongoDB Atlas billing:

```bash
npm run agent:builder:mcp:dry
```

The script starts local `mongod` on `127.0.0.1:27018` if needed, seeds the synthetic `atlas_life_intelligence` database, starts the official `mongodb-mcp-server` package in read-only stdio mode, calls MCP tools, creates the Google ADK `LlmAgent`, and builds the prompt that Gemini receives.

Live Gemini call:

```bash
npm run agent:builder:mcp -- --query=post-op
```

The ADK artifact defaults to `gemini-3.1-pro-preview`, the current Gemini 3 family model ID in Google Cloud docs. The live runner caps output at 4096 tokens by default because Gemini 3.1 may spend part of that budget on reasoning tokens. Override it with `--max-output-tokens=8192` or `ATLAS_AGENT_MAX_OUTPUT_TOKENS` if a future run returns no final text.

If that model is unavailable in the current Google Cloud project, verify the full MCP path with:

```bash
npm run agent:builder:mcp -- --query=post-op --model=gemini-2.5-flash
```

## MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster.
2. Create database `atlas_life_intelligence`.
3. Create collections:
   - `life_areas`
   - `life_signals`
   - `evidence_items`
   - `resolution_paths`
   - `memory_events`
   - `agent_tests`
4. Import the matching arrays from `mongodb/seed-data.json`.
5. Store the Atlas connection string outside the repo.

To seed the demo collections from this repository:

```bash
ATLAS_SEED_MONGODB_CONFIRM=replace-demo-data npm run agent:seed:mongodb
```

The command requires `MDB_MCP_CONNECTION_STRING` and replaces the demo collection contents with `mongodb/seed-data.json`.

Example import pattern:

```bash
mongoimport --uri "$MONGODB_URI" --db atlas_life_intelligence --collection life_signals --jsonArray life_signals.json
```

The repository keeps all seed data in one JSON file for review. Split each collection array into its own import file before using `mongoimport`.

## MongoDB MCP Server

The official package metadata checked for this repo is:

```text
mongodb-mcp-server
```

Example server command:

```bash
npx -y mongodb-mcp-server@latest --readOnly
```

Environment variables supported by the package include:

```bash
MDB_MCP_CONNECTION_STRING="mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/atlas_life_intelligence"
MDB_MCP_READ_ONLY="true"
MDB_MCP_TELEMETRY="disabled"
MDB_MCP_API_CLIENT_ID="optional-atlas-api-client-id"
MDB_MCP_API_CLIENT_SECRET="optional-atlas-api-client-secret"
```

Use `mongodb/mcp-server.example.json` as the MCP server configuration template. Do not commit a real connection string.

## Google Cloud Agent Builder Setup

1. Create an agent in Google Cloud Agent Builder.
2. Use Gemini as the reasoning model.
3. Add the MongoDB MCP server as the partner MCP tool connection following the hackathon guidance.
4. Paste `atlas-agent.md` into the agent instructions.
5. Point the agent at the `atlas_life_intelligence` MongoDB database.
6. Test with:

```text
Why is tomorrow risky?
```

The expected answer should cite:

- procedure at 08:00
- no flying for 36 hours
- flight at 19:30
- legal signing Friday 09:00
- legal deadline Friday 12:00
- $250,000 valuation risk
- Clause 8.1 remote notary workaround

## Clean Submission Position

Use this wording if asked about the technical state:

```text
Atlas is a React/Vite prototype with a credential-ready Agent Builder and MongoDB MCP integration package. The app uses local synthetic data for safe judging. The repo includes MongoDB-shaped seed collections, official MongoDB MCP server configuration, Agent Builder instructions, and a local verifier that proves the source-gated reasoning contract. A live Agent Builder deployment requires Google Cloud and MongoDB Atlas credentials.
```

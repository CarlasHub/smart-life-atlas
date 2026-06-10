# Agent Integration Proof

This folder documents the clean Google Cloud Agent Builder + MongoDB MCP path for Atlas.

The React app remains a safe static prototype with synthetic local data. The files here show how the same story can be moved into a functional agent architecture without adding real user data to the submission.

## What Is Included

- `atlas-agent.md`: Agent Builder instructions for the Atlas Life Story Agent.
- `mongodb/seed-data.json`: MongoDB-shaped synthetic collections for life signals, evidence, memory, and resolution paths.
- `mongodb/mcp-server.example.json`: MCP server configuration using the official `@mongodb-js/mongodb-mcp-server` package.
- `../scripts/agent-proof.mjs`: local verifier that proves the same source-gated reasoning contract without cloud credentials.

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

Example import pattern:

```bash
mongoimport --uri "$MONGODB_URI" --db atlas_life_intelligence --collection life_signals --jsonArray life_signals.json
```

The repository keeps all seed data in one JSON file for review. Split each collection array into its own import file before using `mongoimport`.

## MongoDB MCP Server

The official package metadata checked for this repo is:

```text
@mongodb-js/mongodb-mcp-server
```

Example server command:

```bash
npx -y @mongodb-js/mongodb-mcp-server
```

Environment variables supported by the package include:

```bash
MDB_MCP_CONNECTION_STRING="mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/atlas_life_intelligence"
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

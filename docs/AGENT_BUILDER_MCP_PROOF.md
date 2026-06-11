# Agent Builder MCP Proof

This proof is the lowest-cost path for meeting the hackathon agent requirement without exposing a public prompt endpoint.

It uses:

- Google ADK JS as the Agent Builder / Agent Platform agent artifact
- Gemini model configuration, defaulting to `gemini-3.1-pro-preview`
- the official `mongodb-mcp-server` package
- local `mongod` on `127.0.0.1:27018`
- the synthetic `atlas_life_intelligence` database seeded from `agent/mongodb/seed-data.json`

## Commands

Dry run with no Gemini call:

```bash
npm run agent:builder:mcp:dry
```

Live Gemini call:

```bash
npm run agent:builder:mcp -- --query=post-op
```

The live call uses `gemini-3.1-pro-preview` and a 4096-token output cap by default. The cap is intentionally finite for cost control, but it leaves room for Gemini 3.1 reasoning tokens plus a concise final answer. Override it only for verification:

```bash
npm run agent:builder:mcp -- --query=post-op --max-output-tokens=8192
```

If Gemini 3.1 Pro preview is not available in the Google Cloud project yet, use a working model explicitly for fallback verification:

```bash
npm run agent:builder:mcp -- --query=post-op --model=gemini-2.5-flash
```

Allowed query values:

- `post-op`
- `memory`
- `refusal`

Seed MongoDB Atlas for the hosted Vercel endpoint:

```bash
ATLAS_SEED_MONGODB_CONFIRM=replace-demo-data npm run agent:seed:mongodb
```

The seeding command requires `MDB_MCP_CONNECTION_STRING` and replaces only the demo collections listed in `agent/mongodb/seed-data.json`.

## What It Proves

The script:

1. starts local MongoDB if needed
2. seeds the synthetic Atlas collections
3. starts `mongodb-mcp-server` in read-only stdio mode
4. calls real MCP tools: `list-collections` and `find`
5. constructs an evidence trace from MCP responses
6. creates the Google ADK `LlmAgent` defined in `agent/google-adk/atlas-agent.mjs`
7. optionally sends the MCP trace to Gemini through Google Agent Platform / Vertex AI

## Verified Live Result

A live verification run on June 11, 2026 returned `status: "ready"` using:

- project: `atlas-agent-20260611`
- location: `global`
- model: `gemini-3.1-pro-preview`
- max output tokens: `4096`
- MCP server: `mongodb-mcp-server`
- exposed MCP tools: `aggregate`, `find`, `list-collections`

The returned answer cited `sig-001`, `sig-002`, `sig-004`, `sig-006`, `sig-007`, and `sig-008`; identified the 11.5-hour post-procedure flight inside a 36-hour no-fly window; suggested the remote notary workaround; and stated that the next step requires user approval.

Usage metadata for that run:

- prompt tokens: `3696`
- answer tokens: `187`
- reasoning tokens: `1533`
- total tokens: `5416`

## Hosted Vercel Endpoint

The live app includes `/api/live-agent-proof?query=post-op` and a Guide -> Trust & security panel that calls it.

The endpoint is disabled until these Vercel environment variables exist:

- `ATLAS_LIVE_AGENT_ENABLED=true`
- `MDB_MCP_CONNECTION_STRING`
- `GOOGLE_SERVICE_ACCOUNT_JSON` or `GOOGLE_SERVICE_ACCOUNT_JSON_BASE64`
- `ATLAS_USAGE_EMAIL_RESEND_API_KEY`
- `ATLAS_USAGE_EMAIL_TO`
- `ATLAS_USAGE_EMAIL_FROM`

Optional controls:

- `ATLAS_LIVE_AGENT_DAILY_LIMIT`, default `1`
- `ATLAS_AGENT_PROJECT`, default `atlas-agent-20260611`
- `ATLAS_AGENT_LOCATION`, default `global`
- `ATLAS_AGENT_MODEL`, default `gemini-3.1-pro-preview`
- `ATLAS_AGENT_MAX_OUTPUT_TOKENS`, default `4096`
- `ATLAS_USAGE_EMAIL_REPLY_TO`, optional reply-to address
- `ATLAS_LIVE_AGENT_DISABLE_AFTER_UTC`, automatic shutoff date. The route defaults to `2026-07-16T07:00:00Z` for this hackathon, two days after the July 13 winner announcement window.

The hosted route:

1. accepts only `GET /api/live-agent-proof?query=post-op`
2. rejects custom prompts and extra query parameters
3. starts `mongodb-mcp-server` in read-only stdio mode
4. sends a Resend email before any non-cached live generation attempt
5. reads the seeded MongoDB Atlas demo database through MCP
6. calls Gemini through Vertex AI with server-side credentials
7. caches successful responses at the Vercel edge for the day
8. returns HTTP `410` after `ATLAS_LIVE_AGENT_DISABLE_AFTER_UTC`

## Abuse Controls

- hosted endpoint accepts only one fixed query
- preset query keys only
- arbitrary user prompts are blocked
- live generation is blocked unless the pre-call usage email notification succeeds
- MongoDB MCP server runs in read-only mode
- local MongoDB seeding is refused for non-localhost connection strings
- live calls are capped locally to 3 per UTC day by default
- hosted live generation defaults to 1 per UTC day per warm serverless instance, with Vercel edge caching for successful responses
- hosted live generation can be disabled automatically after a configured UTC date
- Gemini output is capped locally and the script fails if no final answer text is returned
- the Google Cloud project has a GBP 1 monthly budget alert

## Limitations

This is not a hosted public Google Cloud Agent Builder console deployment.

The Google ADK agent artifact and MCP proof are local and repeatable. The hosted React app includes a capped Vercel proof endpoint, but it requires MongoDB Atlas seed data and Vercel secrets to be configured before the button can return a live Gemini/MCP answer.

The MongoDB data is synthetic. No real Gmail, Calendar, Drive, health, travel, finance, legal, OAuth, or personal account data is used.

Model note: Google Cloud docs list `gemini-3-pro-preview` as discontinued as of March 26, 2026 and direct projects to `gemini-3.1-pro-preview`, so this proof uses the current Gemini 3 family model ID by default.

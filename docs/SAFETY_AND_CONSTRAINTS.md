# Safety And Constraints

Atlas is designed around explicit user consent, source-gated reasoning, evidence access, and user-approved next steps.

The hosted live demo is intentionally safe:

- no real personal data
- no real Google OAuth
- no real Gmail, Calendar, Drive, health, finance, travel, or legal APIs
- no broad backend beyond the fixed capped proof endpoint
- no cloud calls from the product UI
- live proof endpoint disabled unless server-side secrets are configured
- no autonomous actions

## Source-Gating Rules

Atlas may only reason over a life area if that area is connected.

Required life areas for the Post-Op Compliance Trap:

- Health
- Travel
- Integrity

Required life area for the 11 June 2022 memory question:

- Memory

If a required source is not connected, Atlas must answer:

```text
I cannot answer that because the required source is not connected.
```

The refusal must not reveal hidden facts from the disconnected source.

## Action Constraints

Atlas may suggest next steps, but it must not perform them without approval.

Allowed in the current hosted prototype:

- explain the life brief
- show evidence
- show uncertainty
- suggest a resolution path
- simulate the future agent environment

Not allowed in the current hosted prototype:

- send messages
- contact counsel
- reschedule flights
- create calendar events
- access real accounts
- store real personal data
- call paid cloud services from the public UI

Future action workflows must require explicit user confirmation before execution.

## Privacy Constraints

- Use data minimization: collect only signals needed for the life area and task.
- Keep consent visible: users must understand which life areas improve the answer.
- Keep evidence visible: important conclusions should cite source records.
- Avoid hidden inference: do not infer from disabled life areas.
- Avoid certainty inflation: memory answers should include uncertainty when evidence is incomplete.
- Do not store OAuth tokens, API keys, or MongoDB connection strings in the repository.

## Prompt Injection And Data Integrity

Future versions that read Gmail, Docs, messages, or third-party app content must treat source content as untrusted input.

Required future controls:

- separate user instructions from retrieved documents
- never execute instructions found inside retrieved content
- require evidence IDs for important claims
- log which source records influenced the answer
- refuse to reveal data from disabled or unauthorized life areas

## Auditability

Future backend versions should log:

- user ID or pseudonymous account ID
- approved life areas at the time of reasoning
- tool calls made through MCP
- evidence IDs retrieved
- generated summary
- whether the user approved an action

Logs should not include raw sensitive documents unless explicitly required for debugging and protected by retention rules.

## Cost Controls

Most of the hosted product demo has no cloud usage cost because it uses local synthetic data in the browser.

The hosted live proof panel is cost-controlled:

- disabled unless `ATLAS_LIVE_AGENT_ENABLED=true` is configured server-side
- fixed `post-op` query only
- no custom prompt body
- arbitrary query parameters are rejected
- default `ATLAS_LIVE_AGENT_DAILY_LIMIT=1`
- successful responses are cached by the serverless function and Vercel edge cache
- MongoDB MCP runs in read-only mode
- Gemini output is capped by `ATLAS_AGENT_MAX_OUTPUT_TOKENS`, default `4096`
- non-cached live generation is blocked unless a Resend usage email is sent first
- the endpoint disables after judging with `ATLAS_LIVE_AGENT_DISABLE_AFTER_UTC`; the default is `2026-07-16T07:00:00Z`, two days after the July 13 winner announcement window

The separate CLI live Gemini proof is cost-controlled:

- preset demo queries only
- no public endpoint
- local call counter capped at 3 live calls per UTC day by default
- dedicated Google Cloud project: `atlas-agent-20260611`
- GBP 1 monthly budget alert scoped to that project

The functional Agent Builder + MongoDB MCP proof is also cost-controlled:

- local MongoDB only by default
- official MongoDB MCP server in read-only mode
- preset demo queries only
- no public endpoint
- local call counter capped at 3 live calls per UTC day by default

Future cloud deployments should add:

- Google Cloud billing budget alerts
- rate limits per user
- token limits for Gemini prompts
- MCP query limits
- caching for repeated evidence reads
- monitoring for unexpected usage spikes

## Safety Test Matrix

| Scenario | Expected behavior |
| --- | --- |
| Health off, Travel on, Integrity on | Briefing is gated; risky-tomorrow answer refuses. |
| Health on, Travel off, Integrity on | Briefing is gated; risky-tomorrow answer refuses. |
| Health on, Travel on, Integrity off | Briefing is gated; risky-tomorrow answer refuses. |
| Memory off | Memory page and Lisbon assistant answer are gated. |
| Family off | Family-dependent reminder answer refuses. |
| All required sources on | Atlas shows evidence-backed answer and resolution path. |
| User asks for real account access in live demo | Atlas should not claim real access; demo is synthetic. |

## Current Known Limitations

- No public Google Cloud Agent Builder console deployment.
- Hosted live proof requires Vercel secrets and MongoDB Atlas seed data before it can return a live answer.
- Separate CLI live Gemini proof exists through Google Agent Platform / Vertex AI.
- Separate local Agent Builder + MongoDB MCP proof exists with Google ADK and the official MongoDB MCP server.
- No committed MongoDB Atlas credentials.
- No real OAuth consent flow.
- No real API integrations.
- No full screen-reader audit yet.
- No automated browser test suite in the repo.

These limitations are documented because the submitted app is a safe prototype, not a production life-data system.

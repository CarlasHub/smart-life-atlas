# Safety And Constraints

Atlas is designed around explicit user consent, source-gated reasoning, evidence access, and user-approved next steps.

The live demo is intentionally safe:

- no real personal data
- no real Google OAuth
- no real Gmail, Calendar, Drive, health, finance, travel, or legal APIs
- no backend
- no cloud calls
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

Allowed in the current prototype:

- explain the life brief
- show evidence
- show uncertainty
- suggest a resolution path
- simulate the future agent environment

Not allowed in the current prototype:

- send messages
- contact counsel
- reschedule flights
- create calendar events
- access real accounts
- store real personal data
- call paid cloud services

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

The live demo has no cloud usage cost because it is static and local.

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

- No live Google Cloud Agent Builder deployment.
- No live Gemini runtime.
- No live MongoDB Atlas database.
- No real OAuth consent flow.
- No real API integrations.
- No full screen-reader audit yet.
- No automated browser test suite in the repo.

These limitations are documented because the submitted app is a safe prototype, not a production life-data system.

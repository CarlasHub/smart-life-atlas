# Atlas: Ambient Life Intelligence

## Elevator Pitch

Atlas turns Google into the daily life intelligence layer: a personal companion that connects Google apps and third-party apps through Google Sign-In, reads approved life signals, builds a daily life story, detects hidden conflicts, shows evidence, and makes Google more useful every day.

## Short Project Description

Atlas is designed as a life intelligence layer for the Google ecosystem. The product vision is simple: a user signs in with their Google Account, connects Google apps and third-party apps that use Google Sign-In, approves narrow access to trusted life areas, and Atlas turns authorized signals from Gmail, Google Calendar, Drive/Docs, Maps-style travel context, health records, family messages, school/work portals, travel apps, finance apps, and memory into one supportive daily life story.

Atlas helps people understand what is happening across health, travel, money, family, work, integrity, and memory without forcing them to read scattered apps or dense dashboards. The prototype demonstrates how a Gemini-powered life-story agent could combine approved signals into a daily narrative, highlight hidden conflicts, explain the evidence, and suggest a resolution path.

For Google, Atlas is not only a helpful assistant. It is a reason for people to use more of Google every day. The more a user connects Gmail, Calendar, Drive, Docs, Maps, Photos, Tasks, Workspace, and approved third-party apps through Google Sign-In, the better Atlas becomes. Apps outside the authorized Google ecosystem miss the daily story, the evidence layer, and the agentic next-step flow.

The main demo is the Post-Op Compliance Trap: Atlas detects that a procedure at 08:00 creates a 36-hour no-flying restriction, while a 19:30 flight is needed for a Friday 09:00 legal signing before a Friday 12:00 deadline. Missing the signing creates a $250,000 valuation risk, so Atlas surfaces Clause 8.1 as a remote notary workaround.

This is the kind of cross-app risk a Google-native agent should be able to find: the medical instruction may live in a document or portal, the flight in Gmail/travel data, the signing in Calendar, the legal deadline in Docs, and the resolution path in a contract clause.

## What It Does

- Builds a calm daily life brief from connected Google-style life sources.
- Connects the idea of Google apps and third-party Google Sign-In apps into one authorized life context.
- Lets the user choose life areas before Atlas can reason over them, simulating Google Account consent scopes.
- Turns approved signals into a daily life story: what happened, what matters, what is missing, and what to do next.
- Detects hidden timing conflicts that normal calendars can miss.
- Shows evidence for every important conclusion.
- Provides a guided resolution path instead of only warning the user.
- Answers preset assistant questions only when the required sources are connected.
- Demonstrates memory recall with the 11 June 2022 Lisbon history example.

## Google Ecosystem Story

- Google Sign-In would provide the trusted identity layer for both Google apps and third-party apps.
- OAuth consent would authorize only the app categories and life areas the user approves.
- Gmail, Calendar, Drive/Docs, Maps-style travel context, Photos/Memory, Health Connect, Workspace-style records, and third-party apps using Google Login would provide the signal layer.
- Gemini would reason over approved evidence, build the daily life story, and explain why a conflict matters.
- Google Agent Builder would coordinate next-step workflows, such as preparing a remote notary request.
- MongoDB MCP would support a future secure memory and life-signal store.

The current prototype uses local synthetic data to demonstrate this architecture safely. It does not make real Google API calls.

## Why This Matters For Google

- Makes Google the trusted daily operating layer for real life, not only search, email, and calendar.
- Increases the value of Gmail, Calendar, Drive, Docs, Maps, Photos, Tasks, and Workspace because each app contributes to the daily life story.
- Gives users a practical reason to keep more of their life organized inside Google-connected tools.
- Gives third-party apps a stronger reason to support Google Sign-In so they can participate in Atlas.
- Creates a natural home for Gemini-powered reasoning that is useful, evidence-backed, and action-oriented.
- Turns consent into a product advantage: the user sees exactly which life areas improve the story when connected.

## Built With

- Gemini CLI / Gemini Code Assist for product ideation, code generation support, and iteration.
- React
- Vite
- Sass
- Lucide React
- Local deterministic synthetic data

## Important Technical Note

This submitted prototype does not use real OAuth, real Gmail, real Calendar APIs, real health data, real financial data, a backend, MongoDB, Agent Builder, or the Gemini API yet. All data is synthetic and local. Source toggles control deterministic demo logic so judges can verify privacy, consent, evidence, and source-gated reasoning safely.

The future implementation plan is to add Google Sign-In, request narrow OAuth scopes, move the deterministic reasoning layer into Gemini, orchestrate approved actions through Google Agent Builder, and query a secure life-signal store through MongoDB MCP.

## Suggested Demo Flow

1. Start on Home and read the morning brief.
2. Open Connect and review the life areas Atlas can read as simulated Google consent scopes.
3. Confirm Health, Travel, Integrity, Family, and Memory are enabled.
4. Open Briefing and review the Post-Op Compliance Trap.
5. Inspect the evidence for the procedure, no-fly rule, flight, legal signing, deadline, valuation risk, and Clause 8.1 workaround.
6. Open Ask Atlas and ask: "Why is tomorrow risky?"
7. Turn off a required source and verify Atlas refuses to answer.
8. Open Memory and ask about 11 June 2022.

## AI Build Disclosure

Atlas was substantially designed and developed with Gemini CLI / Gemini Code Assist assistance. The raw Gemini transcript is not included in the submission because it contains local machine paths, terminal state, intermediate errors, and development prompts that are not useful for judging. This file provides the cleaned disclosure and implementation summary.

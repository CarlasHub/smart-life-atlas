# Atlas: Ambient Life Intelligence

- **Live demo:** https://smart-life-atlas.vercel.app
- **Source code:** https://github.com/CarlasHub/smart-life-atlas
- **Hackathon track:** MongoDB partner track, with a Google Cloud Agent Builder and MongoDB MCP integration proof
- **Status:** React/Vite prototype with local synthetic product data and a locked-down Vercel proof endpoint. No real OAuth, Gmail, Calendar, Drive, health, finance, legal, travel, or personal data are used.

**Keywords:** ambient life intelligence, personal intelligence companion, life story agent, Google ecosystem, Google Sign-In, Google Cloud Agent Builder, Gemini, MongoDB MCP, Model Context Protocol, synthetic data, evidence-backed reasoning, hidden conflict detection, Material Design 3, React, Vite.

Atlas is a Google ecosystem concept for a personal intelligence companion. It is designed for a future where a user signs in with their Google Account, connects Google apps and third-party apps that use Google Sign-In, explicitly authorizes trusted life-area access, and lets Atlas reason across approved signals from Gmail, Google Calendar, Drive/Docs, Maps-style travel context, health records, finance records, family messages, school portals, travel apps, finance apps, and long-term memory.

The submitted web app is a React/Vite prototype with local synthetic product data and one capped Vercel proof endpoint. It has no real OAuth, no real Gmail/Calendar/Drive/personal APIs, and no real personal data. The Connect screen simulates Google-style consent gates with local synthetic data so judges can see how authorization, source gating, evidence, and reasoning would work before real integrations are added.

The repository also includes a clean Agent Builder and MongoDB MCP integration proof under `agent/`. It provides Agent Builder instructions, a Google ADK agent artifact, MongoDB-shaped seed collections, an MCP server configuration example using `mongodb-mcp-server`, and local verifier scripts that prove the same source-gated reasoning contract without requiring public cloud deployment.

The Guide page includes a capped live proof panel plus a simulated agent environment. The live proof panel calls the server-side Vercel route only when secrets are configured; the surrounding product UI remains local and synthetic.

The app also includes an automatic guided product tour with coach marks and spotlight highlights. It starts when the app loads and takes reviewers through the major product surfaces: Home, smart avatar, personal context, Life Story Mode, Add to Atlas, sync status, Connect, app sources, Briefing, agent trace, evidence, resolution, Ask Atlas, source-gated refusal, Memory, Guide, Trust & security, and the simulated agent environment.

Home now includes Atlas Life Story Mode, a cost-free interactive story surface that turns the same local synthetic evidence into a clickable daily narrative. Judges can move between Daily story, Risk lens, and Next step views, click each story beat, and see evidence appear only when the required life areas are connected.

Home also includes an Add to Atlas control. It lets the user simulate feeding Atlas extra context as a note, document name, commitment, evidence item, or memory correction. Added signals are stored in local React state for the current browser session only. No file contents are uploaded or processed.

## Product Concept

Atlas is built around a simple Google-native idea: people already live across Gmail, Calendar, Docs, Maps, Photos, health apps, finance apps, family messages, school portals, work tools, and services connected through Google Sign-In, but no trusted assistant turns those fragments into a coherent daily life story.

Atlas would act as an ambient life-story agent. It reads only authorized signals, understands what happened today, remembers relevant history, detects hidden conflicts, and gives the user a plain-language daily story: what matters, why it matters, what evidence supports it, and what to do next.

For Google, Atlas creates a daily reason to use more of the Google ecosystem. Gmail, Calendar, Drive, Docs, Maps, Photos, Tasks, Workspace, and third-party apps connected through Google Sign-In become more valuable because each one can contribute to the user's daily story. Apps that are not connected miss the story, evidence, memory, and next-step layer.

Atlas helps a user understand their day across authorized life areas:

- Health
- Travel
- Integrity
- Money
- Family
- Memory

In production, the user would connect Atlas through Google Sign-In and a clear OAuth consent flow. Google would enforce scoped access; Atlas would only read the areas the user approves. In this prototype, those same permissions are represented by life-area toggles and synthetic source cards.

The experience is designed to feel human, familiar, and Google-quality rather than like an admin settings screen. The UI uses a light-first Material Design 3 direction with warm surfaces, rounded cards, clear hierarchy, subtle elevation, and restrained blue, green, yellow, and red accents.

## Google Ecosystem Fit

Atlas is positioned as a life intelligence layer for the Google ecosystem:

- Google Account: one familiar sign-in and consent entry point.
- Google apps: Gmail, Calendar, Drive, Docs, Maps, Photos, Tasks, Workspace, and Assistant-style surfaces.
- Third-party apps using Google Sign-In: travel apps, finance apps, school portals, medical portals, legal archives, family services, and work tools.
- Gmail: commitments, travel confirmations, family messages, and legal notices.
- Google Calendar: time conflicts, appointments, reminders, and deadline windows.
- Drive and Docs: contracts, medical PDFs, school forms, and evidence documents.
- Maps-style travel context: flights, locations, routes, and arrival feasibility.
- Photos and Memory: personal history, places, receipts, and past-day recall.
- Health Connect or provider portals: recovery rules and medical constraints.
- Gemini: evidence-grounded reasoning over approved signals.
- Google Cloud Agent Builder: safe action orchestration, such as drafting a legal workaround request.
- MongoDB MCP: secure life-signal memory store for cross-session continuity, demonstrated in this repo with seed collections and a verifier.

The current product demo does not connect to these services. It shows the intended product experience using local synthetic equivalents. A separate capped proof route can call Gemini and MongoDB MCP when server-side secrets are configured.

## Strategic Value For Google

Atlas is designed to make Google more central to daily life:

- Users get a better daily story when more Google apps are connected.
- Gmail, Calendar, Drive, Docs, Maps, Photos, Tasks, and Workspace become part of a single personal intelligence loop.
- Third-party apps have a stronger incentive to support Google Sign-In so their signals can appear in Atlas.
- Gemini becomes the reasoning engine for everyday life, not just a chat surface.
- Google Cloud Agent Builder becomes the safe action layer for resolving real-world conflicts.
- Consent becomes visible and useful: the user can see exactly how each approved app improves the briefing, memory, and next-step recommendations.

## Life Story Agent Model

Atlas is not meant to be another dashboard. The agent model is:

1. Connect: the user signs in with Google and authorizes Google apps plus selected third-party apps.
2. Read: Atlas reads only approved signals, with source-level evidence attached.
3. Understand: Gemini identifies patterns, conflicts, dependencies, memories, and missing context.
4. Narrate: Atlas creates a daily life story that is supportive, simple, and evidence-backed.
5. Act: Google Cloud Agent Builder coordinates safe next steps only after user approval.

The daily story is the core product. It should feel like: "Here is what is happening in your life, here is what I noticed, here is the evidence, and here is the next safe move."

## Agent Builder + MongoDB MCP Proof

The `agent/` folder turns the static prototype into a judge-readable technical plan for the required agent architecture:

- `agent/atlas-agent.md`: instructions for an Atlas Life Story Agent in Google Cloud Agent Builder.
- `agent/google-adk/atlas-agent.mjs`: Google ADK `LlmAgent` artifact configured for Gemini 3 and MongoDB MCP.
- `agent/mongodb/seed-data.json`: synthetic MongoDB collections for life areas, life signals, evidence, resolution paths, memory events, and deterministic agent tests.
- `agent/mongodb/mcp-server.example.json`: MCP server configuration for the official `mongodb-mcp-server` package.
- `scripts/agent-proof.mjs`: local proof that reconstructs the Post-Op Compliance Trap from MongoDB-shaped evidence IDs and enforces source-gated refusal.
- `scripts/live-agent-proof.mjs`: budget-guarded live Gemini proof through Google Agent Platform / Vertex AI using the same preset, MongoDB-shaped tool trace.
- `scripts/agent-builder-mongodb-mcp.mjs`: local functional agent proof that starts MongoDB, seeds synthetic data, calls the real MongoDB MCP server, creates the Google ADK agent, and optionally sends the MCP trace to Gemini.

Run the proof:

```bash
npm run agent:proof
```

Run the gated refusal check:

```bash
node scripts/agent-proof.mjs --enabled=health,travel
```

Run the memory check:

```bash
node scripts/agent-proof.mjs --query=memory
```

Run the live Gemini proof without making a model call:

```bash
npm run agent:live:dry
```

Run one live Gemini proof call through the dedicated Google Cloud project:

```bash
npm run agent:live -- --query=post-op
```

Run the functional Agent Builder + MongoDB MCP proof without a Gemini call:

```bash
npm run agent:builder:mcp:dry
```

Run the functional Agent Builder + MongoDB MCP proof with Gemini:

```bash
npm run agent:builder:mcp -- --query=post-op
```

Seed a MongoDB Atlas database for the hosted MCP endpoint:

```bash
ATLAS_SEED_MONGODB_CONFIRM=replace-demo-data npm run agent:seed:mongodb
```

The hosted Vercel app includes a capped live proof panel in Guide -> Trust & security. It calls `/api/live-agent-proof?query=post-op`, which only runs when server-side Vercel environment variables are configured:

- `ATLAS_LIVE_AGENT_ENABLED=true`
- `MDB_MCP_CONNECTION_STRING`
- `GOOGLE_SERVICE_ACCOUNT_JSON` or `GOOGLE_SERVICE_ACCOUNT_JSON_BASE64`
- `ATLAS_USAGE_EMAIL_RESEND_API_KEY`
- `ATLAS_USAGE_EMAIL_TO`
- `ATLAS_USAGE_EMAIL_FROM`
- optional: `ATLAS_LIVE_AGENT_DAILY_LIMIT`, default `1`
- optional: `ATLAS_AGENT_PROJECT`, `ATLAS_AGENT_LOCATION`, `ATLAS_AGENT_MODEL`, `ATLAS_AGENT_MAX_OUTPUT_TOKENS`
- optional: `ATLAS_USAGE_EMAIL_REPLY_TO`
- optional: `ATLAS_LIVE_AGENT_DISABLE_AFTER_UTC`, default `2026-07-16T07:00:00Z`

The live script is intentionally locked down:

- only preset queries are allowed: `post-op`, `memory`, and `refusal`
- the hosted endpoint only accepts the fixed `post-op` query
- arbitrary query parameters and custom prompts are blocked
- a local usage counter limits live calls to 3 per UTC day by default
- the hosted endpoint defaults to 1 live generation per UTC day per warm serverless instance and caches successful responses at the Vercel edge
- the hosted endpoint sends a Resend email before every non-cached live generation attempt, and blocks the live call if the email cannot be sent
- the hosted endpoint shuts off automatically with `ATLAS_LIVE_AGENT_DISABLE_AFTER_UTC`; the default cutoff is `2026-07-16T07:00:00Z`, two days after the July 13 winner announcement window
- Agent Builder MCP override knobs are environment variables: `ATLAS_AGENT_PROJECT`, `ATLAS_AGENT_LOCATION`, `ATLAS_AGENT_MODEL`, `ATLAS_AGENT_BUILDER_DAILY_LIMIT`, and `ATLAS_AGENT_MAX_OUTPUT_TOKENS`
- the separate minimal live Gemini proof uses `ATLAS_LIVE_AGENT_DAILY_LIMIT`
- the dedicated Google Cloud project is `atlas-agent-20260611`
- the project has a GBP 1 monthly budget alert scoped to that project

This is not a live hosted Google Cloud Agent Builder console deployment. The hosted Vercel endpoint is a capped proof route that starts the official MongoDB MCP server, reads seeded MongoDB Atlas demo data, and calls Gemini from server-side credentials.

The local functional Agent Builder MCP proof still uses local MongoDB by default. The hosted proof requires a MongoDB Atlas connection string that is intentionally not committed to this repo.

## Technical Docs

- [Architecture](docs/ARCHITECTURE.md): current product demo, capped proof endpoint, future agent architecture, source-gated flow, and UI surfaces.
- [Data Schema](docs/DATA_SCHEMA.md): MongoDB-shaped collections, field definitions, validation rules, and example queries.
- [Agent Builder MCP Proof](docs/AGENT_BUILDER_MCP_PROOF.md): Google ADK agent, local MongoDB, real MongoDB MCP server, and Gemini proof commands.
- [Live Agent Proof](docs/LIVE_AGENT_PROOF.md): Google Cloud project, budget guardrail, preset-only live Gemini proof, and limitations.
- [Safety And Constraints](docs/SAFETY_AND_CONSTRAINTS.md): source-gating rules, privacy constraints, action limits, cost controls, and safety tests.

## Demo Flow

1. Open the app with `npm run dev`.
2. Follow the automatic guided tour for the fastest path, or close it and start manually on Home by reading: "Good morning, Carla. Here is what Atlas noticed."
3. On Home, use Atlas Life Story Mode to switch between Daily story, Risk lens, and Next step, then click each story beat from procedure to Clause 8.1.
4. Use Add to Atlas to add a note, document name, commitment, evidence item, or memory correction, then verify the new signal appears on Home.
5. Open Connect and treat each life-area card as a simulated Google consent scope.
6. Review Sync status, last sync times, and the Sync now controls for approved synthetic app signals.
7. Open Briefing to view the Post-Op Compliance Trap.
8. Use the Agent trace to watch Atlas connect approved sources, recovery rules, deadlines, evidence, and the Clause 8.1 workaround.
9. Inspect evidence cards for the procedure, 36-hour no-fly restriction, 19:30 flight, Friday 09:00 legal signing, Friday 12:00 legal deadline, $250,000 valuation risk, and Clause 8.1 remote notary workaround.
10. Open Ask Atlas and ask "Why is tomorrow risky?"
11. Use the guided tour or Connect to turn Travel off, then ask the same risky-tomorrow question again and verify the refusal message.
12. Return Home and verify the affected Life Story Mode beats are paused until Travel is connected again.
13. Open Memory and review the 11 June 2022 Lisbon answer with confidence, evidence, and uncertainty.
14. Open Guide, switch to the Trust & security tab, and review the Platform status, Live capped proof, and Simulated agent environment sections.

The demo opens with Health, Travel, Integrity, Family, and Memory enabled so the main narrative is visible immediately. Money remains off by default. Turning any required area off removes it from the reasoning path.

## Design Direction

- Material Design 3-inspired layout and interaction patterns.
- Soft warm-white surfaces instead of grey-on-grey panels.
- Google-like accent colors used sparingly for meaning and hierarchy.
- Desktop sidebar navigation and mobile bottom navigation.
- Large readable headings, short plain-language descriptions, and visible next actions.
- Assistant presence is represented as an abstract orb, not a realistic face.
- The smart avatar shows what Atlas is watching, how much context is connected, and whether Memory is available.
- Home includes a familiar Today / Tomorrow / Memory strip so the product feels personal before it becomes analytical.
- Atlas Life Story Mode makes Home feel more alive by letting reviewers explore the daily story, risk lens, next step, source gates, and evidence without leaving the landing experience.
- Add to Atlas makes the prototype feel more personal by letting the user add a session-only note, document name, commitment, evidence item, or memory correction.
- Automatic guided tour gives reviewers a coach-mark path through the strongest product story and source-gating proof, with spotlight highlights and controls that remain visible while the explanatory copy scrolls inside the card.
- Connect includes simulated sync status, last sync times, and manual Sync now controls so users can see when approved synthetic app signals were checked.
- Home uses a generated immersive lifestyle/productivity hero image stored in `src/assets`.
- Atlas has a repo-native SVG logo and favicon; it does not copy Google branding.

## Accessibility Notes

- Primary navigation is a semantic `nav` with clear labels.
- Main content uses a skip link and semantic page sections.
- Buttons are real `button` elements with visible focus states.
- Source toggle buttons expose pressed state and text labels, not color alone.
- The smart avatar uses text labels and status rows rather than relying on animation or color alone.
- Atlas Life Story Mode uses real buttons, visible selected states, evidence labels, and source-gated status text rather than color-only meaning.
- The Guide page uses accessible in-page tabs for First steps and Trust & security.
- Guided tour uses real buttons, visible progress, and the same app state as the main source toggles.
- Evidence uses expandable `details` elements.
- Confidence values use meter semantics where appropriate.
- Copy avoids dense jargon and keeps next actions visible.
- Reduced motion preferences are respected for page transitions and assistant animation.

This prototype still needs a full manual screen-reader pass before making any accessibility compliance claim.

## Responsive Notes

The layout is intended to work at:

- 1440 desktop
- 1024 tablet
- 768 tablet
- 390 mobile

Responsive rules move the navigation to a bottom bar on smaller screens, collapse multi-column cards, and avoid horizontal overflow.

## Synthetic Data

All signals are local mock data under `src/data`. They represent approved synthetic equivalents of the Google apps and third-party Google Sign-In apps Atlas would read after account authorization:

- Medical Portal
- Health App
- Google Calendar
- Gmail
- Travel App
- Legal Archive
- Finance App
- Messages
- School Portal
- Work Notes
- Life History

If a required life area is off, Ask Atlas returns: "I cannot answer that because the required source is not connected."

This matters for the hackathon story: Atlas is not just a UI mockup. The source gates affect the deterministic reasoning path. Turning a source off removes it from the briefing, memory retrieval, and assistant answers.

The Add to Atlas control adds extra user-provided synthetic signals only to the current browser session. Selecting a file stores the file name for display only. The prototype does not upload, parse, or retain file contents.

The `agent/mongodb/seed-data.json` file mirrors the same story as MongoDB collections so the future Gemini and Agent Builder version can query life signals, evidence, resolution paths, and memory through MongoDB MCP.

## Future Platform Plan

- Google Sign-In: authenticate the user with a familiar Google Account entry point.
- OAuth consent: request narrow scopes for Gmail, Calendar, Drive/Docs, and other approved sources.
- Gemini: move deterministic local answers into a grounded reasoning layer that cites evidence.
- Google Cloud Agent Builder: orchestrate approved tools and user-safe resolution flows.
- MongoDB MCP: query the secure life-signal store through the Model Context Protocol using the included seed schema and MCP server configuration.
- Real integrations: add Gmail, Calendar, Drive/Docs, health, finance, travel, and document connectors only after consent, auditability, and data minimization are designed.

## Commands

```bash
npm install
npm run dev
npm run agent:proof
npm run agent:live:dry
npm run agent:builder:mcp:dry
npm run build
npm run lint
```

## Manual QA Checklist

Playwright is not installed in this prototype. Use this manual checklist after UI changes:

- At 1440 width, verify the sidebar labels are visible and the active section is obvious.
- At 1024 width, verify the compact sidebar icons remain keyboard focusable.
- At 768 width, verify the bottom navigation appears with no clipped labels.
- At 390 width, verify no horizontal scrolling, clipped buttons, or overlapping text.
- Toggle Health, Travel, and Integrity off one at a time and verify Briefing becomes gated.
- In Connect, click Sync now and verify approved app sources temporarily show syncing, then update last sync time.
- In Connect, verify disconnected app sources show Not connected and have disabled sync controls.
- On Home, open Add to Atlas, add a note, and verify it appears in the Tell Atlas summary.
- On Home, open Add to Atlas, select a file, and verify the UI states that only the file name is stored and no upload occurs.
- On Home, open Add to Atlas, press Escape and verify the dialog closes without adding a signal.
- Toggle Memory off and verify Memory and the Lisbon Ask Atlas answer are gated.
- Toggle Family off and verify "What am I forgetting?" is gated.
- Re-enable sources and verify the Post-Op Compliance Trap and 11 June 2022 Memory answer return.
- Reload the app and step through the automatic guided tour from start to finish.
- During the guided tour, verify the highlighted section scrolls into view and the Previous, primary Next, and icon Next controls remain visible at every step.
- In the guided tour, run the refusal step and verify Travel is removed from the connected areas and Ask Atlas refuses the risky-tomorrow answer.
- On Home, switch every Atlas Life Story Mode lens and click every story beat.
- Turn Travel off, return Home, and verify the flight and signing story beats explain which source is missing.
- In Briefing, click each Agent trace node and preset question chip to verify the detail panel changes.
- In Guide, switch between First steps and Trust & security, then click each Simulated agent environment stage and verify the detail panel changes without network access.
- Keyboard-tab through navigation, source toggles, preset questions, evidence details, and guide buttons.

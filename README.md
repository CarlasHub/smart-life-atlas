# Atlas: Ambient Life Intelligence

Atlas is a Google ecosystem concept for a personal intelligence companion. It is designed for a future where a user signs in with their Google Account, connects Google apps and third-party apps that use Google Sign-In, explicitly authorizes trusted life-area access, and lets Atlas reason across approved signals from Gmail, Google Calendar, Drive/Docs, Maps-style travel context, health records, finance records, family messages, school portals, travel apps, finance apps, and long-term memory.

The submitted web app is a React/Vite static prototype. It has no backend, no real OAuth, no real APIs, and no real personal data. The Connect screen simulates Google-style consent gates with local synthetic data so judges can see how authorization, source gating, evidence, and reasoning would work before real integrations are added.

The repository also includes a clean Agent Builder and MongoDB MCP integration proof under `agent/`. It provides Agent Builder instructions, MongoDB-shaped seed collections, an MCP server configuration example using `@mongodb-js/mongodb-mcp-server`, and a local verifier script that proves the same source-gated reasoning contract without requiring cloud credentials.

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
- Google Agent Builder: safe action orchestration, such as drafting a legal workaround request.
- MongoDB MCP: secure life-signal memory store for cross-session continuity, demonstrated in this repo with seed collections and a verifier.

The current demo does not connect to these services. It shows the intended product experience using local synthetic equivalents.

## Strategic Value For Google

Atlas is designed to make Google more central to daily life:

- Users get a better daily story when more Google apps are connected.
- Gmail, Calendar, Drive, Docs, Maps, Photos, Tasks, and Workspace become part of a single personal intelligence loop.
- Third-party apps have a stronger incentive to support Google Sign-In so their signals can appear in Atlas.
- Gemini becomes the reasoning engine for everyday life, not just a chat surface.
- Google Agent Builder becomes the safe action layer for resolving real-world conflicts.
- Consent becomes visible and useful: the user can see exactly how each approved app improves the briefing, memory, and next-step recommendations.

## Life Story Agent Model

Atlas is not meant to be another dashboard. The agent model is:

1. Connect: the user signs in with Google and authorizes Google apps plus selected third-party apps.
2. Read: Atlas reads only approved signals, with source-level evidence attached.
3. Understand: Gemini identifies patterns, conflicts, dependencies, memories, and missing context.
4. Narrate: Atlas creates a daily life story that is supportive, simple, and evidence-backed.
5. Act: Google Agent Builder coordinates safe next steps only after user approval.

The daily story is the core product. It should feel like: "Here is what is happening in your life, here is what I noticed, here is the evidence, and here is the next safe move."

## Agent Builder + MongoDB MCP Proof

The `agent/` folder turns the static prototype into a judge-readable technical plan for the required agent architecture:

- `agent/atlas-agent.md`: instructions for an Atlas Life Story Agent in Google Cloud Agent Builder.
- `agent/mongodb/seed-data.json`: synthetic MongoDB collections for life areas, life signals, evidence, resolution paths, memory events, and deterministic agent tests.
- `agent/mongodb/mcp-server.example.json`: MCP server configuration for the official `@mongodb-js/mongodb-mcp-server` package.
- `scripts/agent-proof.mjs`: local proof that reconstructs the Post-Op Compliance Trap from MongoDB-shaped evidence IDs and enforces source-gated refusal.

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

This is not a live Google Cloud deployment. A full deployment still requires a Google Cloud project, Google Cloud Agent Builder configuration, a MongoDB Atlas database, and credentials that are not committed to this repo.

## Demo Flow

1. Open the app with `npm run dev`.
2. Start on Home and read: "Good morning, Carla. Here is what Atlas noticed."
3. Open Connect and treat each life-area card as a simulated Google consent scope.
4. Open Briefing to view the Post-Op Compliance Trap.
5. Use the Agent trace to watch Atlas connect approved sources, recovery rules, deadlines, evidence, and the Clause 8.1 workaround.
6. Inspect evidence cards for the procedure, 36-hour no-fly restriction, 19:30 flight, Friday 09:00 legal signing, Friday 12:00 legal deadline, $250,000 valuation risk, and Clause 8.1 remote notary workaround.
7. Open Memory and review the 11 June 2022 Lisbon answer with confidence, evidence, and uncertainty.
8. Open Ask Atlas and try the preset questions.
9. Toggle life areas off to verify that Atlas refuses to answer when the required authorized source is unavailable.
10. Open Guide and review the Platform status section for the static demo, Agent Builder proof, and backend path.

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
- Home uses a generated immersive lifestyle/productivity hero image stored in `src/assets`.
- Atlas has a repo-native SVG logo and favicon; it does not copy Google branding.

## Accessibility Notes

- Primary navigation is a semantic `nav` with clear labels.
- Main content uses a skip link and semantic page sections.
- Buttons are real `button` elements with visible focus states.
- Source toggle buttons expose pressed state and text labels, not color alone.
- The smart avatar uses text labels and status rows rather than relying on animation or color alone.
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
- Toggle Memory off and verify Memory and the Lisbon Ask Atlas answer are gated.
- Toggle Family off and verify "What am I forgetting?" is gated.
- Re-enable sources and verify the Post-Op Compliance Trap and 11 June 2022 Memory answer return.
- Keyboard-tab through navigation, source toggles, preset questions, evidence details, and guide buttons.

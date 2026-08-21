Here's the full context, structured so you can hand it straight to your coding agent.



\---



\## Project: Dev Portfolio Website



\### Goal \& Positioning

\- First portfolio site, primary goal: land a job/internship

\- Owner learned web development through Programming Hero, currently doing Networking Solutions \& Systems Administration through the ISDB Scholarship Program

\- \*\*Long-term career goal is networking/systems administration\*\* — web dev is a supporting/secondary skill, not the destination

\- Framing choice: portfolio leads with web dev (since that's what's built and demoable right now), with networking positioned as "currently expanding into" — a forward-looking signal, not the headline. This may need revisiting as the networking program progresses.



\### Design Concept: "Flow"

Rationale: all three flagship projects move something through a system — money (MoneyFlows), materials (YardFlow), signal (EN IPTV Player) — and the owner's future is in networking infrastructure, the literal plumbing behind "flow."



\- \*\*Palette:\*\* ink navy background (`#0B1120`), panel `#121A2B`, border `#1E2A42`, signal-teal accent `#4FD1C5` (network/data), ledger-amber accent `#E8A33D` (finance/ERP), text primary `#E4E9F2`, text secondary `#8B96AC`

\- \*\*Type:\*\* Space Grotesk (headings), Inter (body), JetBrains Mono (tech-stack tags/labels)

\- \*\*Signature element:\*\* animated trace line running down the page connecting Hero → Projects → Skills → Contact (`FlowLine.tsx`), with pulse nodes marking each section



\### Tech Stack (site itself)

React + TypeScript + Vite + Tailwind CSS — chosen because it matches the owner's existing skillset from MoneyFlows, so no new tools to learn, and it doubles as more proof of ability. Static site, no backend needed.



\### Site Structure

| Section | Content |

|---|---|

| Hero | Name, pitch, links to GitHub/LinkedIn/resume, CTA |

| Projects | MoneyFlows → YardFlow → EN\_TvPlayer, in that order |

| Skills | Languages / Frameworks / Tools, plus "currently learning: networking" callout |

| About | Journey: Programming Hero → ISDB networking program → target role |

| Contact | Email, LinkedIn, GitHub |



\### Current Build Status

Scaffolded and delivered as a zip (`dev-portfolio.zip`) with full file structure:

```

portfolio/

├── index.html

├── package.json / vite.config.ts / tsconfig.json / tailwind.config.ts / postcss.config.js

├── src/

│   ├── main.tsx / App.tsx / index.css

│   ├── components/ (Hero, Projects, Skills, About, Contact, FlowLine)

│   └── data/projects.ts   ← all project content lives here

└── README.md

```

\*\*Not yet verified\*\*: `npm install` / build couldn't be run in my sandbox (no network access) — needs a local test pass. If your agent hits compile errors, they're most likely trivial (e.g. missing type imports), not structural.



\*\*Placeholders still in the code\*\* (agent should fill or ask you for):

\- Real email + LinkedIn URL in `Contact.tsx`

\- Project screenshots (currently text-only cards)



\### Projects — Content \& Framing (already written into `src/data/projects.ts`)



\*\*1. MoneyFlows\*\* (lead project — strongest/most polished)

Repo: `github.com/Nur-allhi/moneyflows`

> Privacy-first, offline-first family finance tracker — no servers, no accounts, in-browser SQLite (WASM). Clean Architecture: UI never touches DB directly, only a port/adapter interface. Soft-delete with 30-day auto-purge, SHA-256-verified backups.

Stack: React, TypeScript (strict), Vite, sql.js, Zustand, Tailwind

Status: actively being worked on



\*\*2. YardFlow\*\* (most ambitious scope — needs refinement before going fully live)

Repo: `github.com/Nur-allhi/yardflow` · Live: `efty-yardflow.vercel.app`

> Multi-tenant SaaS ERP for iron/workshop businesses. Inventory with Weighted Average Cost, purchasing, sales, payroll, immutable P\&L snapshots. 22 tables/9 modules, RBAC, JWT auth with org-level isolation.

Stack: Next.js 15, TypeScript, PostgreSQL, Drizzle ORM, Tailwind

Status: in refinement



\*\*3. EN IPTV Player\*\* (most unique story — differentiator)

Repo: `github.com/Nur-allhi/EN\_TvPlayer`

> DRM-capable IPTV player for Samsung Tizen TVs — built to solve a real gap (no other player handled DRM-licensed MPD streams). HLS/DASH/MSS via Shaka Player, remote-control nav, built-in CORS proxy.

Stack: JavaScript, Shaka Player, Node.js, Tizen SDK

Status: shipped/live



\### Open To-Dos (not yet done)

1\. Test `npm install \&\& npm run dev` locally, fix any build errors

2\. Add real screenshots/GIFs to all three GitHub repo READMEs (currently missing/"coming soon")

3\. Decide what specifically to polish in YardFlow before treating it as portfolio-ready

4\. Fill in real email/LinkedIn in `Contact.tsx`

5\. Deploy (Vercel/Netlify — auto-detects Vite)

6\. Be ready to speak in interview depth to one technical decision per project (e.g. why Clean Architecture in MoneyFlows, why WAC costing in YardFlow, why Shaka Player for EN\_TvPlayer) — projects were AI-assisted but owner understands the code and can explain/improve it



\### Parked for Later

\- Hybrid networking+web project idea (e.g. network monitoring dashboard) — owner deferred this, may revisit once networking coursework progresses

\- Resume alignment with portfolio narrative — not yet discussed


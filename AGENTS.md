# AGENTS.md

## Available Skills

| Skill | Purpose |
|-------|---------|
| `frontend-design` | Frontend design patterns |
| `code-reviewer` | Code review, checklist, quality scripts |
| `ui-ux-pro-max` | UI/UX design system, data, reasoning |
| `senior-backend` | Backend patterns, API design, DB optimization |
| `senior-frontend` | React patterns, Next.js optimization |
| `skill-creator` | Skill creation and evaluation |
| `gitnexus` | Knowledge graph, impact analysis, repo indexing |

Installed via `npx claude-code-templates` and `npm install -g gitnexus` + `gitnexus setup` (MCP: OpenCode).

## Project Structure

```
dev_porfolio/
├── DESIGNS/index.html, blog.html   # exact design references
├── Project_Plan/PORTFOLIO-PLAN.md  # build plan
├── Project_Plan/DESIGN-PROMPT.md   # design generation prompt
├── docs/PRD.md, TAD.md, SECURITY.md, FRONTEND_SPEC.md, TICKETS.md, REPO_RULES.md
├── src/            # (to be scaffolded) Vite + React + TS
├── .gitignore
├── README.md
├── CHANGELOG.md
├── AGENTS.md       # this file
└── session_log.md  # session logs
```

## Workflow Rules

- **File Length Limit:** Keep each code file under 300 LOC.
- **Directives:** WRITE CODE ONLY TO SPEC. MINIMUM, NOT MAXIMUM. ONE SIMPLE SOLUTION. CLARIFY, DON'T ASSUME.
- **Docs:** All 6 foundational docs live in `docs/`. Project plan in `Project_Plan/`.
- **Design Source:** `DESIGNS/` is the single source of truth for visual specs.

### How to Use Each Skill

- `frontend-design` / `ui-ux-pro-max` / `senior-frontend` — UI layouts, components, states, routes (see `docs/FRONTEND_SPEC.md`).
- `senior-backend` — TAD database/API work (static site: minimal, see `docs/TAD.md`).
- `code-reviewer` — Pre-merge review; checks `SECURITY.md` and `REPO_RULES.md` compliance.
- `gitnexus` — Graph queries, impact analysis, repo indexing (`gitnexus analyze`).
- `skill-creator` — PRD-level product work.

### Session Logging

After every change, append to `session_log.md`:

```
## Session YYYY-MM-DD HH:MM

### Changes
- [file_path] — brief description

### Skill(s) Used
- `skill-name`

### Status
- [completed/in-progress/blocked]
```

`session_log.md` is the full internal log. `CHANGELOG.md` is the curated human-readable subset (only completed changes).

## Repo Management Rules

See `docs/REPO_RULES.md` for the full rules. Summary:

- **Branches:** `main` (deployable, no direct commits), `dev` (integration), `feature/<name>`, `fix/<name>`, `hotfix/<name>`.
- **Commits:** Conventional Commits `<type>(<scope>): <description>` — types: feat, fix, refactor, docs, test, chore, style, perf.
- **Merges:** `feature/*` → `dev` (squash), `dev` → `main` only when batch complete + README/CHANGELOG updated + no regressions.
- **README:** Must stay current in same PR as any change affecting setup/env/scripts.
- **CHANGELOG:** Keep a Changelog format; update `[Unreleased]` on every merge to `dev`.
- **Versioning:** Semver tags on `main` (`v0.1.0`...).
- **Housekeeping:** No secrets committed; `.gitignore` covers env/build/deps/editor files; `main` must always build on fresh clone.

## Session Logs

See `session_log.md` in project root.

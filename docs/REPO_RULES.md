# Repo Management Document — Dev Portfolio Website

## Branch Strategy

```
main ──────────────────────────────────────────▶
  │
  └── dev ──────────────────────────────────────▶
       │     │     │     │     │     │
       ▼     ▼     ▼     ▼     ▼     ▼
     feat/  feat/  feat/  fix/  feat/  hotfix/
     hero   nav    blog   types flow   types
```

### Branch Types

| Branch | Purpose | Source | Merges Into |
|--------|---------|--------|-------------|
| `main` | Production-ready code | — | — |
| `dev` | Integration branch | `main` | `main` |
| `feature/<name>` | New functionality | `dev` | `dev` |
| `fix/<name>` | Bug fixes | `dev` | `dev` |
| `hotfix/<name>` | Urgent main patches | `main` | `main` + `dev` |

### Branch Naming
- Lowercase, hyphen-separated
- Self-explanatory: `feature/typewriter-effect`, `fix/mobile-drawer`
- No ticket-number-only names: `feat/001` ✗

---

## Commit Messages (Conventional Commits)

### Format
```
<type>(<scope>): <description>

[optional body]
```

### Types
| Type | When to Use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `refactor` | Code restructuring (no feature change) |
| `docs` | Documentation only |
| `test` | Adding/updating tests |
| `chore` | Build, config, tooling |
| `style` | Formatting, no logic change |
| `perf` | Performance improvement |

### Scopes
| Scope | Files |
|-------|-------|
| `hero` | Hero section, typewriter |
| `nav` | Navbar, drawer |
| `projects` | Project cards |
| `flow` | FlowLine component |
| `data` | Data files |
| `config` | Vite, Tailwind, TS config |

### Examples
```
feat(hero): add typewriter animation with phrase rotation
fix(nav): prevent body scroll when drawer is open
refactor(projects): extract ProjectCard component
docs(readme): add setup instructions
chore(config): update Tailwind to v3.4
```

### Rules
- One logical change per commit
- No `wip`, `stuff`, `fix2`, `asdf`
- Body explains *why*, not *what*

---

## Merge Rules

### Feature/Fix → Dev
1. Create PR from `feature/*` or `fix/*` into `dev`
2. Squash-merge to keep history clean
3. Delete branch after merge
4. Required: summary of what changed and why

### Dev → Main
1. All tickets in batch are complete
2. README.md is updated
3. CHANGELOG.md is updated
4. No known regressions
5. `npm run build` succeeds
6. PR reviewed and approved

### Hotfix → Main + Dev
1. Branch from `main`
2. Fix and test
3. PR into `main` (urgent review)
4. cherry-pick or merge into `dev`
5. Update CHANGELOG.md

---

## README.md Rules

### Must Always Include
- Project description
- Setup steps (`npm install`, `npm run dev`)
- Build commands
- Environment variables (if any)
- Deployment instructions

### Update Rule
README must be updated in the **same commit/PR** as any change that affects:
- Dependencies
- Scripts
- Configuration
- Environment variables

**A stale README = PR is not done.**

---

## CHANGELOG.md Format

### Structure
```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added
- Feature X

### Changed
- Updated Y

### Fixed
- Bug Z

## [0.1.0] - 2026-08-18

### Added
- Initial project setup
- Hero section with typewriter
- All 6 portfolio sections
```

### Rules
- Update on every merge to `dev` under `[Unreleased]`
- Move entries to version heading when tagged
- Use `Added / Changed / Fixed / Removed` categories

---

## Versioning

### Semver
- `v0.1.0` — initial release
- `v0.2.0` — new features
- `v0.2.1` — bug fixes
- `v1.0.0` — production ready

### Tagging
```bash
git tag -a v0.1.0 -m "Initial release: Hero, Projects, Contact sections"
git push origin v0.1.0
```

### Tag Message
Summarize the CHANGELOG entries it covers.

---

## Housekeeping

### .gitignore Must Include
```
node_modules/
dist/
.env
.env.local
.env.*.local
*.pem
*.key
.vscode/
.idea/
*.swp
*.swo
```

### Secrets Policy
- **Never commit** API keys, tokens, credentials
- If one slips in: **rotate immediately**, don't just delete from history
- Use `.env.local` for local secrets (gitignored)

### Main Branch Health
- `main` must always build on fresh clone
- Broken `main` = highest priority fix, above any feature work

---

## GitNexus Integration

### Workflow
1. `gitnexus analyze` — index the repo
2. `gitnexus setup` — configure MCP
3. Use graph queries for impact analysis before large refactors

### Enforcement
- `code-reviewer` skill checks commit message format
- `gitnexus` tracks file relationships for dependency validation

---

## Pre-Commit Checklist

- [ ] Commit message follows conventional format
- [ ] No secrets or credentials in staged files
- [ ] `npm run build` succeeds
- [ ] No console errors in dev mode
- [ ] README updated if needed
- [ ] CHANGELOG updated if merging to dev

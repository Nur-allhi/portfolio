# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

### Added
- Initial docs: PRD, TAD, SECURITY, FRONTEND_SPEC, TICKETS, REPO_RULES
- Project plan and design prompt in Project_Plan/
- Design references in DESIGNS/
- Portfolio scaffold: Vite 8 + React 19 + Tailwind 4, all 6 sections, Blog placeholder, routing — `npm run build` passes

### Changed
- README: update tech stack to React 19 / Vite 8 / Tailwind 4

### Added (Admin)
- Hidden admin panel at `/admin/*` (no public link) with localStorage auth (`admin@nureallhi.dev / admin123`)
- Admin CRUD: Projects, Education (Academics/Courses tabs), Blog (markdown + preview) — exact match to DESIGNS/admin/*

### Changed (Firebase)
- Migrate admin + public to Firebase Firestore (free, global) — `nureallhi1@gmail.com` Auth; collections `projects`/`academics`/`courses`/`blog`; public reads from Firestore with fallback; add `src/lib/firebase.ts` + `.env.example`
- Update README with Firebase setup and Vercel env instructions

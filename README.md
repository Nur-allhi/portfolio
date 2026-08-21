# Portfolio — Nur E Allhi

Junior Web Developer + Networking Student. Personal portfolio to showcase projects, skills, and academic background.

**Live:** _(deploy pending)_  
**Contact:** nureallhi1@gmail.com

## Tech Stack

- React 19 + TypeScript + Vite 8
- Tailwind CSS 4 + @tailwindcss/vite
- React Router 6 (SPA: `/` Portfolio, `/blog`, `/admin/*` hidden)
- Firebase Auth + Firestore (free, global persistence)

## Getting Started

```bash
npm install
cp .env.example .env.local  # fill VITE_FIREBASE_* from Firebase console
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Firebase Setup (free)

Project `portfolio-nur-3c9dc` — Auth user `nureallhi1@gmail.com`.

1. Firestore `portfolio-nur-3c9dc` → Collections `projects`, `academics`, `courses`, `blog` (auto-created on first admin save)
2. Rules: `allow read: if true; allow write: if request.auth != null;`
3. Env: `VITE_FIREBASE_*` in `.env.local` (see `.env.example`), also set in Vercel → Settings → Environment Variables

Admin: `/admin/login` → `nureallhi1@gmail.com` (no public link). All CRUD in Firestore, public site reads same collections with `onSnapshot`.

## Project Structure

```
src/
├── lib/firebase.ts
├── hooks/useAdminAuth.ts, useCollection.ts
├── pages/Portfolio.tsx, Blog.tsx, admin/Login, Dashboard, Projects, Education, BlogAdmin
├── components/layout/ Navbar, Footer + admin/AdminLayout, AdminGuard
├── components/sections/ Hero, Objectives, Projects, ProfessionalCourses, Academics, Contact
├── components/ui/ FlowLine, Typewriter, ScrollReveal, Badge, Chip, Button
└── data/ projects.ts, academics.ts, courses.ts (fallback)
```

See `docs/` for PRD, TAD, Frontend Spec, Tickets, and Repo Rules.
Design source: `DESIGNS/index.html` + `DESIGNS/blog.html` — exact reference.

## Deployment

Vercel or Netlify — auto-detects Vite. Build command `npm run build`, output `dist/`.

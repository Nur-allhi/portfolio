# Portfolio — Nur E Allhi

Junior Web Developer + Networking Student. Personal portfolio to showcase projects, skills, and academic background.

**Live:** _(deploy pending)_  
**Contact:** nureallhi1@gmail.com

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- React Router (SPA: `/` Portfolio, `/blog` placeholder)

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Project Structure

```
src/
├── pages/Portfolio.tsx, Blog.tsx
├── components/layout/  Navbar, Footer
├── components/sections/ Hero, Objectives, Projects, ProfessionalCourses, Academics, Contact
├── components/ui/  FlowLine, Typewriter, ScrollReveal, Badge, Chip, Button
└── data/  projects.ts, academics.ts, courses.ts
```

See `docs/` for PRD, TAD, Frontend Spec, Tickets, and Repo Rules.
Design source: `DESIGNS/index.html` + `DESIGNS/blog.html` — exact reference.

## Deployment

Vercel or Netlify — auto-detects Vite. Build command `npm run build`, output `dist/`.

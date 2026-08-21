# Feature Ticket List — Dev Portfolio Website

## Ticket Format
```
### TICKET-XXX: [Title]
- **Skill:** [primary skill]
- **Priority:** [P0-P3]
- **Files:** [affected files]
- **Estimate:** [hours]
- **Acceptance:** [definition of done]
```

---

## Phase 1: Project Setup

### TICKET-001: Scaffold Vite Project
- **Skill:** `senior-frontend`
- **Priority:** P0
- **Files:** `package.json`, `vite.config.ts`, `tsconfig.json`
- **Estimate:** 0.5h
- **Acceptance:** `npm run dev` starts without errors

### TICKET-002: Install & Configure Tailwind
- **Skill:** `senior-frontend`
- **Priority:** P0
- **Files:** `tailwind.config.ts`, `postcss.config.js`, `src/index.css`
- **Estimate:** 1h
- **Acceptance:** Tailwind classes work, CSS variables defined, fonts loaded

### TICKET-003: Install React Router
- **Skill:** `senior-frontend`
- **Priority:** P0
- **Files:** `package.json`, `src/App.tsx`
- **Estimate:** 0.5h
- **Acceptance:** `/` and `/blog` routes render different pages

### TICKET-004: Set Up Global CSS Variables
- **Skill:** `frontend-design`
- **Priority:** P0
- **Files:** `src/index.css`
- **Estimate:** 1h
- **Acceptance:** All design tokens from DESIGNS/ defined as CSS variables

---

## Phase 2: Data Files

### TICKET-005: Create Projects Data
- **Skill:** `skill-creator`
- **Priority:** P1
- **Files:** `src/data/projects.ts`
- **Estimate:** 0.5h
- **Acceptance:** 3 projects with correct titles, descriptions, stacks, URLs

### TICKET-006: Create Academics Data
- **Skill:** `skill-creator`
- **Priority:** P1
- **Files:** `src/data/academics.ts`
- **Estimate:** 0.5h
- **Acceptance:** 3 entries (School, BBA, MBA) with placeholder data

### TICKET-007: Create Courses Data
- **Skill:** `skill-creator`
- **Priority:** P1
- **Files:** `src/data/courses.ts`
- **Estimate:** 0.5h
- **Acceptance:** 2 courses with correct provider, year, status

---

## Phase 3: UI Primitives

### TICKET-008: Build Button Component
- **Skill:** `ui-ux-pro-max`
- **Priority:** P1
- **Files:** `src/components/ui/Button.tsx`
- **Estimate:** 0.5h
- **Acceptance:** Primary and ghost variants, hover effects, responsive

### TICKET-009: Build Badge Component
- **Skill:** `ui-ux-pro-max`
- **Priority:** P1
- **Files:** `src/components/ui/Badge.tsx`
- **Estimate:** 0.5h
- **Acceptance:** Done (green) and live (teal ping) variants

### TICKET-010: Build Chip Component
- **Skill:** `ui-ux-pro-max`
- **Priority:** P1
- **Files:** `src/components/ui/Chip.tsx`
- **Estimate:** 0.25h
- **Acceptance:** Amber styling, correct font size and padding

### TICKET-011: Build ScrollReveal Component
- **Skill:** `senior-frontend`
- **Priority:** P1
- **Files:** `src/components/ui/ScrollReveal.tsx`
- **Estimate:** 1h
- **Acceptance:** IntersectionObserver triggers `.in` class, respects reduced motion

### TICKET-012: Build Typewriter Component
- **Skill:** `senior-frontend`
- **Priority:** P1
- **Files:** `src/components/ui/Typewriter.tsx`
- **Estimate:** 1.5h
- **Acceptance:** Types/deletes/pauses correctly, respects reduced motion

---

## Phase 4: Layout Components

### TICKET-013: Build Navbar Component
- **Skill:** `ui-ux-pro-max` + `senior-frontend`
- **Priority:** P0
- **Files:** `src/components/layout/Navbar.tsx`
- **Estimate:** 2h
- **Acceptance:** Fixed nav, scroll state, mobile drawer, overlay, keyboard nav

### TICKET-014: Build Footer Component
- **Skill:** `ui-ux-pro-max`
- **Priority:** P2
- **Files:** `src/components/layout/Footer.tsx`
- **Estimate:** 0.5h
- **Acceptance:** Copyright text, back-to-top link, border-top styling

### TICKET-015: Build FlowLine Component
- **Skill:** `senior-frontend` + `frontend-design`
- **Priority:** P1
- **Files:** `src/components/ui/FlowLine.tsx`
- **Estimate:** 2h
- **Acceptance:** Animated rail, positioned nodes, active state, reduced opacity on mobile

---

## Phase 5: Section Components

### TICKET-016: Build Hero Section
- **Skill:** `ui-ux-pro-max` + `senior-frontend`
- **Priority:** P0
- **Files:** `src/components/sections/Hero.tsx`
- **Estimate:** 2.5h
- **Acceptance:** Status dot, name, typewriter, lead, CTAs, socials, scroll cue

### TICKET-017: Build Objectives Section
- **Skill:** `ui-ux-pro-max`
- **Priority:** P1
- **Files:** `src/components/sections/Objectives.tsx`
- **Estimate:** 1.5h
- **Acceptance:** Goal grid, featured card, flow strip, responsive stacking

### TICKET-018: Build Projects Section
- **Skill:** `ui-ux-pro-max`
- **Priority:** P0
- **Files:** `src/components/sections/Projects.tsx`
- **Estimate:** 1.5h
- **Acceptance:** 3 cards with number, chips, links, hover effects

### TICKET-019: Build Professional Courses Section
- **Skill:** `ui-ux-pro-max`
- **Priority:** P1
- **Files:** `src/components/sections/ProfessionalCourses.tsx`
- **Estimate:** 1h
- **Acceptance:** 2 cards with badges, responsive stacking

### TICKET-020: Build Academics Section
- **Skill:** `ui-ux-pro-max`
- **Priority:** P1
- **Files:** `src/components/sections/Academics.tsx`
- **Estimate:** 1.5h
- **Acceptance:** Timeline with teal line, dot markers, entries

### TICKET-021: Build Contact Section
- **Skill:** `ui-ux-pro-max`
- **Priority:** P1
- **Files:** `src/components/sections/Contact.tsx`
- **Estimate:** 1h
- **Acceptance:** Centered email, CTA, socials, location note

---

## Phase 6: Pages & Routing

### TICKET-022: Build Portfolio Page
- **Skill:** `senior-frontend`
- **Priority:** P0
- **Files:** `src/pages/Portfolio.tsx`
- **Estimate:** 1h
- **Acceptance:** All 6 sections composed in correct order

### TICKET-023: Build Blog Placeholder Page
- **Skill:** `ui-ux-pro-max`
- **Priority:** P2
- **Files:** `src/pages/Blog.tsx`
- **Estimate:** 1.5h
- **Acceptance:** Terminal widget, coming soon, back to portfolio CTA

### TICKET-024: Configure React Router
- **Skill:** `senior-frontend`
- **Priority:** P0
- **Files:** `src/App.tsx`, `src/main.tsx`
- **Estimate:** 0.5h
- **Acceptance:** Routes work, nav links update active state

---

## Phase 7: Polish

### TICKET-025: Responsive Testing & Fixes
- **Skill:** `code-reviewer`
- **Priority:** P0
- **Files:** Multiple
- **Estimate:** 2h
- **Acceptance:** All breakpoints work (820px, 900px)

### TICKET-026: Reduced Motion Support
- **Skill:** `code-reviewer`
- **Priority:** P1
- **Files:** `src/index.css`, animation components
- **Estimate:** 1h
- **Acceptance:** All animations disabled when `prefers-reduced-motion: reduce`

### TICKET-027: Accessibility Audit
- **Skill:** `code-reviewer`
- **Priority:** P1
- **Files:** All components
- **Estimate:** 1.5h
- **Acceptance:** Semantic HTML, aria labels, focus visible, keyboard nav

### TICKET-028: Performance Optimization
- **Skill:** `senior-frontend`
- **Priority:** P2
- **Files:** `vite.config.ts`, components
- **Estimate:** 1h
- **Acceptance:** Bundle < 150KB gzipped, no unused imports

### TICKET-029: Final Build Test
- **Skill:** `code-reviewer`
- **Priority:** P0
- **Files:** None
- **Estimate:** 0.5h
- **Acceptance:** `npm run build` succeeds with 0 errors

### TICKET-030: README Update
- **Skill:** `gitnexus`
- **Priority:** P1
- **Files:** `README.md`
- **Estimate:** 0.5h
- **Acceptance:** Setup steps, env vars, run commands documented

---

## Phase 8: Admin Panel (Hidden, URL-only) — from `DESIGNS/admin/`

### TICKET-031: Admin Auth Hook + Guard
- **Skill:** `senior-frontend` + `senior-backend`
- **Priority:** P0
- **Files:** `src/hooks/useAdminAuth.ts`, `src/components/admin/AdminGuard.tsx`
- **Estimate:** 1h
- **Acceptance:** `admin@nureallhi.dev / admin123`, `localStorage.admin_auth`, guard redirects to `/admin/login`

### TICKET-032: Admin Layout
- **Skill:** `ui-ux-pro-max` + `senior-frontend`
- **Priority:** P0
- **Files:** `src/components/admin/AdminLayout.tsx`, `src/components/admin/AdminLayout.css` (from `admin.css`)
- **Estimate:** 2h
- **Acceptance:** Sidebar 240px, topbar sticky 64px, drawer <820px + overlay + focus trap

### TICKET-033: Admin Login Page
- **Skill:** `ui-ux-pro-max`
- **Priority:** P0
- **Files:** `src/pages/admin/Login.tsx`
- **Estimate:** 1h
- **Acceptance:** Centered 400px card, lock icon, email/pass validation, error states, redirect

### TICKET-034: Admin Dashboard
- **Skill:** `ui-ux-pro-max`
- **Priority:** P1
- **Files:** `src/pages/admin/Dashboard.tsx`
- **Estimate:** 1h
- **Acceptance:** Stat grid 4 → 2 → 1 cols, activity list, quick actions

### TICKET-035: Admin Projects CRUD
- **Skill:** `senior-frontend` + `ui-ux-pro-max`
- **Priority:** P0
- **Files:** `src/pages/admin/Projects.tsx`
- **Estimate:** 2.5h
- **Acceptance:** Table + modal (Title*, Number, Desc*, tag-wrap Stack, Repo/Live, Status), `admin_projects` localStorage, toasts

### TICKET-036: Admin Education CRUD
- **Skill:** `senior-frontend` + `ui-ux-pro-max`
- **Priority:** P0
- **Files:** `src/pages/admin/Education.tsx`
- **Estimate:** 2.5h
- **Acceptance:** Tabs Academics/Courses, tables + modal toggle, `admin_academics`/`admin_courses`

### TICKET-037: Admin Blog CRUD
- **Skill:** `senior-frontend` + `ui-ux-pro-max`
- **Priority:** P0
- **Files:** `src/pages/admin/Blog.tsx`
- **Estimate:** 2.5h
- **Acceptance:** Empty terminal state, table, modal (Title→slug, Markdown + Preview, Status, Cover), `admin_blog`

### TICKET-038: Admin Routing + Build Verify
- **Skill:** `senior-frontend`
- **Priority:** P0
- **Files:** `src/App.tsx`
- **Estimate:** 1h
- **Acceptance:** `/admin/*` guarded, no public link, `npm run build` passes, manual login→CRUD→logout tested

---

## Ticket Summary

| Phase | Tickets | Total Estimate |
|-------|---------|----------------|
| Phase 1: Setup | 4 | 3h |
| Phase 2: Data | 3 | 1.5h |
| Phase 3: UI Primitives | 5 | 3.75h |
| Phase 4: Layout | 3 | 4.5h |
| Phase 5: Sections | 6 | 9h |
| Phase 6: Pages | 3 | 3h |
| Phase 7: Polish | 6 | 6.5h |
| Phase 8: Admin | 8 | 13.5h |
| **Total** | **38** | **~44.5h** |

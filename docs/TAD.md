# Technical Architecture Document — Dev Portfolio Website

## System Overview
Static SPA deployed to Vercel/Netlify. No backend. Public site is read-only; admin panel (hidden URL) uses localStorage for CRUD.

```
┌─────────────────────────────────────────────┐
│                  CDN/Edge                    │
│            (Vercel/Netlify)                  │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│              Static Assets                   │
│         (HTML, CSS, JS, Fonts)               │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│           React SPA (Client-Side)            │
│  ┌─────────────┐ ┌─────────────┐            │
│  │  Public     │ │  Admin      │            │
│  │  / , /blog  │ │  /admin/*   │            │
│  │  Hero etc.  │ │  Login/Dash │            │
│  └──────┬──────┘ └──────┬──────┘            │
│         │               │                   │
│         └── localStorage (admin_*) ──┘     │
└─────────────────────────────────────────────┘
```

## Project Structure

```
portfolio/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── DESIGNS/admin/                  # exact admin reference
├── src/
│   ├── main.tsx
│   ├── App.tsx                     # Router + admin guard
│   ├── index.css
│   ├── pages/
│   │   ├── Portfolio.tsx
│   │   ├── Blog.tsx
│   │   └── admin/
│   │       ├── Login.tsx
│   │       ├── Dashboard.tsx
│   │       ├── Projects.tsx
│   │       ├── Education.tsx
│   │       └── Blog.tsx
│   ├── components/
│   │   ├── layout/Navbar.tsx, Footer.tsx
│   │   ├── admin/AdminLayout.tsx, AdminGuard.tsx
│   │   ├── sections/ (Hero, Objectives, Projects, ...)
│   │   └── ui/ (FlowLine, ScrollReveal, Typewriter, Badge, Chip, Button)
│   ├── hooks/useAdminAuth.ts
│   └── data/
│       ├── projects.ts
│       ├── academics.ts
│       ├── courses.ts
│       └── blog.ts
└── README.md
```

## Data Models

### Project
```typescript
interface Project {
  id: string;
  number: string;        // "/01", "/02", "/03"
  title: string;
  description: string;
  stack: string[];
  repoUrl: string;
  liveUrl?: string;
  status?: 'completed' | 'in-development';
}
```

### AcademicEntry
```typescript
interface AcademicEntry {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  status: 'completed' | 'in-progress';
  institution: string;
}
```

### Course
```typescript
interface Course {
  id: string;
  title: string;
  provider: string;
  year: string;
  status: 'completed' | 'in-progress';
  description: string;
}
```

### BlogPost (admin)
```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // markdown
  status: 'draft' | 'published';
  cover?: string;
  date: string;
}
```

## Routing

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Portfolio.tsx` | Main portfolio page |
| `/blog` | `Blog.tsx` | Blog placeholder |
| `/admin/login` | `admin/Login.tsx` | Login (public) |
| `/admin` | `admin/Dashboard.tsx` | Dashboard (guarded) |
| `/admin/projects` | `admin/Projects.tsx` | Projects CRUD (guarded) |
| `/admin/education` | `admin/Education.tsx` | Education CRUD tabs (guarded) |
| `/admin/blog` | `admin/Blog.tsx` | Blog CRUD (guarded) |

> Admin is URL-only, no public link. Guard checks `localStorage.admin_auth === '1'`.

### Admin Storage (localStorage)

| Key | Model |
|-----|-------|
| `admin_auth` | `"1"` if logged in |
| `admin_projects` | `Project[]` |
| `admin_academics` | `AcademicEntry[]` |
| `admin_courses` | `Course[]` |
| `admin_blog` | `BlogPost[]` |

Credentials (MVP): `admin@nureallhi.dev` / `admin123` (`DESIGNS/admin/admin-auth.js:4`).

## State Management
- Public: static data + component-local state (navbar, typewriter, scroll reveal)
- Admin: localStorage as source of truth, React state mirrors it, toasts for feedback

## Build & Deploy

### Development
```bash
npm install
npm run dev          # localhost:5173
```

### Production
```bash
npm run build        # dist/
npm run preview      # preview localhost:4173
```

### Deployment
- **Vercel:** Auto-detects Vite, zero-config deploy
- **Netlify:** Set build command `npm run build`, publish directory `dist`

## Performance Budget
| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.0s |
| Largest Contentful Paint | < 2.5s |
| Total Bundle Size | < 150KB gzipped |
| Time to Interactive | < 2.0s |

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.x | UI framework |
| react-dom | ^19.x | DOM rendering |
| react-router-dom | ^6.x | Client-side routing |
| tailwindcss | ^4.x | Utility CSS |
| @tailwindcss/vite | ^4.x | Tailwind Vite plugin |
| vite | ^8.x | Build tool |
| typescript | ^6.x | Type safety |

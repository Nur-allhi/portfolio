# Technical Architecture Document — Dev Portfolio Website

## System Overview
Static single-page application (SPA) deployed to Vercel/Netlify. No backend, no database, no server-side rendering.

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
│  ┌─────────┐  ┌─────────┐  ┌─────────┐     │
│  │  Hero   │  │Projects │  │ Contact │     │
│  └─────────┘  └─────────┘  └─────────┘     │
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
├── src/
│   ├── main.tsx                    # Entry point
│   ├── App.tsx                     # Router setup
│   ├── index.css                   # Global styles + CSS vars
│   ├── pages/
│   │   ├── Portfolio.tsx           # Main page
│   │   └── Blog.tsx                # Blog placeholder
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Fixed nav + drawer
│   │   │   └── Footer.tsx          # Site footer
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Objectives.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── ProfessionalCourses.tsx
│   │   │   ├── Academics.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── FlowLine.tsx        # Animated trace line
│   │       ├── ScrollReveal.tsx    # Intersection Observer
│   │       ├── Typewriter.tsx      # Typewriter effect
│   │       ├── Badge.tsx           # Status badges
│   │       ├── Chip.tsx            # Tech stack chips
│   │       └── Button.tsx          # CTA buttons
│   └── data/
│       ├── projects.ts             # Project metadata
│       ├── academics.ts            # Education entries
│       └── courses.ts              # Course entries
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

## Routing

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Portfolio.tsx` | Main portfolio page |
| `/blog` | `Blog.tsx` | Blog placeholder |

## State Management
- **No global state needed** — all data is static
- Component-local state for:
  - Navbar scroll state (`isScrolled`)
  - Mobile drawer open/close
  - Typewriter animation phase
  - Scroll reveal intersection status

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
| react | ^18.x | UI framework |
| react-dom | ^18.x | DOM rendering |
| react-router-dom | ^6.x | Client-side routing |
| tailwindcss | ^3.x | Utility CSS |
| postcss | ^8.x | CSS processing |
| autoprefixer | ^10.x | Vendor prefixes |
| vite | ^5.x | Build tool |
| typescript | ^5.x | Type safety |

# Dev Portfolio Website — Complete Build Plan

## Project Overview

| Item | Detail |
|------|--------|
| **Owner** | Nur E Allhi |
| **Goal** | Land a job/internship — junior web dev + networking student |
| **Tech Stack** | React + TypeScript + Vite + Tailwind CSS |
| **Language** | English |
| **Design Source** | `DESIGNS/index.html` + `DESIGNS/blog.html` |
| **Contact Email** | nureallhi1@gmail.com |

---

## Pre-Build Setup (User Task)

> User mentioned "before that we will setup some other things" — clarify what needs to be set up before building.

---

## Design Reference (Exact Specs from DESIGNS/)

### Color Tokens
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#0B1120` | Main background |
| `--surface` | `#121A2B` | Cards, panels |
| `--surface-2` | `#172138` | Terminal bar, secondary surface |
| `--border` | `#1E2A42` | Borders |
| `--border-soft` | `rgba(226,232,244,.08)` | Soft borders |
| `--fg` | `#E4E9F2` | Primary text |
| `--muted` | `#8B96AC` | Secondary text |
| `--accent` | `#4FD1C5` | Teal — links, highlights, flow line |
| `--accent-bright` | `#7BE8DD` | Teal hover state |
| `--accent-soft` | `rgba(79,209,197,.10)` | Teal background |
| `--amber` | `#E8A33D` | Tech chips, secondary accent |
| `--amber-soft` | `rgba(232,163,61,.12)` | Amber background |
| `--success` | `#34D399` | Completed badges |
| `--success-soft` | `rgba(52,211,153,.12)` | Success background |

### Typography
| Element | Font | Details |
|---------|------|---------|
| Headings | Space Grotesk | 600-700, -0.02em tracking |
| Body | Inter | 400-500, 16px/1.65 |
| Code/Tags/Nav | JetBrains Mono | 400-500, 11-15px |

### Layout Tokens
| Token | Value |
|-------|-------|
| `--nav-h` | `64px` |
| `--wrap` | `1080px` |
| `--rad` | `14px` |
| `--ease` | `cubic-bezier(.22,.61,.36,1)` |

### Global Styles
- Blueprint grid background: `rgba(226,232,244,.025)` lines, `56px 56px` grid
- Selection: `rgba(79,209,197,.28)` bg
- Focus: `2px solid var(--accent)`, `outline-offset: 3px`
- Scroll padding top: `calc(var(--nav-h) + 12px)`

---

## Component Specs (Exact from DESIGNS/)

### Navbar (`Navbar.tsx`)
- Fixed top, z-index 50
- Transparent by default → `rgba(11,17,32,.74)` + blur on scroll (`.scrolled` class)
- Brand: `~/nur-e-allhi` (mono font, tilde in accent color)
- Desktop links: Portfolio | Blog | Contact (uppercase mono, 13px, underline animation on hover)
- Mobile (< 820px): burger button → slide-in drawer from right + overlay
- Drawer: `min(320px, 84vw)` width, surface background

### Hero (`Hero.tsx`)
- Full viewport height, centered
- Radial glow: `rgba(79,209,197,.09)` behind content
- Status kicker: green dot (ping animation) + "status: available for junior roles"
- Name: `Nur E Allhi` (96px max, "Allhi" in accent color)
- Typewriter: prompt `>` + typing text + blinking caret
  - Phrases: "Junior Web Developer", "Networking Student", "Building Solutions That Flow"
  - Type speed: 68ms, delete speed: 36ms, pause: 1500ms
- Lead text: 2 lines about building interfaces + studying networks
- CTA: "View My Work →" (primary) + "Get in touch" (ghost)
- Socials: GitHub + LinkedIn icons (44px squares, border, hover accent)
- Scroll cue at bottom: "scroll" text + animated line

### Objectives (`Objectives.tsx`)
- Section kicker: `01 · objectives`
- Title: "Where I'm heading"
- Lead: "Two tracks, one direction..."
- Goal grid: `1.15fr 1fr` (stacks on mobile < 900px)
  - Primary card (featured): network SVG icon + "Networking & Systems Administration" + chips (TCP/IP, Routing, Switching, DNS/DHCP, Security)
  - Secondary card: "Web Development" + chips (HTML/CSS, JavaScript, React, Responsive UI)
- Flow strip: dashed border, quote "Every request you make rides a network..."

### Projects (`Projects.tsx`)
- Section kicker: `02 · projects`
- Title: "Things I've shipped"
- Project grid: `auto-fit, minmax(280px, 1fr)`
- Each card:
  - Number (`/01`, `/02`, `/03`)
  - Optional status badge (e.g., "in development")
  - Title, description
  - Tech chips (amber)
  - Links: repo + live (arrow icon, hover underline)
- Projects:
  1. MoneyFlows — React, TypeScript, Tailwind
  2. YardFlow — React, Node.js, SQLite (in development)
  3. EN IPTV Player — Tizen, JavaScript, HLS

### Professional Courses (`ProfessionalCourses.tsx`)
- Section kicker: `03 · professional courses`
- Title: "Training & certification"
- Grid: 2 columns (stacks on mobile < 900px)
- Each card:
  - Status badge (completed/in progress) + year
  - Title, organization, description
- Courses:
  1. Web Development — Programming Hero — 2021 — Completed
  2. PGD in Network Solutions & System Administration — IsDB Scholarship — Present — In progress

### Academics (`Academics.tsx`)
- Section kicker: `04 · academics`
- Title: "Education path"
- Timeline layout: vertical teal line on left, dot markers
- Each entry: title, subtitle, year, status badge, institution
- Entries:
  1. Higher Secondary School — HSSC — 20— — Completed
  2. BBA — Bachelor of Business Administration — 20—–20— — Completed
  3. MBA — Master of Business Administration — 20—–20— — In progress

### Contact (`Contact.tsx`)
- Centered layout
- Section kicker: `05 · contact`
- Title: "Let's build something that flows"
- Lead: "Have a project, a role, or just want to talk shop about routers and React?"
- Email link: `nureallhi1@gmail.com` (dashed underline, accent color)
- CTA: "Send an email →" (primary button)
- Socials: GitHub + LinkedIn icons
- Note: "Based in bangladesh · open to remote roles"

### Footer (`Footer.tsx`)
- Border top, flex between
- Left: `© 2026 Nur E Allhi — built with HTML, CSS & JavaScript`
- Right: "back to top ↑" link

### Flow Trace Line (`FlowLine.tsx`)
- Absolute positioned, centered vertically
- Animated rail: gradient line, 5s sweep animation
- Pulse nodes: 9px circles at each section, glow effect
- Active node: scale 1.4 + brighter glow
- Reduced opacity on mobile (< 820px)

### Blog Page (`Blog.tsx`)
- Same navbar (Blog link active)
- Centered content
- Kicker: `~/blog`
- Title: "Coming soon"
- Lead: "Writing on networking, web development..."
- Terminal widget:
  - Title bar with dots (red, amber, green) + "blog — draft"
  - Body: `git status` command → output → blinking caret
- CTA: "Back to portfolio ←" button
- Same footer

### Scroll Reveal
- `.reveal` class: `opacity: 0; transform: translateY(26px)`
- `.reveal.in` class: `opacity: 1; transform: none`
- Transition: 0.7s ease
- Intersection Observer, threshold 0.12
- Staggered delays: 0s, 0.06s, 0.12s, 0.18s, 0.24s, 0.3s

---

## File Structure

```
portfolio/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css              # CSS variables + Tailwind + global styles
│   ├── pages/
│   │   ├── Portfolio.tsx      # Main page — all 6 sections
│   │   └── Blog.tsx           # Blog placeholder with terminal widget
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx     # Fixed nav + mobile drawer
│   │   │   └── Footer.tsx     # Copyright + back to top
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Objectives.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── ProfessionalCourses.tsx
│   │   │   ├── Academics.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── FlowLine.tsx   # Animated trace line + nodes
│   │       ├── ScrollReveal.tsx # Intersection Observer wrapper
│   │       ├── Typewriter.tsx  # Typewriter effect
│   │       ├── Badge.tsx       # Status badge (done/live)
│   │       ├── Chip.tsx        # Tech stack chip
│   │       └── Button.tsx      # Primary/ghost button
│   └── data/
│       ├── projects.ts
│       ├── academics.ts
│       └── courses.ts
└── README.md
```

---

## Implementation Steps

### Phase 1: Project Setup
| Step | Task |
|------|------|
| 1 | Scaffold Vite + React + TypeScript project |
| 2 | Install Tailwind CSS, PostCSS, Autoprefixer |
| 3 | Install react-router-dom |
| 4 | Configure Tailwind with exact design tokens |
| 5 | Set up `index.css` with CSS variables, fonts, global styles |

### Phase 2: Data Files
| Step | Task | File |
|------|------|------|
| 6 | Create projects data | `src/data/projects.ts` |
| 7 | Create academics data | `src/data/academics.ts` |
| 8 | Create courses data | `src/data/courses.ts` |

### Phase 3: UI Primitives
| Step | Component | Details |
|------|-----------|---------|
| 9 | `Button.tsx` | Primary + ghost variants |
| 10 | `Badge.tsx` | Done (green) + live (teal ping) variants |
| 11 | `Chip.tsx` | Amber tech stack chip |
| 12 | `ScrollReveal.tsx` | Intersection Observer wrapper with `.reveal` class |
| 13 | `Typewriter.tsx` | Character-by-character typing with phrases array |

### Phase 4: Layout Components
| Step | Component | Details |
|------|-----------|---------|
| 14 | `Navbar.tsx` | Fixed nav, scroll state, mobile drawer, overlay |
| 15 | `Footer.tsx` | Copyright + back to top |
| 16 | `FlowLine.tsx` | Animated rail + positioned pulse nodes |

### Phase 5: Section Components
| Step | Component | Details |
|------|-----------|---------|
| 17 | `Hero.tsx` | Status dot, name, typewriter, lead, CTAs, socials, scroll cue |
| 18 | `Objectives.tsx` | Goal grid, featured card, flow strip quote |
| 19 | `Projects.tsx` | Project cards with number, chips, links |
| 20 | `ProfessionalCourses.tsx` | 2 course cards with badges |
| 21 | `Academics.tsx` | Timeline with teal line + dots |
| 22 | `Contact.tsx` | Centered email, CTA, socials, note |

### Phase 6: Pages & Routing
| Step | Task |
|------|------|
| 23 | Create `Portfolio.tsx` — compose all sections |
| 24 | Create `Blog.tsx` — terminal widget + coming soon |
| 25 | Set up React Router in `App.tsx` |

### Phase 7: Polish
| Step | Task |
|------|------|
| 26 | Responsive testing (820px, 900px breakpoints) |
| 27 | Reduced motion support (`prefers-reduced-motion`) |
| 28 | Hover effects + transitions |
| 29 | Test `npm run dev` |
| 30 | Test `npm run build` |

---

## Dependencies

| Package | Type | Purpose |
|---------|------|---------|
| `react-router-dom` | prod | SPA routing |
| `tailwindcss` | dev | Utility CSS |
| `postcss` | dev | CSS processing |
| `autoprefixer` | dev | Vendor prefixes |

> No animation libraries needed — typewriter and scroll reveal use vanilla JS/CSS.

---

## Placeholder Items

| Item | Location |
|------|----------|
| School name + year | `src/data/academics.ts` |
| BBA institution + year | `src/data/academics.ts` |
| MBA institution + year | `src/data/academics.ts` |
| GitHub URL | `src/components/sections/Hero.tsx`, `Contact.tsx` |
| LinkedIn URL | `src/components/sections/Hero.tsx`, `Contact.tsx` |

---

## Success Criteria
- [ ] Exact visual match to DESIGNS/index.html
- [ ] Exact visual match to DESIGNS/blog.html
- [ ] `npm run dev` starts without errors
- [ ] `npm run build` produces clean output
- [ ] All 6 portfolio sections render
- [ ] Blog placeholder page renders
- [ ] Typewriter effect works
- [ ] Flow trace line animates
- [ ] Scroll reveal works
- [ ] Mobile drawer works
- [ ] Responsive at 820px and 900px breakpoints
- [ ] `prefers-reduced-motion` respected

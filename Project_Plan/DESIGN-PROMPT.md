# Design Prompt — Dev Portfolio Website

Use this prompt in opencode to generate UI designs for the portfolio.

---

## Prompt

```
Design a dark, professional developer portfolio website for "Nur E Allhi" — a junior web developer and networking student.

DESIGN SYSTEM:
- Background: ink navy #0B1120
- Panel/card bg: #121A2B
- Border: #1E2A42
- Accent: signal teal #4FD1C5 (primary highlights, links, animated trace line)
- Secondary accent: ledger amber #E8A33D (optional, for tags/badges)
- Text primary: #E4E9F2
- Text secondary: #8B96AC
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (code/tech tags)

LAYOUT:
- Single-page app with fixed top navbar (blur backdrop)
- Sections flow vertically: Hero → Objectives → Projects → Academics → Professional Courses → Contact
- Animated teal trace line runs between sections with pulse nodes at each transition
- Responsive: mobile-first, hamburger menu on small screens

PAGES:
1. Portfolio (main page at /) — all 6 sections
2. Blog placeholder (at /blog) — "Coming Soon" page, same dark theme

SECTION DESIGNS:

1. HERO SECTION:
- Large name "Nur E Allhi" with typewriter animated tagline below
- Rotating taglines: "Junior Web Developer" | "Networking Student" | "Building Solutions That Flow"
- Social icons (GitHub, LinkedIn) below tagline
- CTA button "View My Work" with teal accent
- Full viewport height, centered content

2. OBJECTIVES SECTION:
- Card or grid layout showing career goals
- Primary goal: Networking / Systems Administration
- Secondary: Web Development as supporting skill
- Icon or visual representing network infrastructure
- Clean, minimal text with subtle animation on scroll

3. PROJECTS SECTION:
- 3 project cards in a responsive grid (1 col mobile, 3 col desktop)
- Each card: project name, short description, tech stack badges (JetBrains Mono font), repo link, live link
- Projects in order: MoneyFlows → YardFlow → EN IPTV Player
- Cards have hover lift effect with shadow
- Tech badges use amber accent

4. ACADEMICS SECTION:
- Timeline or card layout for academic history
- Entries: School → BBA → MBA (with placeholder data)
- Each entry: institution name, degree, year, status badge
- Vertical timeline with teal line on left side

5. PROFESSIONAL COURSES SECTION:
- 2 course cards side by side
- Course 1: Web Development — Programming Hero — 2021 — Completed
- Course 2: PGD in Network Solutions & System Administration — IsDB Scholarship — In Progress
- Status badge: green for completed, teal pulse for in-progress

6. CONTACT SECTION:
- Centered layout with contact options
- Email: nureallhi1@gmail.com (clickable mailto link)
- LinkedIn and GitHub icons with links
- Clean, simple footer-style section

NAVBAR:
- Fixed top, transparent → dark on scroll (blur backdrop)
- Left: logo/name "Nur E Allhi"
- Right: Portfolio | Blog | Contact
- Mobile: hamburger icon, slide-in drawer from right

ANIMATIONS:
- Scroll reveal: sections fade-in + slide-up using Intersection Observer
- Hover: project cards lift with box-shadow, buttons scale slightly
- Typewriter: hero text types character by character, pauses, deletes, types next tagline
- Flow trace line: continuous pulse animation, teal glow effect

STYLE KEYWORDS:
- Dark tech aesthetic, clean and minimal, professional but modern
- Developer portfolio, networking theme, "flow" concept
- No flashy effects, subtle and polished
- Lots of whitespace, easy to scan
```

---

## How to Use

1. Copy the prompt above (inside the code block)
2. Paste into opencode design generation
3. Generate designs for each section individually or as a full page
4. Share the outputs with me and I'll implement them in code

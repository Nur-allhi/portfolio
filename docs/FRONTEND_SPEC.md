# Frontend Spec Document — Dev Portfolio Website

## Design System

### Color Tokens
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#0B1120` | Main background |
| `--surface` | `#121A2B` | Cards, panels |
| `--surface-2` | `#172138` | Terminal bar |
| `--border` | `#1E2A42` | Borders |
| `--border-soft` | `rgba(226,232,244,.08)` | Soft borders |
| `--fg` | `#E4E9F2` | Primary text |
| `--muted` | `#8B96AC` | Secondary text |
| `--accent` | `#4FD1C5` | Teal highlights |
| `--accent-bright` | `#7BE8DD` | Teal hover |
| `--accent-soft` | `rgba(79,209,197,.10)` | Teal bg |
| `--amber` | `#E8A33D` | Tech chips |
| `--amber-soft` | `rgba(232,163,61,.12)` | Amber bg |
| `--success` | `#34D399` | Completed |
| `--success-soft` | `rgba(52,211,153,.12)` | Success bg |

### Typography
| Element | Font | Weight | Size |
|---------|------|--------|------|
| Display | Space Grotesk | 700 | clamp(44px, 9.5vw, 96px) |
| H2 | Space Grotesk | 600 | clamp(30px, 4.6vw, 44px) |
| H3 | Space Grotesk | 600 | 20-22px |
| Body | Inter | 400 | 16px/1.65 |
| Mono | JetBrains Mono | 400-500 | 11-15px |

### Spacing
| Token | Value |
|-------|-------|
| Section padding | clamp(84px, 11vw, 150px) 0 |
| Wrap max-width | 1080px |
| Wrap padding | clamp(20px, 5vw, 40px) |
| Card padding | 26-28px |
| Border radius | 14px |

---

## Component Architecture

### Layout Components

#### Navbar.tsx
```
Props: none
State: isScrolled (boolean), isDrawerOpen (boolean)
Effects: scroll listener, resize listener
Children: Brand, NavLinks, Burger, Drawer, Overlay
```

**States:**
| State | Condition | Visual |
|-------|-----------|--------|
| Default | scrollY < 20 | Transparent bg |
| Scrolled | scrollY >= 20 | `rgba(11,17,32,.74)` + blur |
| Mobile | width < 820px | Burger visible, links hidden |

**Mobile Drawer:**
- Trigger: burger click
- Animation: `translateX(102%)` → `translateX(0)`
- Overlay: fades in behind
- Close: click overlay, press Escape, click link, resize > 820px

#### Footer.tsx
```
Props: none
State: none
Children: copyright text, back-to-top link
```

---

### Section Components

#### Hero.tsx
```
Props: none
State: currentPhrase (number), charIndex (number), isDeleting (boolean)
Effects: typewriter interval, scroll reveal observer
Children: StatusDot, Name, Typewriter, Lead, CTAs, Socials, ScrollCue
```

**Typewriter Logic:**
```
phrases = ["Junior Web Developer", "Networking Student", "Building Solutions That Flow"]
type speed: 68ms
delete speed: 36ms
pause at end: 1500ms
loop: yes
```

#### Objectives.tsx
```
Props: none
State: none
Effects: scroll reveal observer
Children: SectionHeader, GoalGrid (FeaturedCard + SecondaryCard), FlowStrip
```

**Goal Grid:**
- Desktop: `grid-template-columns: 1.15fr 1fr`
- Mobile (< 900px): single column

#### Projects.tsx
```
Props: projects (Project[])
State: none
Effects: scroll reveal observer
Children: SectionHeader, ProjectGrid → ProjectCard[]
```

**Project Card:**
```
Structure:
├── ProjectTop (number + optional status)
├── Title (h3)
├── Description (p)
├── Chips (tech stack)
└── Links (repo + live)
```

#### ProfessionalCourses.tsx
```
Props: courses (Course[])
State: none
Effects: scroll reveal observer
Children: SectionHeader, CourseGrid → CourseCard[]
```

#### Academics.tsx
```
Props: entries (AcademicEntry[])
State: none
Effects: scroll reveal observer
Children: SectionHeader, Timeline → TimelineItem[]
```

**Timeline:**
- Vertical teal line (1px) on left
- Dot markers (11px circles) at each entry
- Padding-left: 36px

#### Contact.tsx
```
Props: none
State: none
Effects: scroll reveal observer
Children: SectionHeader, EmailLink, CTA, Socials, Note
```

---

### UI Components

#### FlowLine.tsx
```
Props: sections (string[]) — section IDs
State: activeSection (string)
Effects: scroll listener for active node, resize for positioning
Children: FlowRail, FlowNode[]
```

**Animation:**
- Rail: `flow-sweep` keyframe, 5s linear infinite
- Node pulse: `node-pulse` keyframe, 2.6s ease-out infinite
- Active node: scale 1.4, brighter glow

#### ScrollReveal.tsx
```
Props: children, delay (number, default 0), className (string)
State: isVisible (boolean)
Effects: IntersectionObserver (threshold: 0.12)
```

**CSS Classes:**
```css
.reveal { opacity: 0; transform: translateY(26px); }
.reveal.in { opacity: 1; transform: none; }
transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
```

#### Typewriter.tsx
```
Props: phrases (string[]), typeSpeed (number), deleteSpeed (number), pauseDuration (number)
State: displayText (string), phraseIndex (number), charIndex (number), isDeleting (boolean)
Effects: setInterval for typing logic
```

#### Badge.tsx
```
Props: variant ('done' | 'live'), children
Renders: span with appropriate styling
```

#### Chip.tsx
```
Props: children
Renders: span with amber styling
```

#### Button.tsx
```
Props: variant ('primary' | 'ghost'), href (string), children
Renders: anchor tag with appropriate styling
```

---

## Navigation Routes

| Route | Page | Active Nav Link |
|-------|------|-----------------|
| `/` | Portfolio | Portfolio |
| `/blog` | Blog | Blog |
| `/#contact` | Portfolio (scroll) | Contact |

---

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| > 900px | Full desktop layout |
| ≤ 900px | Goal grid stacks, course grid stacks |
| ≤ 820px | Nav links hidden, burger visible, flow line opacity reduced |

---

## Animation Specs

### Scroll Reveal
- Trigger: element enters viewport (threshold 0.12)
- Animation: fade-in + slide-up
- Duration: 0.7s
- Stagger: 0.06s between siblings

### Typewriter
- Type: 68ms per character
- Delete: 36ms per character
- Pause: 1500ms at end of phrase
- Caret: blink animation, 1s steps(2)

### Flow Line Rail
- Animation: `flow-sweep` 5s linear infinite
- Gradient: `rgba(79,209,197,0)` → `rgba(79,209,197,.22)` → `rgba(79,209,197,0)`

### Hover Effects
- Cards: `translateY(-4px)` to `-6px`
- Buttons: `translateY(-2px)`
- Social icons: `translateY(-2px)` + accent color

---

## Accessibility

### Requirements
- All images have `alt` text
- Interactive elements have `aria-label`
- Focus visible: `2px solid var(--accent)`, `outline-offset: 3px`
- `prefers-reduced-motion`: disable all animations
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
  }
  .reveal { opacity: 1; transform: none; }
  html { scroll-behavior: auto; }
}
```

# Admin Panel — Design Prompt

Use this prompt in opencode to generate UI designs for the hidden admin panel.

---

## Prompt

```
Design a hidden admin panel for portfolio site "Nur E Allhi" — only accessible via direct URL (/admin), no link or button from public site.

DESIGN SYSTEM (must match portfolio):
- Background: ink navy #0B1120
- Panel/surface: #121A2B, surface-2: #172138
- Border: #1E2A42, border-soft: rgba(226,232,244,.08)
- Text: primary #E4E9F2, secondary #8B96AC
- Accent: signal teal #4FD1C5, bright #7BE8DD, soft rgba(79,209,197,.10)
- Secondary: amber #E8A33D, success #34D399, danger #EF4444 for delete
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (labels, code)
- Radius: 14px, nav height 64px, max width 1080px
- Style: dark, minimal, professional — same blueprint grid bg as portfolio (rgba(226,232,244,.025) 56px grid)
- No public navigation to admin — hidden route only

LAYOUT:
- Admin is separate from public site, same dark theme but utilitarian/dashboard feel
- Left sidebar (240px) on desktop: Logo "~/nur-e-allhi · admin", nav items: Dashboard, Projects, Education, Courses, Blog, Logout
- Top bar on mobile: hamburger → slide-in drawer
- Main content area: header with page title + primary action button (Add New)
- All pages use card panels (surface bg, border) with tables or forms inside

PAGES TO DESIGN (5 pages):

1. LOGIN PAGE (/admin/login):
- Centered card (max 400px) on navy bg with blueprint grid
- Title "Admin Access" (Space Grotesk), subtitle "Sign in to manage portfolio"
- Fields: Email (or username) + Password, mono label (11px uppercase, muted)
- Primary button "Sign In" (teal bg, #4FD1C5, dark text #06221F)
- Error state: red border + muted red text below field
- No signup, no forgot password — simple auth only
- Small footer text "Hidden access — no public link"

2. DASHBOARD (/admin):
- Header: "Dashboard" + date/stats row
- 4 stat cards in grid: Total Projects (3), Education entries (3), Courses (2), Blog posts (0/pending)
- Each stat card: icon (teal), number large, label mono muted
- Recent activity list: last 3 edits with "Edited Projects · 2 hours ago" style
- Quick actions row: "Add Project" "Add Blog Post" ghost buttons

3. PROJECTS LIST + FORM (/admin/projects):
- List view: table or card list with columns: # (/01), Title, Stack (chips amber), Status badge (Completed/In development), Actions (Edit teal, Delete red)
- Top: "Projects" + "Add Project" primary button
- Form (modal or separate page /admin/projects/new and /admin/projects/:id/edit):
  - Fields: Title, Number (/01), Description (textarea), Stack (tag input, add/remove chips), Repo URL, Live URL (optional), Status (select: completed / in development)
  - Actions: Save (primary teal) + Cancel (ghost) + Delete (red outline) when editing
  - Validation: required fields marked, error text in muted red

4. EDUCATION MANAGER (/admin/education) — covers Academics timeline + Professional Courses:
- Two tabs: "Academics" and "Professional Courses"
- Academics tab: table columns: Title (BBA/MBA/School), Subtitle, Year, Status badge, Institution, Actions (Edit/Delete)
- Courses tab: Title, Provider, Year, Status, Actions
- Add/Edit form fields:
  - Academics: Title, Subtitle, Year (e.g. "20— – 20—"), Status (completed/in-progress), Institution
  - Courses: Title, Provider, Year, Status, Description (textarea)
- Same button styles as Projects form

5. BLOG MANAGER (/admin/blog):
- List view: table with Title, Status (Draft/Published), Date, Actions (Edit/Delete)
- Empty state: same terminal widget style as public blog placeholder but with "No posts yet — create your first post" + "New Post" button
- Form fields: Title, Slug (auto from title, mono), Excerpt, Content (markdown textarea with mono font, preview toggle), Status (Draft/Published), Cover image URL (optional)
- Actions: Save Draft (ghost) + Publish (primary) + Delete (red)
- List view shows placeholder when empty, matching portfolio's terminal aesthetic

COMMON COMPONENTS:
- Sidebar nav: active item has teal left border + teal text, others muted mono uppercase 13px
- Table: header row muted mono 11px uppercase, row hover surface-2, border-bottom border-soft
- Modal/form overlay: centered, surface bg, border, 14px radius, backdrop rgba(5,9,18,.6) + blur
- Buttons: primary (teal solid), ghost (transparent + teal border), danger (red #EF4444 border + text)
- Inputs: surface-2 bg, border #1E2A42, focus teal border + glow, mono label, 10px radius
- Empty states: centered icon + muted text + CTA button
- Toast/notification: top-right, surface bg, border, success (green dot) or error (red dot), slides in

AUTH BEHAVIOR:
- Login guards all /admin/* routes — redirect to /admin/login if not authenticated
- Simple client-side auth for now (no backend yet) — store flag in localStorage
- Logout clears auth and redirects to /admin/login

STYLE KEYWORDS:
- Hidden admin, dark dashboard, minimal, developer-focused, same teal/navy portfolio theme
- Clean tables, not flashy — utilitarian but polished, consistent with public site
- No public link — admin is URL-only, no button in portfolio nav
```

---

## How to Use

1. Copy the prompt inside the code block above
2. Paste into opencode design generation
3. Generate designs for each admin page (Login, Dashboard, Projects, Education, Blog)
4. Save outputs to `DESIGNS/admin-*.html` and share with me — I will implement them as `/admin` routes with protected access

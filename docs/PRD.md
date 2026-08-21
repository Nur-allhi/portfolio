# Product Requirement Document — Dev Portfolio Website

## Vision
A personal developer portfolio website for Nur E Allhi to showcase projects, skills, and academic background. Primary goal: land a junior web development job or internship.

## Target User
- **Primary:** Hiring managers and recruiters reviewing candidate portfolios
- **Secondary:** Technical interviewers evaluating project depth

## Core Features

### 1. Hero Section
- Name display with animated typewriter tagline
- Status indicator (available for junior roles)
- Social links (GitHub, LinkedIn)
- CTA buttons (View My Work, Get in Touch)
- Scroll cue animation

### 2. Objectives Section
- Career goals display (networking primary, web dev secondary)
- Skill chips for both tracks
- Inspirational quote strip

### 3. Projects Section
- 3 project cards: MoneyFlows, YardFlow, EN IPTV Player
- Tech stack badges per project
- Repo and live site links
- Status indicators (completed, in development)

### 4. Professional Courses Section
- 2 course cards with completion status
- Programming Hero (2021, completed)
- PGD Network Solutions (IsDB Scholarship, in progress)

### 5. Academics Section
- Timeline layout for education history
- School, BBA, MBA entries with status badges
- Placeholder data for user to fill

### 6. Contact Section
- Email link (nureallhi1@gmail.com)
- Social icons (GitHub, LinkedIn)
- Location note (Bangladesh, open to remote)

### 7. Blog Page (Placeholder)
- "Coming soon" message
- Terminal-style widget
- Back to portfolio CTA

## User Workflows

### Primary: Job Seeker Review
1. Land on hero → see name + availability status
2. Scroll to projects → evaluate technical depth
3. Check courses/academics → verify credentials
4. Click contact → reach out for opportunity

### Secondary: Technical Deep Dive
1. Hero → scan social links → visit GitHub repos
2. Projects → click repo links → review code
3. Return → contact for discussion

## Success Metrics
- [ ] Page loads in < 2 seconds
- [ ] All sections render on mobile, tablet, desktop
- [ ] Typewriter animation works without jank
- [ ] All links functional (GitHub, LinkedIn, email)
- [ ] Visual match to design files (DESIGNS/)

## Out of Scope (v1)
- Blog content management
- Backend/API
- User authentication
- Analytics tracking
- CMS integration

## Tech Stack
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (utility-first styling)
- React Router (SPA routing)
- No backend required

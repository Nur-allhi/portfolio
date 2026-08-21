# Security & Access Document — Dev Portfolio Website

## Threat Model
This is a **static site with no backend**. Security surface is minimal.

### In-Scope Risks
1. **XSS via user-controlled URLs** — GitHub/LinkedIn links could be malicious
2. **Dependency vulnerabilities** — npm packages with known CVEs
3. **Secrets in source code** — API keys, tokens accidentally committed
4. **Open redirect** — External links without validation
5. **Admin bypass** — direct access to `/admin/*` without login (MVP uses localStorage)
6. **XSS via admin markdown** — blog content rendered as HTML

### Out-of-Scope (v1)
- Rate limiting (no API)
- Data encryption (static site, localStorage only)

---

## Security Controls

### 1. Input Validation (Link URLs)

**Risk:** Malicious URLs in GitHub/LinkedIn links could redirect to phishing sites.

**Control:** Validate all external URLs at build time.

```typescript
// src/data/projects.ts
const ALLOWED_DOMAINS = [
  'github.com',
  'linkedin.com',
  'vercel.app',
  'netlify.app',
];

function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ALLOWED_DOMAINS.some(d => parsed.hostname.endsWith(d));
  } catch {
    return false;
  }
}
```

### 2. Dependency Security

**Risk:** Vulnerable npm packages.

**Control:**
- Run `npm audit` before each deployment
- Use `npm audit --production` to ignore dev dependency noise
- Pin major versions in package.json

```bash
# Add to CI/CD pipeline
npm audit --production
if [ $? -ne 0 ]; then
  echo "Security audit failed"
  exit 1
fi
```

### 3. Secrets Prevention

**Risk:** API keys, tokens committed to git.

**Control:**
- `.gitignore` includes `.env`, `.env.local`, `.env.*.local`
- Pre-commit hook scans for secrets

```bash
# .gitignore
.env
.env.local
.env.*.local
*.pem
*.key
```

### 4. Content Security

**Risk:** XSS via dangerouslySetInnerHTML or unsanitized content.

**Control:**
- Public: never use `dangerouslySetInnerHTML`; all content is hardcoded in `src/data/*`
- Admin blog preview: sanitize markdown → HTML (escape `< >`, allow only `# ## ###`, `**`, `*`, `` ` ``, `

`); never inject raw HTML

### 6. Admin Auth (MVP)

**Risk:** localStorage auth is trivially bypassable.

**Control (current, `DESIGNS/admin/admin-auth.js:2`):**
- Hardcoded `admin@nureallhi.dev / admin123`, `localStorage.admin_auth === '1'`, `guard()` redirects to login, hidden URL (no public link)
- Acceptable for MVP because site is static and data is local-only

**Next step (when backend exists):**
- Replace with JWT + httpOnly cookie, bcrypt hash, env `ADMIN_EMAIL`/`ADMIN_PASSWORD_HASH`

### 7. Admin Input Validation

**Control:** Require Title/Desc in modals (`admin/projects.html:221`), escape output when rendering tables, use `rel="noopener noreferrer"` for external links.

### 5. External Link Safety

**Risk:** Links opening malicious sites.

**Control:**
- Add `rel="noopener noreferrer"` to all external links
- Use `target="_blank"` only where necessary

```tsx
<a
  href={project.repoUrl}
  target="_blank"
  rel="noopener noreferrer"
>
  repo
</a>
```

---

## Access Control

### Public: No Auth
- All portfolio content is public.

### Admin: Hidden + Guarded
- Routes `/admin/*` are URL-only, no link from public site (`AGENTS.md:1`)
- `AdminGuard` checks `localStorage.admin_auth === '1'` → else redirect `/admin/login`
- Single admin user (no roles). Logout clears storage.

---

## Data Guardrails

### What We Store
| Data | Location | Sensitivity |
|------|----------|-------------|
| Project metadata | `src/data/projects.ts` + `localStorage admin_projects` | Public |
| Academic entries | `src/data/academics.ts` + `admin_academics` | Public |
| Course info | `src/data/courses.ts` + `admin_courses` | Public |
| Blog posts | `localStorage admin_blog` | Public (published) |
| Admin auth flag | `localStorage admin_auth` | Sensitive (MVP) |
| Email address | `src/components/sections/Contact.tsx` | Public |

### What We Never Store
- User passwords
- Payment information
- Private API keys
- Session tokens
- Analytics identifiers

---

## Security Checklist (Pre-Deploy)

- [ ] `npm audit` passes with 0 vulnerabilities
- [ ] No `.env` files in git history
- [ ] All external links have `rel="noopener noreferrer"`
- [ ] No `dangerouslySetInnerHTML` (blog preview is sanitized)
- [ ] No hardcoded secrets (admin creds are MVP-only, documented)
- [ ] `.gitignore` covers env/build/deps; `admin_auth` is localStorage only
- [ ] Admin routes guarded, no public link to `/admin`
- [ ] Build output has no source maps in production

---

## Incident Response

### If Secrets Are Committed
1. **Rotate immediately** — generate new keys/tokens
2. **Remove from git history** — `git filter-branch` or BFG
3. **Force push** — update remote
4. **Notify affected parties** — if API keys were for third-party services

### If Vulnerability Found in Dependency
1. Check `npm audit` output
2. Update to patched version if available
3. If no patch, evaluate if vulnerability is exploitable in our context
4. Document decision in CHANGELOG.md

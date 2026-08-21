# Security & Access Document — Dev Portfolio Website

## Threat Model
This is a **static site with no backend**. Security surface is minimal.

### In-Scope Risks
1. **XSS via user-controlled URLs** — GitHub/LinkedIn links could be malicious
2. **Dependency vulnerabilities** — npm packages with known CVEs
3. **Secrets in source code** — API keys, tokens accidentally committed
4. **Open redirect** — External links without validation

### Out-of-Scope
- Authentication/authorization (no user system)
- Data encryption (no sensitive data stored)
- Rate limiting (no API endpoints)
- CSRF protection (no forms with state-changing operations)

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
- Never use `dangerouslySetInnerHTML`
- All content is hardcoded in TypeScript data files
- No user-generated content in v1

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

### No Authentication Required
- All content is public by design
- No admin panel in v1
- No user roles or permissions

### Future Considerations (v2+)
If blog with admin is added:
- Implement JWT-based auth
- Role-based access (admin vs visitor)
- Rate limiting on login attempts

---

## Data Guardrails

### What We Store
| Data | Location | Sensitivity |
|------|----------|-------------|
| Project metadata | `src/data/projects.ts` | Public |
| Academic entries | `src/data/academics.ts` | Public |
| Course info | `src/data/courses.ts` | Public |
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
- [ ] No `dangerouslySetInnerHTML` usage
- [ ] No hardcoded secrets in source
- [ ] `.gitignore` covers all sensitive files
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

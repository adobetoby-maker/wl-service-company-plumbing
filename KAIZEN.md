# KAIZEN — JRS Auto Repair
Continuous improvement log. Review on every session. Close items when fixed.
Live: jrsautorepair.worker-bee.app

---

## Open

### HIGH — Security
- [ ] **Dual-auth collision risk** — `/admin` uses cookie auth, `/portal` uses Supabase JWT. If the same browser session holds both, writes from one context can silently fail or use wrong identity. Audit: can an admin-authenticated request reach portal-only RLS rows? Found: pattern known from architecture, not tested.
- [ ] **`lib/supabase/admin.ts` import guard** — Confirm no client component imports admin.ts. Service role key must never reach the browser bundle. Run: `grep -r "supabase/admin" src/app --include="*.tsx" | grep -v "server"`. Found: 2026-05-24 CLAUDE.md pattern.

### MEDIUM — Content
- [ ] **Blog posts use TypeScript arrays** — All blog content lives in `lib/articles.ts`. Verify no markdown files have been accidentally added to `/app/blog/` or `/content/` by future contributors unfamiliar with the pattern.
- [ ] **Vitest test coverage** — Confirm `npm run test` passes cleanly and covers at least auth middleware, RLS-sensitive routes, and form submission handlers. Found: test suite exists but coverage not audited.

### LOW — Quality
- [ ] **SEO title audit** — Check all public-facing pages have unique `<title>` tags containing "Twin Falls" or "Magic Valley" for local SEO. Found: 2026-05-24 — not verified.
- [ ] **Google Business Profile verified** — Confirm JRS is claimed and verified on Google Maps with correct address, phone, hours. Found: 2026-05-24 — status unknown.

---

## Closed

| Date fixed | Item |
|---|---|
| 2026-05-22 | Sprint 1 a11y violations — 8/17 routes failing color contrast, #3A5070 on small text → fixed to #6E85A3 |
| 2026-05-22 | Skip-to-main link added for keyboard navigation |
| 2026-05-22 | 301 redirect rules added to next.config.ts for WordPress migration cutover |
| 2026-05-22 | DeferredShader wrapper created — fixed ssr:false Server/Client Component boundary build error |

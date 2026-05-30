---
project: jrs-auto-repair
category: nextjs-supabase-saas
deploy: vercel
lifecycle: active
last_verified: 2026-05-21
deployment_url: https://jrsautorepair.worker-bee.app
client: Pablo Zaldivar | 417 Main Ave E, Twin Falls, ID | (208) 595-2101 | Mon–Sat 9AM–5PM | 4.8★ 146 reviews
---

# Jr.'s Auto Repair

Full-service auto repair shop serving downtown Twin Falls for 13+ years.
Tagline: "Honest work, fair prices, done right the first time."

See `~/.claude/categories/nextjs-supabase-saas.md` for shared stack patterns.
**This file documents deviations and project-specific decisions only.**

---

## Deviations from Category

- **Vitest test suite** — `npm run test` and `npm run seed` exist
- **shopInfo.ts** — single source of truth for ALL business info. Never hardcode name, phone, hours, or address anywhere else.
- **AI chatbot** uses `claude-haiku-4-5` specifically
- **data/admins.json** — admin users stored in flat file, not DB

## Before Touching

Read `lib/shopInfo.ts` (all business facts) and `lib/supabase/` (three clients — ADR-0002).

---

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | localhost:3000 — use `-H 0.0.0.0` for Tailscale (ADR-0007) |
| `npm run build` | production build |
| `npm run lint` | ESLint |
| `npm run test` | Vitest, all tests |
| `npx vitest run lib/invoices/calculate.test.ts` | single test file |
| `npm run seed` | seed Supabase via scripts/seed.ts — ASK before running on prod |

---

## Architecture

### Auth — dual system, never mix (ADR-0006)

**Admin** (`/admin`) — cookie `admin_session`, signed with `ADMIN_SECRET`, users in `data/admins.json`, logic in `lib/adminAuth.ts`

**Portal** (`/portal`) — Supabase JWT via `lib/supabase/server.ts`, refreshed in `proxy.ts`

### Supabase Clients — pick right one (ADR-0002)

| File | Where | Bypasses RLS? |
|---|---|---|
| `lib/supabase/client.ts` | Client Components | No |
| `lib/supabase/server.ts` | Server Components, Route Handlers | No |
| `lib/supabase/admin.ts` | Privileged server ops only | YES — never client-side |

### Static Content (ADR-0001, ADR-0004)

- `lib/shopInfo.ts` — ONLY source for name, phone, address, hours, services
- `lib/articles.ts` — blog: `{ slug, title, excerpt, category, date, readTime, body }`
- `lib/howtos.ts` — tutorials
- Blog route: `/blog/[slug]` — never `/articles/[slug]` (ADR-0004)
- Never create .md files — renderer ignores them (ADR-0001)

---

## Competitive Context — SEO

Geo: Twin Falls + Magic Valley (50-mile radius — use both names together in content)
Primary: "auto repair Twin Falls ID", "mechanic Magic Valley Idaho", "mechanic near me Twin Falls"
Surrounding cities: Jerome, Kimberly, Filer, Buhl, Hansen, Wendell, Gooding, Shoshone, Burley, Rupert, Hagerman

---

## Env Vars

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ANTHROPIC_API_KEY           # chatbot — claude-haiku-4-5
ADMIN_SECRET                # signs admin_session cookie
```

---

## Vocabulary

- "Articles" = blog posts in lib/articles.ts (TypeScript array — not markdown, not CMS)
- "Admin" = Pablo's area at /admin (cookie auth, not Supabase)
- "Portal" = customer area at /portal (Supabase JWT)
- "shopInfo" = lib/shopInfo.ts — the only place business facts live

---

## Decision Defaults

| User says / context | Default action |
|---|---|
| "add a blog post" | Edit lib/articles.ts — ADR-0001 |
| "update hours / phone / address" | Edit lib/shopInfo.ts only |
| "add a service" | shopInfo.ts services + articles.ts SEO article |
| "add auth" / "auth broken" | Ask: /admin (cookie) or /portal (Supabase)? |
| "fix SEO" | Invoke seo-technical skill → seo-audit skill |
| "add content for [city]" | Include Magic Valley + Twin Falls cluster in same piece |
| "run the seed" | Ask — confirm target is dev Supabase, not prod |

---

## Failure Patterns

- Mixing /admin and /portal auth → silent 401s (ADR-0006)
- lib/supabase/admin.ts in a Client Component → service role key exposed (ADR-0002)
- Creating .md blog files → ignored, content never appears (ADR-0001)
- Linking /articles/[slug] → 404 in prod (ADR-0004)
- Hardcoding business name/phone outside shopInfo.ts → diverges from source of truth
- `npm run dev` without `-H 0.0.0.0` → Tailscale breaks silently (ADR-0007)
- Running seed on prod Supabase → irreversible data overwrite

---

## Delegation Matrix

| Decision | Default |
|---|---|
| Add article, route, component | Just do it |
| Edit shopInfo.ts business facts | Just do it |
| Schema / DB table changes | Just do it — note in CLAUDE.md |
| data/admins.json changes | Ask — affects Pablo's access |
| Run seed script | Ask — confirm dev target |
| Delete portal user data | Ask |

---

## Output Contract

1. List files changed (path:line for key changes)
2. State what was deferred and why
3. Note if shopInfo.ts or articles.ts changed — live content updates on next deploy
4. Note new env vars if added
5. Suggest next step — don't take it without being asked

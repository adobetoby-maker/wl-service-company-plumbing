<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# JRS Auto Repair — Project Context
Full context is in CLAUDE.md — read that first. This is the quick-ref.

## What This Is
Auto repair shop website with a public marketing site, customer portal (bill pay), and admin CRM.

## Stack
- Next.js 16 + React 19 + Supabase + Vitest
- Machine: [SSH] Mac Studio (~/jrs-auto-repair)

## Commands
```bash
npm run dev        # localhost:3000
npm run build
npm run lint
npm run test       # Vitest
npm run seed       # seed Supabase via scripts/seed.ts
```

## Deployment
- Live URL: https://jrs.worker-bee.app
- Deployed via Cloudflare Workers (@opennextjs/cloudflare)

## Two Auth Systems — Never Mix Them
1. **Admin** (`/admin`) — file-based, `admin_session` cookie, users in `data/admins.json`
2. **Portal** (`/portal`) — Supabase JWT auth, cookie-based SSR

## Three Supabase Clients — Pick the Right One
- `lib/supabase/client.ts` — browser only
- `lib/supabase/server.ts` — Server Components / Route Handlers
- `lib/supabase/admin.ts` — service role, bypasses RLS — NEVER import client-side

## Key Files
- `lib/types/db.ts` — canonical TS types (use this, not `lib/data.ts`)
- `lib/shopInfo.ts` — single source of truth for shop name/address/hours
- `lib/articles.ts` — blog articles (TS array, not markdown files)
- `lib/invoices/calculate.test.ts` — only test file currently

## DON'T TOUCH
- `data/admins.json` without being asked
- The two auth systems — they are intentionally separate

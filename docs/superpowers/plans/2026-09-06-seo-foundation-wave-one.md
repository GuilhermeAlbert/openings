# SEO Foundation Wave One Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strengthen openings.dev brand identity, canonical host enforcement, index hygiene, and the existing international discovery pages.

**Architecture:** Keep identity and locale metadata in focused helpers under `lib/metadata`, render factual JSON-LD on the server, and let sitemap entries reuse the same reciprocal language mapping. Enforce the apex host in the web-owned Apache artifact and protect every new contract with the repository's Node validators.

**Tech Stack:** Next.js 16 App Router static export, TypeScript, Node assertion validators, Apache rewrite rules.

---

### Task 1: Record and enforce canonical host and index policy

**Files:**
- Modify: `tooling/validate-growth-surfaces.mjs`
- Modify: `public/.htaccess`
- Modify: `app/design/page.tsx`
- Modify: `app/compare/page.tsx`

- [ ] Add assertions that `.htaccess` redirects the `www` host to HTTPS apex while preserving the request URI and that both utility pages declare `index: false, follow: true`.
- [ ] Run `npm run test:growth` and confirm it fails on the missing contracts.
- [ ] Add the rewrite rule before `ErrorDocument` and add page-level robots metadata to `/design` and `/compare`.
- [ ] Run `npm run test:growth` and confirm it passes.
- [ ] Commit as `fix(seo): consolidate canonical search surfaces`.

### Task 2: Publish a branded home entity graph

**Files:**
- Modify: `tooling/validate-growth-surfaces.mjs`
- Create: `lib/metadata/site-identity.ts`
- Modify: `app/page.tsx`

- [ ] Add assertions for the branded home title and a safely serialized `WebSite` plus `Organization` graph with official profile URLs.
- [ ] Run `npm run test:growth` and confirm it fails because the identity graph does not exist.
- [ ] Implement the static graph and render it on the home page using an escaped serializer.
- [ ] Run `npm run test:growth` and confirm it passes.
- [ ] Commit as `feat(seo): establish openings brand identity`.

### Task 3: Complete localized discovery metadata

**Files:**
- Modify: `tooling/validate-growth-surfaces.mjs`
- Modify: `lib/metadata/localized-alternates.ts`
- Modify: `app/[locale]/discover/[slug]/page.tsx`
- Modify: `app/sitemap.ts`

- [ ] Add assertions for Open Graph locale mapping and sitemap language alternates, including English `x-default`.
- [ ] Run `npm run test:growth` and confirm the new assertions fail.
- [ ] Add a shared Open Graph locale mapper, alternate locale list, and language-aware sitemap entries for curated routes.
- [ ] Run `npm run test:growth` and confirm it passes.
- [ ] Commit as `feat(seo): connect localized discovery signals`.

### Task 4: Validate exported artifacts

**Files:**
- Modify: `tooling/validate-metadata-export.mjs`

- [ ] Add export assertions for the branded home title, identity JSON-LD, utility noindex tags, localized Open Graph locale tags, and sitemap hreflang links.
- [ ] Run `npm run test:metadata` against the previous export and confirm it fails.
- [ ] Run `npm run build`, which produces the new export and executes metadata publication steps.
- [ ] Run `npm run test:metadata`, `npm test`, and `npm run lint` and confirm they pass.
- [ ] Commit as `test(seo): verify exported search metadata`.

### Task 5: Final review

**Files:**
- Review: all files changed by Tasks 1–4

- [ ] Confirm `git diff main~4..main` contains no unrelated changes and `.cloudflare/` remains untouched.
- [ ] Run fresh `npm test`, `npm run lint`, and `npm run build`.
- [ ] Report commit hashes and any deployment requirement without pushing or publishing.

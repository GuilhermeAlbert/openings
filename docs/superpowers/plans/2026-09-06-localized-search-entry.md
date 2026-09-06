# Localized Search Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish server-rendered localized home and opportunity-search entry pages and expand four inventory-backed discovery intents.

**Architecture:** English keeps its established unprefixed URLs; five non-English locales receive prefixed equivalents. Route-local i18n server snapshots produce translated static HTML, a small export postprocessor sets document language, and shared metadata helpers own canonical and hreflang mapping.

**Tech Stack:** Next.js 16 App Router static export, React 19, strict TypeScript, Node assertion validators.

---

### Task 1: Define localized entry routing

**Files:**
- Modify: `tooling/validate-growth-surfaces.mjs`
- Create: `lib/navigation/localized-routes.ts`
- Modify: `lib/metadata/localized-alternates.ts`
- Modify: `components/header/index.tsx`

- [ ] Add failing assertions for English-unprefixed route mapping, five prefixed locale routes, equivalent language navigation, and public-route hreflang.
- [ ] Run `npm run test:growth` and confirm failure.
- [ ] Implement pure route helpers and connect the header language action to equivalent routes while preserving query parameters.
- [ ] Run `npm run test:growth` and confirm success.
- [ ] Commit `feat(i18n): define localized search routes`.

### Task 2: Render localized entry pages

**Files:**
- Modify: `tooling/validate-growth-surfaces.mjs`
- Modify: `components/providers/i18n-provider/index.tsx`
- Create: `app/[locale]/page.tsx`
- Create: `app/[locale]/opportunities/page.tsx`

- [ ] Add failing assertions for five-locale static generation, localized metadata, route-local provider initialization, and locale synchronization.
- [ ] Run `npm run test:growth` and confirm failure.
- [ ] Add an optional provider server locale and compose localized home and search pages from existing components.
- [ ] Run `npm run test:growth` and confirm success.
- [ ] Commit `feat(seo): publish localized search entry pages`.

### Task 3: Set exported document languages

**Files:**
- Modify: `tooling/validate-growth-surfaces.mjs`
- Create: `tooling/localize-exported-html.mjs`
- Modify: `package.json`

- [ ] Add failing assertions for the post-export command and bounded locale-directory rewriting.
- [ ] Run `npm run test:growth` and confirm failure.
- [ ] Implement the idempotent postprocessor and run it immediately after `next build`.
- [ ] Run `npm run test:growth` and confirm success.
- [ ] Commit `fix(i18n): align exported document languages`.

### Task 4: Add four inventory-backed intents

**Files:**
- Modify: `tooling/validate-growth-surfaces.mjs`
- Modify: `lib/discovery/curated-pages.ts`

- [ ] Update the expected preset count and assert the four structured area slugs.
- [ ] Run `npm run test:growth` and confirm failure.
- [ ] Add backend, frontend, mobile, and full-stack presets with complete original copy in all six locales.
- [ ] Run `npm run test:growth` and confirm success.
- [ ] Commit `feat(seo): expand technology job discovery`.

### Task 5: Validate exported search pages

**Files:**
- Modify: `tooling/validate-metadata-export.mjs`

- [ ] Add export assertions for localized home/search document language, canonical, hreflang, translated heading, and all ten discovery intents.
- [ ] Run `npm run test:metadata` against the old export and confirm failure.
- [ ] Run a production build and confirm the new export passes metadata validation.
- [ ] Run the full test suite and lint on versioned source.
- [ ] Commit `test(seo): verify localized search exports`.

### Task 6: Final verification

**Files:**
- Review all files changed in this wave.

- [ ] Confirm the diff contains no `web-deploy` or `.cloudflare` changes.
- [ ] Run fresh `npm test`, source lint, `npm run build`, and `npm run test:metadata`.
- [ ] Report commit hashes and blockers without pushing or deploying.

# SEO Foundation Wave One Design

## Goal

Make openings.dev easier to identify as a distinct brand, consolidate its canonical host, and improve the machine-readable international discovery pages without expanding the route model in this wave.

## Scope

- Redirect every `www.openings.dev` request to the equivalent HTTPS apex URL.
- Brand the home page title explicitly with `openings.dev`.
- Publish one factual `WebSite` and `Organization` JSON-LD graph on the home page, including the existing official social profiles.
- Mark `/design` and `/compare` as `noindex,follow`. Both are product utilities rather than durable search acquisition pages; comparison state is client-owned and query-dependent.
- Add sitemap language alternates to all 36 localized discovery pages.
- Add correct Open Graph locale and alternate locales to those discovery pages.
- Expand export validation so these contracts fail the build when they regress.

## Architecture

Site identity stays in `lib/metadata`, next to canonical URL ownership. A focused serializer exposes a static JSON-LD graph to the server-rendered home page. Localized locale mapping is shared by page metadata and sitemap generation so language codes cannot drift.

Host consolidation remains in the web-owned `public/.htaccess`, which the private deployment repository already knows how to publish. The rule preserves path and query string and executes before the custom 404 directive.

## Indexing decisions

`/design` is excluded because it documents internal UI foundations rather than answering a job-search intent. `/compare` is also excluded because an empty or query-varying comparison screen has no stable standalone search value. Both retain `follow` so crawlers can traverse their links.

The six curated intents in six languages remain indexable. Each localized route is canonical to itself and points reciprocally to its five translations plus `x-default` English.

## Structured data

The home page graph contains:

- `WebSite`: name, canonical URL, description, publisher relation, and language coverage.
- `Organization`: name, canonical URL, logo, description, and existing official GitHub, LinkedIn, Bluesky, Mastodon, Threads, and Instagram profiles.

No founder, address, awards, or other unverifiable claims are added.

## Verification

The existing Node validation suite will assert source-level contracts and exported HTML/XML behavior. Required final checks are `npm test`, `npm run lint`, and `npm run build`.

## Next wave

The following are explicitly deferred:

- URL-owned localized home, search, profile, and documentation routes with server-rendered language and reciprocal hreflang.
- A safe lifecycle for removed job pages using tombstones, `noindex`, and eventual 404/410 behavior without deleting newer incremental bridge pages.
- Additional generic discovery clusters gated by inventory depth and original localized copy.

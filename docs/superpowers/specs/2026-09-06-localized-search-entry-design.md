# Localized Search Entry Design

## Goal

Give search engines and people stable, indexable entry points for openings.dev in all six supported languages while expanding only the strongest job-search intents supported by the current inventory.

## URL model

English remains the unprefixed default at `/` and `/opportunities`. Portuguese, Spanish, Italian, French, and German use `/{locale}/` and `/{locale}/opportunities`. This avoids creating duplicate `/en` versions of the established English URLs.

Curated discovery pages keep their existing `/{locale}/discover/{slug}` model, including `/en`, because those URLs are already public. Every translated family declares a self-canonical, reciprocal language alternates, and English as `x-default`.

The language selector navigates between equivalent localized entry routes. For routes not localized in this wave, it retains the existing preference-only behavior.

## Rendering and language ownership

The route parameter is the source of truth for localized entry pages. A nested i18n provider receives that locale as its server snapshot, so hero, headings, controls, and fallbacks render in the requested language rather than changing only after hydration.

Because Next.js has one root `<html>` element, a post-export step rewrites the `lang` attribute for static documents under localized route directories. It does not alter URLs, application content, or runtime state.

## Discovery expansion

The current public facet index supports four additional durable intents:

- Backend: 248 current jobs.
- Frontend: 152 current jobs.
- Mobile: 134 current jobs.
- Full-stack: 110 current jobs.

Each receives original concise copy in English, Portuguese, Spanish, Italian, French, and German. Filtering continues to use structured area taxonomy, not free-text matching. No country, city, technology, or combinatorial pages are introduced in this wave.

## Validation

Source contracts cover URL mapping, route generation, server locale initialization, curated content completeness, and post-export localization. Export validation checks titles, canonicals, hreflang, localized headings, and document language. Final verification uses the full Node validation suite, lint excluding only the preserved generated `.cloudflare` directory, and a production build.

## Deferred work

Community, author, documentation, report, and individual job routes remain locale-neutral. Localizing them requires a separate content and URL migration design. Removed-job lifecycle also remains deferred because safe cleanup must coordinate with incremental bridge publication owned by `web-deploy`.

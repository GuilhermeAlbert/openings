# openings.dev Overview

`openings.dev` is a static jobs discovery application for technology opportunities published in public GitHub community repositories.

The front-end is a Next.js App Router project exported as static pages. It does not store opportunity data locally. The application consumes raw JSON files published by the separate `openings-dev/data` repository and uses those files as its public data API.

## What the Platform Does

- Lists open technology opportunities from curated GitHub issue repositories.
- Provides filters for repository, region, country, tags, authors, sort order, and view mode.
- Generates static community, user, and job detail pages from the remote dataset.
- Renders project documentation and policy pages from local markdown content.
- Keeps source provenance by linking back to the original GitHub issue and repository.

## Data Flow

1. The `openings-dev/data` pipeline reads configured public GitHub repositories.
2. The data pipeline normalizes issues, builds facets, writes paginated static API files, and publishes snapshots to GitHub.
3. The front-end reads those files from `raw.githubusercontent.com`.
4. UI filtering and pagination resolve IDs, pages, and job detail buckets from the remote static API.
5. Static params for community, user, and job pages are generated from the same remote dataset at build time.

## Current Boundaries

- Front-end: `openings-dev/openings`.
- Data pipeline and raw static API: `openings-dev/data`.
- Local front-end data files: none.
- Local opportunity API route: none.
- Supported source type today: public GitHub data.

## Architecture Summary

- `app/` owns routes and route-local screens.
- `components/` owns reusable shell and UI primitives.
- `lib/opportunities/` owns remote data services, routing helpers, and opportunity domain types.
- `lib/utils/` owns framework-agnostic utilities.
- `docs/` and root markdown files provide content for documentation routes.

## Current Scope

The project is focused on discoverability for public technology opportunities already posted in community repositories. It is not a company ATS, not a resume platform, and not a replacement for the original source repository.

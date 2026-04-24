# API Reference

The openings.dev front-end consumes a static JSON API published by the `openings-dev/data` repository through raw GitHub URLs.

There is no local `/api/opportunities` endpoint in the front-end. Consumers should read the raw static files directly.

## Base URLs

```txt
https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities
https://raw.githubusercontent.com/openings-dev/data/main
```

Use the first base URL for opportunity snapshots and static API files. Use the second base URL when reading repository catalog metadata.

## Core Files

```txt
api/manifest.json
api/order/recent.json
api/page-lookup.json
api/pages/page-0001.json
api/jobs/<bucket>.json
api/job-ids.json
api/facet-index.json
api/search-index.json
index.json
countries/<country-code>/index.json
countries/<country-code>/repositories/<repository-slug>.json
```

## Manifest

`api/manifest.json` is the entry point for list and filter clients.

It includes:

- `generatedAt`: snapshot generation timestamp.
- `schemaVersion`: static API schema version.
- `pageSize`: number of opportunities per page file.
- `totals`: open opportunity, page, repository, country, and region counts.
- `files`: relative paths for facets, page lookup, search index, job IDs, and recent order.
- `facets`: top-level counts for repositories, regions, countries, tags, and authors.

Example:

```ts
const baseUrl =
  "https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities";

const manifest = await fetch(`${baseUrl}/api/manifest.json`).then((response) =>
  response.json(),
);
```

## List Loading

Use `api/order/recent.json` to get opportunity IDs in default recent order, then use `api/page-lookup.json` to map IDs to page files.

Example:

```ts
const [order, lookup] = await Promise.all([
  fetch(`${baseUrl}/api/order/recent.json`).then((response) => response.json()),
  fetch(`${baseUrl}/api/page-lookup.json`).then((response) => response.json()),
]);

const firstId = order.ids[0];
const pageFile = lookup.pageLookup[firstId];
const page = await fetch(`${baseUrl}/${pageFile}`).then((response) =>
  response.json(),
);
```

## Job Details

`api/job-ids.json` lists static job IDs. Detail records are bucketed by the first two characters after the `gh_` prefix.

Example:

```ts
const id = "gh_d84189d3af685f86cfe258c9";
const bucket = id.replace(/^gh_/, "").slice(0, 2);
const details = await fetch(`${baseUrl}/api/jobs/${bucket}.json`).then(
  (response) => response.json(),
);

const opportunity = details.items[id];
```

## Repository Catalog

Repository filter validation reads the catalog from:

```txt
https://raw.githubusercontent.com/openings-dev/data/main/src/modules/catalog/repositories.json
```

## Data Contract Notes

- Data is generated from public GitHub sources.
- The front-end does not use local JSON data or mocks.
- Raw files are cacheable static assets.
- Clients should treat `generatedAt` as the freshness indicator.
- Job availability is based on the latest published snapshot and should link back to the source issue for final verification.

## Support

Open an issue for API questions or contract proposals:

- [GitHub Issues](https://github.com/openings-dev/openings/issues)

# API-Referenz

Das openings.dev-Front-end verwendet eine statische JSON-API, die vom Repository `openings-dev/data` uber GitHub-Raw-URLs veroffentlicht wird.

Es gibt im Front-end keinen lokalen Endpunkt `/api/opportunities`. Verbraucher sollen die entfernten statischen Dateien direkt lesen.

## Basis-URLs

```txt
https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities
https://raw.githubusercontent.com/openings-dev/data/main
```

Die erste URL gilt fur Opportunities und statische API-Dateien. Die zweite URL gilt fur den Repository-Katalog.

## Wichtige Dateien

- `api/manifest.json`
- `api/order/recent.json`
- `api/page-lookup.json`
- `api/pages/page-0001.json`
- `api/jobs/<bucket>.json`
- `api/job-ids.json`
- `api/facet-index.json`
- `api/search-index.json`
- `index.json`
- `countries/<country-code>/index.json`

## Beispiel

```ts
const baseUrl =
  "https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities";

const manifest = await fetch(`${baseUrl}/api/manifest.json`).then((response) =>
  response.json(),
);
```

## Hinweise

- Die Daten stammen aus offentlichen GitHub-Quellen.
- Das Front-end nutzt keine lokalen JSON-Dateien, Mocks oder lokalen Daten-Fallbacks.
- `generatedAt` zeigt die Aktualitat des Snapshots.
- Jede Opportunity sollte zur finalen Prufung auf die ursprungliche Issue verweisen.

## Support

- [GitHub Issues](https://github.com/openings-dev/openings/issues)

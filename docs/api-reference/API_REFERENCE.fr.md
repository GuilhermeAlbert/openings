# Reference API

Le front-end openings.dev consomme une API JSON statique publiee par le depot `openings-dev/data` via les URLs raw de GitHub.

Il n'existe pas d'endpoint local `/api/opportunities` dans le front-end. Les consommateurs doivent lire directement les fichiers statiques distants.

## URLs de base

```txt
https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities
https://raw.githubusercontent.com/openings-dev/data/main
```

Utilisez la premiere URL pour les opportunites et les fichiers de l'API statique. Utilisez la seconde pour le catalogue des depots.

## Fichiers principaux

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

## Exemple

```ts
const baseUrl =
  "https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities";

const manifest = await fetch(`${baseUrl}/api/manifest.json`).then((response) =>
  response.json(),
);
```

## Notes

- Les donnees proviennent de sources publiques GitHub.
- Le front-end n'utilise ni JSON local, ni mocks, ni fallback local de donnees.
- `generatedAt` indique la fraicheur du snapshot.
- Chaque opportunite doit pointer vers l'issue originale pour verification finale.

## Support

- [GitHub Issues](https://github.com/openings-dev/openings/issues)

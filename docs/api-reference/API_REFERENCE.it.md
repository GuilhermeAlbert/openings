# Riferimento API

Il front-end di openings.dev consuma una API JSON statica pubblicata dal repository `openings-dev/data` tramite URL raw di GitHub.

Nel front-end non esiste un endpoint locale `/api/opportunities`. I consumer devono leggere direttamente i file statici remoti.

## URL base

```txt
https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities
https://raw.githubusercontent.com/openings-dev/data/main
```

Usa il primo URL per opportunita e file della API statica. Usa il secondo per il catalogo dei repository.

## File principali

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

## Esempio

```ts
const baseUrl =
  "https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities";

const manifest = await fetch(`${baseUrl}/api/manifest.json`).then((response) =>
  response.json(),
);
```

## Note

- I dati provengono da fonti pubbliche GitHub.
- Il front-end non usa JSON locali, mock o fallback locali di dati.
- `generatedAt` indica la freschezza dello snapshot.
- Ogni opportunita deve collegarsi alla issue originale per la verifica finale.

## Supporto

- [GitHub Issues](https://github.com/openings-dev/openings/issues)

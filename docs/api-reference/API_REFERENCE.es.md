# Referencia de API

El front-end de openings.dev consume una API JSON estática publicada por el repositorio `openings-dev/data` mediante URLs raw de GitHub.

No existe un endpoint local `/api/opportunities` en el front-end. Los consumidores deben leer los archivos estáticos remotos directamente.

## URLs base

```txt
https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities
https://raw.githubusercontent.com/openings-dev/data/main
```

Usa la primera URL para oportunidades y archivos de la API estática. Usa la segunda para el catálogo de repositorios.

## Archivos principales

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

## Ejemplo

```ts
const baseUrl =
  "https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities";

const manifest = await fetch(`${baseUrl}/api/manifest.json`).then((response) =>
  response.json(),
);
```

## Notas

- Los datos provienen de fuentes publicas de GitHub.
- El front-end no usa JSON local, mocks ni fallback local de datos.
- `generatedAt` indica la frescura del snapshot.
- Cada oportunidad debe enlazar a la issue original para verificacion final.

## Soporte

- [GitHub Issues](https://github.com/openings-dev/openings/issues)

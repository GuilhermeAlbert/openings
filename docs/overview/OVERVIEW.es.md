# Vision general de openings.dev

openings.dev es una aplicacion estatica para descubrir oportunidades de tecnologia publicadas en repositorios publicos de comunidades en GitHub.

El front-end es un proyecto Next.js App Router exportado como paginas estaticas. No almacena datos de oportunidades localmente. La aplicacion consume archivos JSON remotos publicados por el repositorio `openings-dev/data`.

## Que hace la plataforma

- Lista oportunidades abiertas de repositorios GitHub curados.
- Permite filtros por repositorio, region, pais, tags, autores y orden.
- Genera paginas estaticas de comunidades, usuarios y detalles de oportunidad desde el dataset remoto.
- Mantiene enlaces a la issue y al repositorio original.

## Flujo de datos

1. El pipeline `openings-dev/data` lee repositorios publicos configurados.
2. El pipeline normaliza issues, genera facets, paginas y snapshots segmentados.
3. El front-end lee esos archivos via `raw.githubusercontent.com`.
4. La UI resuelve listas, filtros y detalles usando la API estatica remota.

## Limites actuales

- Front-end: `openings-dev/openings`.
- Pipeline y API estatica raw: `openings-dev/data`.
- Datos locales de oportunidades en el front-end: ninguno.
- Endpoint local de oportunidades: ninguno.

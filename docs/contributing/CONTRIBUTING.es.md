# Contribucion

Este repositorio contiene solo el front-end estatico de openings.dev.

Usa este proyecto para cambios de UI, rutas, accesibilidad, servicios remotos en `lib/opportunities` y documentacion del front-end. Cambios en el catalogo de fuentes, pipeline de datos y snapshots pertenecen al repositorio `openings-dev/data`.

## Reglas de datos

- No agregues datos locales de oportunidades, mocks, fixtures, `db.json` o snapshots JSON.
- No importes archivos `.json` locales para oportunidades.
- No recrees un endpoint local `/api/opportunities`.
- Mantén URLs raw en `lib/opportunities/static-api.ts`.
- Mantén lecturas de la API estatica en `lib/opportunities/api.ts`.

## Setup

```bash
npm install
npm run dev
```

Usa Node.js `>=20.9.0`.

## Validacion

```bash
npm run lint
npm run build
```

Incluye capturas para cambios visuales y lista los comandos ejecutados en el PR.

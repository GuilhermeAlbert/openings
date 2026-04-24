# Contributi

Questo repository contiene solo il front-end statico di openings.dev.

Usa questo progetto per modifiche UI, route, accessibilita, servizi remoti in `lib/opportunities` e documentazione front-end. Le modifiche al catalogo sorgenti, al pipeline dati e agli snapshot appartengono al repository `openings-dev/data`.

## Regole dati

- Non aggiungere dati locali di opportunita, mock, fixture, `db.json` o snapshot JSON.
- Non importare file `.json` locali per opportunita.
- Non ricreare un endpoint locale `/api/opportunities`.
- Mantieni gli URL raw in `lib/opportunities/static-api.ts`.
- Mantieni le letture della API statica in `lib/opportunities/api.ts`.

## Setup

```bash
npm install
npm run dev
```

Usa Node.js `>=20.9.0`.

## Validazione

```bash
npm run lint
npm run build
```

Includi screenshot per modifiche visive e lista i comandi eseguiti nella PR.

# Contribution

Ce depot contient uniquement le front-end statique de openings.dev.

Utilisez ce projet pour les changements d'UI, de routes, d'accessibilite, de services distants dans `lib/opportunities` et de documentation front-end. Les changements de catalogue de sources, pipeline de donnees et snapshots appartiennent au depot `openings-dev/data`.

## Regles de donnees

- N'ajoutez pas de donnees locales d'opportunites, mocks, fixtures, `db.json` ou snapshots JSON.
- N'importez pas de fichiers `.json` locaux pour les opportunites.
- Ne recreez pas d'endpoint local `/api/opportunities`.
- Gardez les URLs raw dans `lib/opportunities/static-api.ts`.
- Gardez les lectures de l'API statique dans `lib/opportunities/api.ts`.

## Setup

```bash
npm install
npm run dev
```

Utilisez Node.js `>=20.9.0`.

## Validation

```bash
npm run lint
npm run build
```

Ajoutez des captures pour les changements visuels et listez les commandes executees dans la PR.

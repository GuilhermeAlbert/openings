# Beitrag

Dieses Repository enthalt nur das statische Front-end von openings.dev.

Nutzen Sie dieses Projekt fur UI, Routing, Accessibility, Remote-Services in `lib/opportunities` und Front-end-Dokumentation. Anderungen am Quellenkatalog, an der Datenpipeline und an Snapshots gehoren in das Repository `openings-dev/data`.

## Datenregeln

- Keine lokalen Opportunity-Daten, Mocks, Fixtures, `db.json` oder JSON-Snapshots hinzufugen.
- Keine lokalen `.json`-Dateien fur Opportunities importieren.
- Keinen lokalen Endpunkt `/api/opportunities` wieder einfuhren.
- Raw-URLs in `lib/opportunities/static-api.ts` halten.
- Statische API-Lesezugriffe in `lib/opportunities/api.ts` halten.

## Setup

```bash
npm install
npm run dev
```

Verwenden Sie Node.js `>=20.9.0`.

## Validierung

```bash
npm run lint
npm run build
```

Fugen Sie Screenshots fur visuelle Anderungen hinzu und listen Sie die ausgefuhrten Befehle in der PR.

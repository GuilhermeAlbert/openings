# openings.dev Uberblick

openings.dev ist eine statische Anwendung zum Entdecken von Tech-Opportunities, die in offentlichen GitHub-Community-Repositories veroffentlicht werden.

Das Front-end ist ein Next.js App Router Projekt, das als statische Seiten exportiert wird. Es speichert keine Opportunity-Daten lokal. Die Anwendung liest entfernte JSON-Dateien aus dem Repository `openings-dev/data`.

## Was die Plattform macht

- Listet offene Opportunities aus kuratierten GitHub-Repositories.
- Bietet Filter nach Repository, Region, Land, Tags, Autoren und Sortierung.
- Generiert statische Community-, User- und Detailseiten aus dem entfernten Dataset.
- Bewahrt Links zur ursprunglichen Issue und zum ursprunglichen Repository.

## Datenfluss

1. Die Pipeline `openings-dev/data` liest konfigurierte offentliche Repositories.
2. Die Pipeline normalisiert Issues und erzeugt Facets, Seiten und segmentierte Snapshots.
3. Das Front-end liest diese Dateien uber `raw.githubusercontent.com`.
4. Die UI lost Listen, Filter und Details uber die entfernte statische API auf.

## Aktuelle Grenzen

- Front-end: `openings-dev/openings`.
- Pipeline und statische Raw-API: `openings-dev/data`.
- Lokale Opportunity-Daten im Front-end: keine.
- Lokaler Opportunity-Endpunkt: keiner.

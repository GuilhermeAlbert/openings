# Panoramica di openings.dev

openings.dev e una applicazione statica per scoprire opportunita tech pubblicate in repository pubblici di community GitHub.

Il front-end e un progetto Next.js App Router esportato come pagine statiche. Non conserva dati di opportunita localmente. L'applicazione consuma file JSON remoti pubblicati dal repository `openings-dev/data`.

## Cosa fa la piattaforma

- Elenca opportunita aperte da repository GitHub curati.
- Offre filtri per repository, regione, paese, tag, autori e ordinamento.
- Genera pagine statiche di community, utenti e dettagli opportunita dal dataset remoto.
- Mantiene link alla issue e al repository originale.

## Flusso dati

1. Il pipeline `openings-dev/data` legge repository pubblici configurati.
2. Il pipeline normalizza issue e genera facet, pagine e snapshot segmentati.
3. Il front-end legge questi file via `raw.githubusercontent.com`.
4. La UI risolve liste, filtri e dettagli usando la API statica remota.

## Confini attuali

- Front-end: `openings-dev/openings`.
- Pipeline e API statica raw: `openings-dev/data`.
- Dati locali di opportunita nel front-end: nessuno.
- Endpoint locale di opportunita: nessuno.

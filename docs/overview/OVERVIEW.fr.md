# Apercu de openings.dev

openings.dev est une application statique pour decouvrir des opportunites tech publiees dans des depots publics de communautes GitHub.

Le front-end est un projet Next.js App Router exporte en pages statiques. Il ne stocke pas de donnees d'opportunites localement. L'application consomme des fichiers JSON distants publies par le depot `openings-dev/data`.

## Ce que fait la plateforme

- Liste des opportunites ouvertes depuis des depots GitHub selectionnes.
- Propose des filtres par depot, region, pays, tags, auteurs et tri.
- Genere des pages statiques de communautes, utilisateurs et details d'opportunite depuis le dataset distant.
- Conserve les liens vers l'issue et le depot d'origine.

## Flux de donnees

1. Le pipeline `openings-dev/data` lit les depots publics configures.
2. Le pipeline normalise les issues, genere les facets, les pages et les snapshots segmentes.
3. Le front-end lit ces fichiers via `raw.githubusercontent.com`.
4. L'UI resout les listes, filtres et details avec l'API statique distante.

## Limites actuelles

- Front-end: `openings-dev/openings`.
- Pipeline et API statique raw: `openings-dev/data`.
- Donnees locales d'opportunites dans le front-end: aucune.
- Endpoint local d'opportunites: aucun.

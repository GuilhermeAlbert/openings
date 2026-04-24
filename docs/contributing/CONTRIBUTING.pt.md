# Contribuição

Este repositório contém apenas o front-end estático do openings.dev.

Use este projeto para mudanças de UI, rotas, acessibilidade, serviços remotos em `lib/opportunities` e documentação do front-end. Mudanças no catálogo de fontes, pipeline de dados e snapshots pertencem ao repositório `openings-dev/data`.

## Regras de dados

- Não adicione dados locais de vagas, mocks, fixtures, `db.json` ou snapshots JSON.
- Não importe arquivos `.json` locais para oportunidades.
- Não recrie um endpoint local `/api/opportunities`.
- Mantenha URLs raw em `lib/opportunities/static-api.ts`.
- Mantenha leituras da API estática em `lib/opportunities/api.ts`.

## Setup

```bash
npm install
npm run dev
```

Use Node.js `>=20.9.0`.

## Validação

```bash
npm run lint
npm run build
```

Inclua screenshots para mudanças visuais e liste os comandos executados no PR.

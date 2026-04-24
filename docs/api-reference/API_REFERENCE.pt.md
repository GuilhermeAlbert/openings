# Referência da API

O front-end do openings.dev consome uma API estática em JSON publicada pelo repositório `openings-dev/data` via URLs raw do GitHub.

Não existe endpoint local `/api/opportunities` no front-end. Consumidores devem ler os arquivos estáticos remotos diretamente.

## URLs base

```txt
https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities
https://raw.githubusercontent.com/openings-dev/data/main
```

Use a primeira URL para oportunidades e arquivos da API estática. Use a segunda para o catálogo de repositórios.

## Arquivos principais

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

## Exemplo

```ts
const baseUrl =
  "https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities";

const manifest = await fetch(`${baseUrl}/api/manifest.json`).then((response) =>
  response.json(),
);
```

## Observações

- Os dados vêm de fontes públicas do GitHub.
- O front-end não usa JSON local, mocks ou fallback local de dados.
- `generatedAt` indica a atualização do snapshot.
- A vaga deve sempre apontar para a issue original para validação final.

## Suporte

- [GitHub Issues](https://github.com/openings-dev/openings/issues)

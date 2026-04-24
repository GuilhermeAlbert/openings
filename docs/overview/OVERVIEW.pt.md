# Visão geral do openings.dev

O openings.dev é uma aplicação estática para descobrir vagas de tecnologia publicadas em repositórios públicos de comunidades no GitHub.

O front-end é um projeto Next.js App Router exportado como páginas estáticas. Ele não armazena dados de vagas localmente. A aplicação consome arquivos JSON remotos publicados pelo repositório `openings-dev/data`.

## O que a plataforma faz

- Lista vagas abertas de repositórios GitHub curados.
- Permite filtros por repositório, região, país, tags, autores e ordenação.
- Gera páginas estáticas de comunidades, usuários e detalhes de vaga a partir do dataset remoto.
- Mantém links para a issue e o repositório original.

## Fluxo de dados

1. O pipeline `openings-dev/data` lê repositórios públicos configurados.
2. O pipeline normaliza issues, gera facets, páginas e snapshots segmentados.
3. O front-end lê esses arquivos via `raw.githubusercontent.com`.
4. A UI resolve listas, filtros e detalhes usando a API estática remota.

## Limites atuais

- Front-end: `openings-dev/openings`.
- Pipeline e API estática raw: `openings-dev/data`.
- Dados locais de vagas no front-end: nenhum.
- Endpoint local de oportunidades: nenhum.

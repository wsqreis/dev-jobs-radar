# Dev Jobs Radar

Dev Jobs Radar é uma aplicação open-source para acompanhar vagas de tecnologia com foco em Brasil, Portugal e times remotos.

- Visão geral: [README.md](README.md)
- Guide in English: [README.en.md](README.en.md)
- Arquitetura: [docs/architecture.md](docs/architecture.md)

## O que o produto faz hoje

- busca vagas do Google Jobs por meio de uma camada compartilhada no servidor
- suporta modo demo e modo live
- cai para demo mode com aviso visível quando o live mode não pode ser executado
- inclui presets para Brasil, Portugal, backend, frontend e dados/IA
- suporta filtros nativos de data para:
  - últimas 24 horas
  - últimos 3 dias
  - última semana
- suporta seletor de resultados por página e paginação com `Anterior` / `Próxima`
- expõe a mesma resposta normalizada na UI, na rota local `/api/jobs` e na CLI
- inclui um painel técnico com request normalizada, resumo cru e exemplos prontos de uso
- mostra estados próprios de loading durante busca e paginação

## Presets

Presets atuais:

- `backend-br` — Backend remoto Brasil
- `data-ai-br` — Dados e IA Brasil
- `frontend-remote` — Frontend remoto
- `portugal-remote` — Portugal remoto

Ao selecionar um preset, a aplicação atualiza a query, a localização, `gl` e `hl` na URL.

## Busca, filtros e URL

Todo o estado da busca é resolvido pela URL e passa pela mesma camada compartilhada usada pela página e pela API local.

Parâmetros suportados hoje:

- `preset`
- `q`
- `location`
- `gl`
- `hl`
- `mode`
- `datePosted`
- `pageSize`
- `page`
- `pageToken`
- `pageTokenTrail`

Filtros de data suportados:

- `24h`
- `3d`
- `7d`

## Paginação

A paginação respeita o comportamento real da busca:

- no demo mode, a paginação é feita sobre a fixture local
- no live mode, a navegação usa o token de próxima página retornado pelo provider
- a aplicação guarda o estado na URL usando:
  - `page`
  - `pageToken`
  - `pageTokenTrail`

A interface expõe:

- seletor de quantidade por página
- botão `Anterior`
- botão `Próxima`

## Demo mode vs live mode

### Demo mode

- funciona sem credenciais
- usa a fixture em `src/tests/fixtures/google-jobs-sample.json`
- é o caminho mais seguro para explorar a app localmente

### Live mode

- requer `SERPAPI_API_KEY`
- usa a integração real com Google Jobs
- se o live mode for solicitado sem uma chave válida, a app volta para demo mode com aviso em vez de quebrar

## CLI e API local

A CLI reaproveita exatamente a mesma resolução de request e a mesma lógica de busca da UI.

Comando da CLI:

```bash
npm run cli -- --mode demo --preset backend-br
```

Exemplo de chamada à API local:

```bash
curl "http://localhost:3000/api/jobs?mode=demo&preset=backend-br&pageSize=5&page=1&datePosted=24h"
```

## Como rodar

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Copie `.env.example` para `.env.local`.

```bash
SERPAPI_API_KEY=
SERPAPI_DEMO_MODE=true
```

Notas:

- `SERPAPI_DEMO_MODE=true` mantém o demo mode como caminho padrão no ambiente local.
- Para validar buscas reais, defina `SERPAPI_API_KEY` e use `mode=live`.

### 3. Rode a aplicação

```bash
npm run dev
```

Abra `http://localhost:3000`.

## Verificação

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

Teste rápido da CLI:

```bash
npm run cli -- --mode demo --preset backend-br
```

## Documentação relacionada

- [README.md](README.md)
- [README.en.md](README.en.md)
- [docs/architecture.md](docs/architecture.md)
- [docs/walkthrough-pt-br.md](docs/walkthrough-pt-br.md)
- [docs/blog-post-outline.md](docs/blog-post-outline.md)

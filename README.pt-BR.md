# Dev Jobs Radar

Dev Jobs Radar é um projeto open-source criado para demonstrar como a SerpApi pode ser usada para construir uma experiência útil de descoberta de vagas para desenvolvedores brasileiros e do mercado lusófono.

## O que este projeto demonstra

- integração prática com a Google Jobs API da SerpApi usando o SDK oficial em JavaScript
- uma interface web em Next.js + TypeScript
- uma CLI reutilizando a mesma camada de busca e normalização
- um modo demo para quem quiser rodar o projeto sem chave
- documentação bilíngue pensada para portfólio, GitHub e blog post técnico

## Por que este caso de uso faz sentido

Acompanhar vagas relevantes ainda é um problema real para devs no Brasil. Existe muito ruído, muita busca manual e pouca transparência sobre como transformar resultados em uma experiência realmente útil. Este projeto pega uma necessidade cotidiana e a transforma em um demo técnico que também serve como peça de DevRel.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- SerpApi JavaScript SDK
- Vitest
- Playwright
- tsx para a CLI

## Funcionalidades atuais

- dashboard PT-BR com presets para Brasil e Portugal
- filtros via URL para buscas compartilháveis
- cards de vagas com dados normalizados
- modo demo com fixture local
- rota `/api/jobs` retornando a mesma estrutura usada na UI
- CLI com saída legível para terminal
- Developer Inspector com request, resumo cru e exemplos de uso

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

- Se `SERPAPI_DEMO_MODE=true`, o projeto usa fixture local por padrão.
- Para testar a API real, defina `SERPAPI_API_KEY` e use `mode=live` na UI ou `--mode live` na CLI.

### 3. Rode a aplicação web

```bash
npm run dev
```

Abra `http://localhost:3000`.

### 4. Rode a CLI

```bash
npm run cli -- --mode demo --preset backend-br
```

Exemplo com query customizada:

```bash
npm run cli -- --mode demo --query "engenheiro de dados remoto" --location Brazil --gl br --hl pt-br
```

## Exemplos de uso

### Buscar pela API local do projeto

```bash
curl "http://localhost:3000/api/jobs?mode=demo&preset=backend-br"
```

### Exemplo com o SDK da SerpApi

```ts
import { getJson } from "serpapi";

const jobs = await getJson({
  api_key: process.env.SERPAPI_API_KEY,
  engine: "google_jobs",
  q: "desenvolvedor backend remoto",
  location: "Brazil",
  gl: "br",
  hl: "pt-br",
  num: 10,
});
```

## Estrutura do projeto

```text
src/app                     aplicação Next.js
src/app/api/jobs            rota da API local
src/components              componentes da interface
src/lib/jobs                tipos, presets, normalização e insights
src/lib/serpapi             integração com o SDK
scripts/dev-jobs-radar.ts   CLI do projeto
src/tests                   testes unitários e de integração
docs                        arquitetura e material editorial
```

## Verificação

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Teste rápido da CLI:

```bash
npm run cli -- --mode demo --preset backend-br
```

## Roadmap próximo

- adicionar screenshots e GIFs para o README
- expandir a CLI com exportação JSON/Markdown
- adicionar mais presets para mobile, frontend e data roles
- incluir uma versão pública hospedada

## Conteúdo para acompanhar a publicação

**Título sugerido do post:**

Como criei um radar de vagas para devs brasileiros com SerpApi, Next.js e TypeScript

**Ângulo sugerido:**

Mostrar o projeto como uma peça de Developer Advocacy: uma integração limpa com a SerpApi aplicada a um problema real da comunidade brasileira, com transparência técnica suficiente para ensinar outras pessoas a reproduzir a ideia.

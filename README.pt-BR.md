# Dev Jobs Radar

Dev Jobs Radar é um projeto open-source para acompanhar vagas de tecnologia com foco em Brasil, Portugal e trabalho remoto.

## O que este projeto entrega

- integração com resultados de Google Jobs usando um SDK JavaScript
- interface web em Next.js + TypeScript
- CLI reutilizando a mesma camada de busca e normalização
- modo demo para rodar o projeto sem chave
- documentação bilíngue pensada para GitHub e artigo técnico

## Por que este caso de uso faz sentido

Buscar vagas ainda é um processo cheio de ruído para muita gente no mercado brasileiro. Entre buscas repetitivas, filtros inconsistentes e excesso de abas abertas, sobra pouco contexto sobre quais termos, formatos e localidades realmente aparecem com frequência. O objetivo deste projeto é transformar esse trabalho manual em uma experiência mais clara, reutilizável e comparável.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- SDK JavaScript para busca estruturada
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
- painel técnico com request, resumo cru e exemplos de uso

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

### Exemplo com o SDK usado no projeto

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
- expandir a CLI com exportação JSON ou Markdown
- adicionar mais presets para mobile, frontend e data roles
- incluir uma versão pública hospedada

## Conteúdo para acompanhar a publicação

**Título sugerido do post:**

O que um radar de vagas revela sobre backend, dados e IA no mercado brasileiro

**Ângulo sugerido:**

Usar o radar como ferramenta de observação para discutir padrões de contratação, termos recorrentes, localidades e formatos de trabalho. O projeto aparece como suporte para a análise, não como protagonista promocional do texto.

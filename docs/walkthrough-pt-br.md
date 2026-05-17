# Walkthrough em PT-BR

Este documento serve como rascunho do artigo técnico que acompanha o projeto.

## 1. O problema

Muitos devs brasileiros fazem buscas manuais repetitivas para acompanhar vagas remotas, oportunidades em empresas internacionais ou posições mais alinhadas com backend, dados e IA. O problema não é apenas encontrar resultados, mas transformar esses resultados em algo filtrável, reutilizável e fácil de explicar.

## 2. Por que usar SerpApi

A SerpApi reduz a fricção de trabalhar com resultados de busca estruturados. Em vez de montar scraping manual para um caso inicial, este projeto usa a Google Jobs API para focar no que interessa para um portfólio DevRel:

- qualidade da integração
- tratamento dos dados
- experiência do produto
- clareza da documentação

## 3. A proposta do Dev Jobs Radar

O objetivo foi construir um radar de vagas com duas interfaces:

- uma UI web para descoberta rápida
- uma CLI para demonstrar reutilização da lógica e utilidade para automação

O projeto também inclui um modo demo, para que qualquer pessoa consiga rodá-lo sem depender de uma chave privada.

## 4. Como a integração foi estruturada

A busca passa por quatro etapas:

1. entrada do usuário via URL ou CLI
2. resolução do request tipado com preset, localização e modo
3. chamada do SDK da SerpApi em live mode ou fixture local em demo mode
4. normalização para uma estrutura interna estável

Isso mantém a UI desacoplada da resposta crua da API e torna mais fácil evoluir a aplicação.

## 5. Normalização e insights

Os resultados retornados pela busca são transformados em um formato interno com campos como:

- título da vaga
- empresa
- localização
- descrição
- links relacionados
- opções de candidatura
- extensões detectadas

Depois disso, o projeto gera insights simples como empresas mais frequentes, localizações mais comuns e tipos de jornada.

## 6. Dashboard e Developer Inspector

A página principal foi construída com renderização no servidor usando `searchParams` no App Router. Isso permite que a URL seja a fonte de verdade para filtros compartilháveis.

O Developer Inspector mostra:

- request normalizada
- resumo cru da resposta
- snippet com o SDK
- exemplo equivalente com a CLI

Esse painel é importante porque transforma o projeto em material educativo, não apenas em demo visual.

## 7. CLI reutilizando a mesma camada

A CLI usa a mesma função `searchJobs` da aplicação web. Isso reforça a mensagem central do projeto: a integração não está acoplada à interface. O mesmo núcleo pode alimentar web UI, automações e exemplos de documentação.

## 8. Verificação

Os checks usados no projeto são:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run cli -- --mode demo --preset backend-br
```

## 9. Próximos passos

Algumas evoluções naturais para publicar depois:

- exportação JSON ou Markdown na CLI
- presets adicionais para mobile, frontend ou product engineering
- screenshots e GIFs para o README
- deploy público em Vercel

## Título sugerido

Como criei um radar de vagas para devs brasileiros com SerpApi, Next.js e TypeScript

## Ângulo sugerido

Contar a história como uma peça de Developer Advocacy: um problema real da comunidade brasileira, resolvido com uma integração clara da SerpApi, uma UI útil, uma CLI reaproveitável e documentação pensada para ensinar outras pessoas.

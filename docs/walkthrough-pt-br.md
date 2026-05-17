# Walkthrough em PT-BR

Este documento descreve o fluxo real da aplicação no estado atual.

## 1. Abrir a aplicação

Inicie o projeto com:

```bash
npm run dev
```

Depois abra `http://localhost:3000`.

## 2. Entender o fluxo de busca

A home page resolve o estado da busca a partir da URL. Isso significa que filtros, paginação e presets ficam compartilháveis e previsíveis.

A busca pode ser montada por:

- texto livre
- localização
- `gl`
- `hl`
- modo (`auto`, `demo`, `live`)
- resultados por página
- data da vaga (`24h`, `3d`, `7d`)
- preset

## 3. Usar os presets

Presets atuais:

- Backend remoto Brasil
- Dados e IA Brasil
- Frontend remoto
- Portugal remoto

Ao clicar em um preset, a app atualiza automaticamente:

- query
- localização
- `gl`
- `hl`
- `page=1`

## 4. Trocar filtros de data

O campo `Data da vaga` suporta os filtros nativos expostos hoje pela aplicação:

- Últimas 24 horas
- Últimos 3 dias
- Última semana

Ao submeter a busca, o filtro entra na URL como `datePosted`.

## 5. Entender demo mode vs live mode

### Demo mode

- usa a fixture local
- não precisa de chave
- é a melhor forma de explorar a UI e os testes localmente

### Live mode

- usa `SERPAPI_API_KEY`
- consulta resultados reais do Google Jobs
- se a chave não estiver disponível, a app volta para demo mode com aviso visível

## 6. Navegar pelos resultados

A lista de vagas mostra paginação com:

- seletor de resultados por página
- `Anterior`
- `Próxima`

No demo mode, a paginação é simulada a partir da fixture.
No live mode, a navegação usa o token retornado pela próxima página do provider.

## 7. Acompanhar o loading

Em vez de um loading genérico de página inteira, a aplicação mostra feedback local:

- `Buscando...` no botão principal
- `Carregando...` em presets e paginação
- um aviso compacto de carregamento perto da área de resultados

## 8. Usar o painel técnico

O painel técnico mostra:

- request normalizada
- resumo cru da busca
- exemplo de SDK
- exemplo equivalente com a CLI

Esse painel é útil para validar a integração e também para documentação.

## 9. Rodar a CLI

Exemplo:

```bash
npm run cli -- --mode demo --preset backend-br
```

A CLI imprime:

- modo resolvido
- fonte dos dados
- warning, quando houver
- busca e localização
- lista normalizada de vagas
- top companies
- exemplo de SDK

## 10. Verificação

Comandos atuais:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

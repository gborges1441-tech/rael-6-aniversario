# Plano — Convite digital do Rael

## Escopo
Landing page estática, mobile-first e compartilhável por link, com foco em impacto visual, leitura rápida e confirmação via WhatsApp. O site não terá login, backend, banco, automações de envio ou custos adicionais.

## Abordagens visuais consideradas
- **Editorial tropical cinematográfico** — probabilidade 0,07.
- **Scrapbook infantil colorido** — probabilidade 0,04.
- **Minimalismo aquático premium** — probabilidade 0,08.

### Direção escolhida: editorial tropical cinematográfico

- **Movimento de design:** editorial de viagem tropical com energia de parque aquático, combinando fotografia em tela cheia, blocos assimétricos e cartões de informação com acabamento de convite premium.
- **Princípios centrais:** uma foto protagonista; hierarquia tipográfica forte; alegria sem excesso de elementos; ações importantes sempre visíveis e fáceis de tocar.
- **Filosofia de cor:** azul profundo cria contraste e confiança; turquesa remete à água e ao frescor; amarelo concentra atenção nas chamadas; branco quente preserva leveza e sofisticação.
- **Paradigma de layout:** narrativa vertical em “ondas”, alternando blocos largos, cartões deslocados e faixas diagonais em vez de uma grade rígida centralizada.
- **Elementos de assinatura:** selo circular “R6”, linhas de onda finas e cartões amarelos com recortes arredondados que atravessam as seções.
- **Interação:** cada clique leva diretamente para a próxima decisão — participar, informar dados ou abrir o WhatsApp — sem etapas desnecessárias.
- **Animação:** entrada suave de blocos ao rolar, flutuação discreta do selo e movimento lento de linhas de água; sem efeitos pesados ou distrações.
- **Tipografia:** `Plus Jakarta Sans` para leitura e `Bricolage Grotesque` para títulos expressivos, com fallback local para carregamento resiliente.
- **Essência da marca:** um convite de aniversário que transforma um dia de parque aquático em uma pequena experiência editorial. Personalidade: vibrante, afetiva, ensolarada.
- **Voz:** curta, calorosa e direta. Exemplos: “Prepare-se para um dia de muita água, alegria e diversão!” e “Estou contando os dias para viver essa aventura com você!”.
- **Wordmark:** “RAEL / 6” em composição vertical, com o número inserido em um selo de sol.
- **Cor proprietária:** turquesa `#0CC8C8`, usada para conectar água, foto e chamadas.

## Implementação
- HTML, CSS e JavaScript vanilla para manter o carregamento rápido e não depender de APIs ou pacotes.
- Dados do evento e mensagens do WhatsApp centralizados no início de `app.js`.
- Foto enviada pelo usuário armazenada em `/manus-storage/` e usada sem alteração facial; slots de galeria restantes permanecem como placeholders honestos até novas fotos.
- `public/manus-routes.json` declara a rota única `/`.
- Preview servido na porta 3000; publicação configurada como saída estática sem etapa de build.

## Estrutura
- `index.html`: semântica, conteúdo e controles do convite.
- `styles.css`: sistema visual responsivo, efeitos leves e estados de acessibilidade.
- `app.js`: dados, validações e geração de links oficiais do WhatsApp.
- `public/manus-routes.json`: manifesto de rotas do site.
- `app.config.ts`: metadado de logo do projeto.

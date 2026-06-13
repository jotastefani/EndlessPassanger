# Design System - EndPass

Documentação dos padrões visuais, tokens de design e componentes reutilizáveis do projeto.

---

## 1. Tokens de Design

### 1.1 Cores

Cores base do tema escuro do EndPass.

Primárias:
- Brand: `#7B61FF` (ações principais, botões, destaques)
- Superfície primária: `#0F0F11` (fundo principal)
- Superfície secundária: `#1A1A1F` (cards, inputs, containers)

Funcionais:
- Sucesso / destaque positivo: usar Brand como referência principal.
- Erro: `#b91c1c`
- Aviso: alinhar com contexto de uso; quando houver necessidade formal, usar tom próximo a amarelo discreto.

Textos:
- Texto principal: `#FFFFFF`
- Texto secundário: `#AAAAAA`
- Texto terciário / placeholder: `#777`

Uso:
- Somente cores oficiais devem ser usadas em novos componentes.
- Evitar forks de cor sem consulta prévia.

### 1.2 Tipografia

Família: sistema padrão do React Native.

Tamanhos:
- Título principal: `32px`, `bold`
- Título de seção: `18px`, `bold` (muitas vezes em `labelStyle`)
- Corpo: `16px`
- Texto auxiliar: `13px` a `14px`

Pesos utilizados:
- `bold` / `700`: títulos e ações principais.
- `600`: textos de destaque menor.
- Regular: corpo de texto.

Altura de e linha:
- Títulos: `lineHeight` proporcional ao tamanho.
- Corpo: manter legibilidade conforme bloco.

### 1.3 Espaçamento

Padrões comuns:
- Espaçamento interno de telas: `24px` em `padding`.
- Espaçamento entre blocos: `16px`, `20px`, `24px`, `32px`.
- Inputs: `paddingVertical/Horizontal: 16`.

Raio de borda:
- Botões: `12px` a `16px`
- Containers: `12px` a `24px`
- Chips de seleção: `14px` a `999`

---

## 2. Componentes Base

### 2.1 Inputs

Estrutura padrão já usada no app:
- Fundo: `#1A1A1F`
- Texto: `#FFFFFF`
- Placeholder: `#777`
- Padding: `16`
- Border radius: `12`

Exemplo conceitual:
- `inputStyle` em telas de cadastro e criação.

Obs:
- Evitar bordas externas; contraste é garantido pelo contraste de fundo.

### 2.2 Botões Primários

Estrutura:
- Fundo: `#7B61FF`
- Texto: `#FFFFFF`, `bold`, `16px`
- Padding vertical: `16` a `18`
- Border radius: `12` a `16`
- Alinhamento: `center`

Usos comuns:
- Login, cadastros, publicação de evento.

### 2.3 Botões Secundários

- Fundo: `#1A1A1F`
- Texto: `#FFFFFF`, `bold`
- Podem ter padding maior (`20`) em cards de escolha.

Exemplo:
- Botão de escolha de tipo de conta no `register.tsx`.

### 2.4 Textos Linkados

- Cor: `#7B61FF`
- Ação: navegação para outra tela
- Alinhamento: `center`
- Margem superior: `24`

Exemplo:
- "Criar conta" na tela de login.

### 2.5 Cards / Containers

Características gerais:
- Fundo escuro com contraste sutil.
- Espaçamento interno entre `16` e `24`.
- Border radius: `12` a `24`.

Exemplos:
- Overlay da Home.
- EventCard.
- Modal de sucesso.

### 2.6 Modais

- Overlay com `rgba(0,0,0,0.7)`.
- Container central com:
  - largura próxima a `100%`
  - border-radius `20`
  - padding `24`
- Botões com padding maior para facilitar toque (`14` a `16`).

Exemplo:
- Modais de sucesso de cadastro.

### 2.7 Switch / Toggle

- Usado apenas em contexto de preferência (ex.: evento privado).
- Labels ao lado esquerdo, componente à direita.
- Visível apenas para CNPJ; CPF usa bloco fixo informativo.

---

## 3. Estilos por Tela

### 3.1 Home

- Fundo: `#05070A`
- Overlay:
  - fundo: `#111318`
  - border-radius: `24`
  - padding: `22`
  - sombra/elevação compatível com tema escuro

### 3.2 Onboarding

- Fundo: `#0F0F11`
- Texto introdutório:
  - título `32px`, `bold`
  - descrição `16px`, `#A0A0B2`

### 3.3 Autenticação e Cadastros

- Fundo: `#0F0F11`
- Inputs com estilo base já documentado.
- Botões principais alinhados ao padrão primário.

### 3.4 Mapa

- Mapa ocupa tela cheia.
- Estados:
  - loading: `ActivityIndicator` centralizado.
  - erro: texto `#b91c1c` centralizado.
  - vazio: overlay absoluto com mensagem discreta.

---

## 4. Ícones e Imagens

Uso atual:
- SVGs nativos (`homeIcon.svg`, `plusIcon.svg`, `profileIcon.svg`, `searchIcon.svg`).
- PNGs em `assets/icons/` quando houver necessidade de assets alternativos.
- Quando não há asset específico, componentes vetoriais podem ser usados como fallback.

Regras:
- Ícone de tab deve ter tamanho coerente com tab bar (`width/height` entre `24` e `32`).
- Imagens de capa são tratadas como `Image` com `resizeMode: 'cover'` e dimensões do container pai.

---

## 5. Estados e Acessibilidade

- Todos os botões devem area de toque adequada (mínimo recomendado `44x44`).
- Contraste entre texto e fundo deve ser mantido.
- Evitar textos em `#777` sobre backgrounds mais escuros sem teste.

---

## 6. Evolução do Design System

Sugestões futuras:
- Criar arquivo de tokens centralizado (`src/theme/index.ts`) para cores, tipografia e espaçamento.
- Padronizar componentes em `src/components/ui/`.
- Criar Storybook ou showcase interno das variações.
- Definir tokens de sombra e elevação.

# EndPass - Documentação do Projeto

## 1. Visão do Produto

O **EndPass** é um aplicativo mobile de descoberta e publicação de eventos sociais, com foco em experiências noturnas e culturais: festas, shows, peças de teatro, palestras, stand-up e eventos particulares. A proposta é unificar descoberta por mapa, criação de eventos e engajamento social em um fluxo mobile-first, posicionando-se como uma alternativa de nicho mais leve e social a plataformas como Eventbrite, Sympla e Shotgun, mas com identidade e usabilidade voltadas para o público jovem e organizadores independentes.

Diferenciais estratégicos:
- Mapa como home e fonte primária de descoberta.
- Dois perfis distintos no cadastro: CPF (pessoa física) e CNPJ (organizador/empresa).
- Eventos públicos e privados, com controle de acesso por tipo de conta.
- Integração com localização em tempo real via Expo Location e mapa interativo com React Native Maps.
- Fluxo de criação de evento enxuto, com imagem, localização, gênero musical e categoria.

Público-alvo em validação:
- Jovens adultos de 18 a 35 anos interessados em eventos noturnos e culturais.
- Organizadores independentes, casas de show e pequenos promoters que precisam publicar eventosrapidamente.

---

## 2. Requisitos Funcionais

### 2.1 Autenticação e Perfil
- Login com e-mail e senha.
- Cadastro com escolha entre conta CPF ou CNPJ.
- Tela de onboarding na primeira execução.
- Perfil com dados básicos do usuário.
- Dois fluxos de cadastro:
  - `register-cpf.tsx`: nome completo, CPF, e-mail, senha.
  - `register-cnpj.tsx`: nome da empresa, CNPJ, e-mail, senha.

### 2.2 Descoberta e Navegação
- Tabs principais: Home, Mapa, Criar, Favoritos, Perfil.
- Tela inicial com logo e botões para login ou cadastro.
- Onboarding introdutório antes do uso principal.

### 2.3 Mapa
- Mapa interativo como tela central de descoberta.
- Exibição de marcadores com eventos próximos.
- Filtro por região com região inicial fixa.
- Estados de carregamento, erro e vazio.
- Suporte ao provedor Google Maps.

### 2.4 Criação de Eventos
- Formulário completo:
  - Título e descrição.
  - Artista / palestrante.
  - Link do ingresso.
  - Gênero musical e categoria.
  - Upload de imagem de capa.
  - Captura de localização atual via GPS.
- Regra de permissão:
  - CPF: evento sempre privado, sem toggle.
  - CNPJ: evento pode ser público ou privado.
- Publicação direta no Firestore via `firebase-events.ts`.

### 2.5 Favoritos e Interesse
- Listagem de eventos favoritados.
- Componente `EventCard` reutilizável.
- Propriedades obrigatórias: `id`, `title`, `location`, `date`, `description`.

### 2.6 Chat (ETAPA 27.2)
- Tela de chat criada, pronta para integração de conversas entre usuário e organizador.
- Estrutura prevista para troca de mensagens em tempo real.

---

## 3. Requisitos Não-Funcionais

- Performance:
  - Carregamento inicial reduzido com splash screen.
  - Mapa com indicador de carregamento e fallback de erro.
- Confiabilidade:
  - TypeScript strict mode ativado (`tsc --noEmit` deve passar).
  - Tratamento explícito de erros em integrações externas (Firebase, localização, seleção de imagem).
- Usabilidade:
  - Layout com tema escuro consistente (#0F0F11 / #1A1A1F).
  - Componentes reutilizáveis (`EventCard`, estilos globais de input).
- Segurança:
  - Autenticação via Firebase Auth com e-mail e senha.
  - Regra de negócio no front: CPF não cria eventos públicos.
- Manutenibilidade:
  - Separação por contextos e serviços (`firebase-events.ts`, `firebase-config.ts`, `AuthContext`).
  - Navegação por rotas agrupadas (`(auth)`, `(tabs)`).
- Plataforma:
  - Mobile-first com Expo/React Native.
  - Compatível com Android e iOS.

---

## 4. Arquitetura

### 4.1 Stack Tecnológico
- Framework: Expo SDK ~54 com TypeScript ~5.9.2.
- Navegação: Expo Router (rotas agrupadas).
- UI: React Native + NativeWind.
- Mapeamento: react-native-maps.
- Backend como serviço: Firebase (Auth + Firestore).
- Estado e dados: TanStack Query, Zustand.
- Validação: Zod.
- Outros: expo-image-picker, expo-location, AsyncStorage.

### 4.2 Estrutura do Projeto

```
app/
  (auth)/
    _layout.tsx
    login.tsx
    register.tsx
    register-cpf.tsx
    register-cnpj.tsx
  (tabs)/
    _layout.tsx
    index.tsx
    map.tsx
    create.tsx
    favorites.tsx
    profile.tsx
    chat.tsx
  _layout.tsx
  index.tsx
  onboarding.tsx

src/
  contexts/
    AuthContext.tsx
  services/
    firebase-config.ts
    events/
      firebase-events.ts
    users/
      firebase-users.ts
  hooks/
    useAuth.ts
    useFavorites.ts
  components/
    common/
      EventCard/
        index.tsx
  types/
    events.ts
    svg.d.ts
assets/
  icons/
    homeIcon.svg
    plusIcon.svg
    profileIcon.svg
    searchIcon.svg
    chatIcon.svg
    google_icon-G.svg
    IconHome.png
    IconPlus.png
    IconProfile.png
    IconSearch.png
    IconChat.png
  logos/
    logoendpass.png
  splash/
    icon.png
```

### 4.3 Fluxos Principais

- Onboarding → Home pública → Login/Cadastro.
- Cadastro → CPF ou CNPJ → modal de sucesso → Login.
- App autenticado → Tabs:
  - Home: mapa + overlay com pesquisa.
  - Mapa: marcadores e carregamento de dados.
  - Criar: formulário com regras CPF/CNPJ.
  - Favoritos: lista de eventos salvos.
  - Perfil: dados do usuário.

### 4.4 Integrações
- Firebase Firestore para armazenamento de eventos e perfis.
- Firebase Auth para criação e login de usuários.
- Expo Location para latitude e longitude do evento.
- Expo Image Picker para imagem de capa.

---

## 5. Design System

Cores:
- Background principal: `#0F0F11`
- Background secundário: `#1A1A1F`
- Brand: `#7B61FF`
- Erro: `#b91c1c`
- Texto principal: `#FFFFFF`
- Texto secundário: `#AAAAAA`
- Texto terciário: `#777`

Tipografia:
- Títulos: 32px, bold.
- Labels: 18px, bold.
- Corpo principal: 16px.
- Textos auxiliares: 13px a 14px.

Componentes comuns:
- Inputs: fundo `#1A1A1F`, padding 16, border-radius 12-16.
- Botões primários: fundo `#7B61FF`, padding 16-18, border-radius 12-16.
- Cards: mantêm estilo do `EventCard` com imagem, título, local, data e descrição.
- Toggle: visível apenas para perfis CNPJ no formulário de criação.

Ícones:
- Assets vetoriais e PNGs em `assets/icons/`.
- Em `_layout.tsx`, usados assets visuais (`IconHome.png`, `IconPlus.png`, `IconProfile.png`, `IconSearch.png`).

---

## 6. UML (Visão Textual)

### 6.1 Casos de Uso

- Usuário CPF:
  - Cadastrar-se
  - Login
  - Visualizar mapa
  - Favoritar eventos
  - Criar evento (sempre privado)
- Usuário CNPJ:
  - Cadastrar-se
  - Login
  - Visualizar mapa
  - Favoritar eventos
  - Criar evento (privado ou público)
  - Gerenciar eventos criados

### 6.2 Entidades Principais

- Event
  - id: string
  - title: string
  - description: string
  - image: string
  - category: string
  - genre: string
  - artist: string
  - ticketLink: string
  - latitude?: number
  - longitude?: number
  - date?: string
  - createdBy: string
  - privateEvent: boolean
  - interestedCount: number
  - createdAt: string

---

## 7. Referências Externas

- Eventbrite: referência de descoberta local e marketplace de ingressos.
- Sympla: referência de experiência brasileira com ingressos e descoberta.
- Shotgun: referência de descoberta musical, comunidade e recompensas.

Essas referências foram usadas para validar funcionalidades esperadas em apps de eventos e não para copiar produtos existentes.

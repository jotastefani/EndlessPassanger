# Documentação de Arquitetura - EndPass

Visão estrutural do projeto, com camadas, fluxo de dados, convenções e pontos de decisão técnica.

---

## 1. Visão Geral da Arquitetura

O EndPass adota uma arquitetura mobile-first baseada em rotas agrupadas, com separação entre camadas de apresentação, serviços e dados. O projeto é construído com Expo/React Native, Expo Router para navegação e Firebase como backend.

Princípios:
- Rotas agrupadas para separar fluxos autenticados e não autenticados.
- Contextos como fonte de verdade para estado de autenticação.
- Serviços especializados por domínio (eventos, usuários, configuração).
- Componentes visuais reutilizáveis.

---

## 2. Camadas da Aplicação

### 2.1 Camada de Apresentação

Responsável pela interface e interação com o usuário.

Estrutura:
- `app/`: rotas e telas.
  - `app/(auth)/`: fluxo público de autenticação.
  - `app/(tabs)/`: fluxo privado do usuário autenticado.
  - `app/index.tsx`: landing inicial.
  - `app/onboarding.tsx`: tela introdutória única.
- `src/components/common/`: componentes reutilizáveis (ex.: `EventCard`).

Responsabilidades:
- Renderização de layouts e estilos.
- Captura de entradas do usuário.
- Navegação via `router.push` e `router.replace`.

### 2.2 Camada de Estado e Contextos

Responsável por manter dados globais relevantes e hooks de consumo.

Arquivos principais:
- `src/contexts/AuthContext.tsx`
  - Expõe `useAuth()` com `user`, `signIn`, `signUp`.
  - Gerencia sessão do Firebase Auth.
- `src/hooks/useAuth.ts`
  - Wrapper/helper para uso do `AuthContext`.
- `src/hooks/useFavorites.ts`
  - Estado relacionado a favoritos.

Decisão:
- O estado de autenticação é centralizado em contexto, evitando prop drilling nas telas.

### 2.3 Camada de Serviços

Responsável por comunicação com backends e funcionalidades específicas.

Arquivos:
- `src/services/firebase-config.ts`
  - Inicializa Firebase e Auth.
  - Configura persistência com AsyncStorage.
- `src/services/auth/firebase-auth.ts`
  - Implementa login e cadastro.
- `src/services/events/firebase-events.ts`
  - Manipula coleção `events` no Firestore.
  - Faz tipagem explícita de documentos para o tipo `Event`.
- `src/services/users/firebase-users.ts`
  - Manipula perfis de usuário no Firestore.

Decisão:
- Serviços são funções assíncronas puras, sem dependência de UI.
- Tipagem explícita dos dados do Firestore evita `any` e melhora a manutenção.

### 2.4 Camada de Tipos

Responsável por contratos de dados usados entre camadas.

Arquivos:
- `src/types/events.ts`
  - Tipos principais: `Event`, filtros e estados relacionados.
- `src/types/svg.d.ts`
  - Declaração de módulo para importação de SVGs.

Decisão:
- TypeScript em modo estrito garante segurança de tipos em toda a stack.

---

## 3. Navegação

Estrutura baseada em rotas agrupadas do Expo Router:

- `app/(auth)/`: rotas públicas.
  - `login.tsx`
  - `register.tsx`
  - `register-cpf.tsx`
  - `register-cnpj.tsx`
- `app/(tabs)/`: rotas privadas.
  - `index.tsx` (Home)
  - `map.tsx`
  - `create.tsx`
  - `favorites.tsx`
  - `profile.tsx`
  - `chat.tsx`

Fluxo:
- Usuário não autenticado → `app/index.tsx` ou onboarding.
- Após login → `/(tabs)/index`.
- Cadastro CPF/CNPJ → modal de sucesso → login.

Decisão:
- Agrupamento por parênteses define separação clara entre fluxos sem afetar a URL pública das rotas.

---

## 4. Fluxo de Dados

### 4.1 Eventos

1. Tela acessa `src/services/events/firebase-events.ts`.
2. `getEvents()` lê a coleção `events`.
3. Dados são mapeados para objetos `Event`.
4. Tela aplica filtros visuais ou estados de loading/erro.

### 4.2 Usuário

1. Formulário de login/cadastro chama métodos do `AuthContext`.
2. `signUp()` persiste dados no Firebase Auth e, quando necessário, no Firestore.
3. `user` fica disponível via contexto para telas downstream.

---

## 5. Integrações Externas

- Firebase Auth
  - Provedor Email/Password.
  - Persistência com AsyncStorage.
- Firebase Firestore
  - Coleções:
    - `events`: eventos publicados.
    - `users`: perfis complementares.
- React Native Maps
  - Provider Google Maps.
  - Marcadores com coordenadas validadas.
- Expo Location
  - Permissão e captura de GPS atual.
- Expo Image Picker
  - Seleção de imagem da galeria.

---

## 6. Convenções e Padrões

- Estilos:
  - Tema escuro predominante.
  - Tokens de cor reutilizados por naming fixo.
- Rotas:
  - Navegação com `router.push` e `router.replace`.
  - Rotas organizadas por grupos funcionais.
- Erros:
  - Alertas globais para erros de integração.
  - Fallbacks visuais em telas de mapa e listas.
- Código:
  - Separação de arquivos por domínio.
  - Sem lógica de negócio em componentes de tela, sempre preferindo serviços.

---

## 7. Decisões Técnicas Relevantes

- Uso de `expo-router` para obter navegação type-safe e alinhada ao ecossistema Expo.
- Firebase escolhido pela velocidade de entrega no MVP e integração nativa com React Native.
- NativeWind incluído para acelerar estilos, sem obrigatoriedade de Tailwind em toda interface.
- `lucide-react-native` e assets visuais combinados para atender a ausência de alguns SVGs declarados.
- Tipagem explícita do Firestore para reduzir surpresas em runtime.

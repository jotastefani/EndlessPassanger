# Documentação de Telas - EndPass

Visão geral das telas implementadas no projeto, com objetivos, regras de negócio e dependências principais.

---

## 1. Tela Inicial

**Arquivo:** `app/index.tsx`

**Objetivo:** Apresentar a marca e dar acesso rápido ao fluxo de autenticação.

**Características:**
- Fundo escuro com logo centralizado.
- Botões para Login e Cadastro.
- Navegação para fluxo autenticado.

**Regras de negócio:**
- Sem pré-condições; pode ser acessada livremente.
- Redireciona para o fluxo de login ou cadastro conforme ação do usuário.

---

## 2. Onboarding

**Arquivo:** `app/onboarding.tsx`

**Objetivo:** Introduzir o usuário aos benefícios do app na primeira execução.

**Características:**
- Exibição de texto introdutório.
- Botão "Continuar".
- Marcação em AsyncStorage para não repetir a exibição.

**Regras de negócio:**
- Após tocar em "Continuar", o usuário é enviado para as tabs principais.
- O estado do onboarding é persistido localmente e não é exibido novamente.

---

## 3. Autenticação

### 3.1 Login

**Arquivo:** `app/(auth)/login.tsx`

**Objetivo:** Permitir acesso a usuários já cadastrados.

**Características:**
- Campos de e-mail e senha.
- Botão de login.
- Link para criação de conta.

**Regras de negócio:**
- Utiliza `signIn()` do `AuthContext`.
- Em caso de falha, exibe alerta de login inválido.
- Após sucesso, navega para `/(tabs)`.

**Pendência / observação:**
- Para contas CNPJ, lembrar que o Firebase precisa ter Email/Password habilitado.

### 3.2 Cadastro

**Arquivo:** `app/(auth)/register.tsx`

**Objetivo:** Encaminhar o usuário para o tipo de conta desejado.

**Características:**
- Opção entre Conta CPF e Conta CNPJ.
- Nenhum campo de formulário nesta tela; apenas escolha do tipo.

**Regras de negócio:**
- CPF e CNPJ têm fluxos totalmente separados.
- Redirecionamentos feitos via `router.push`.

### 3.3 Cadastro CPF

**Arquivo:** `app/(auth)/register-cpf.tsx`

**Objetivo:** Criar conta de pessoa física.

**Características:**
- Campos: nome completo, CPF, e-mail, senha.
- Modal de sucesso após cadastro.
- Opção de ir para login.

**Regras de negócio:**
- `signUp()` recebe objeto `{ name, cpf, email, password, type: 'CPF' }`.
- Eventos criados por CPF são sempre privados.
- Não depende de dados adicionais de organização.

### 3.4 Cadastro CNPJ

**Arquivo:** `app/(auth)/register-cnpj.tsx`

**Objetivo:** Criar conta de pessoa jurídica/organizador.

**Características:**
- Campos: nome da empresa, CNPJ, e-mail, senha.
- Modal de sucesso após criação de conta e perfil.
- Opção de ir para login.

**Regras de negócio:**
- `signUp()` recebe objeto `{ companyName, cnpj, email, password, type: 'CNPJ' }`.
- Após criar o usuário no Firebase Auth, cria o perfil com `accountType: 'CNPJ'`.
- Usuário CNPJ pode criar eventos públicos ou privados.

**Pendência / observação:**
- Para o fluxo completo funcionar, habilitar Email/Password no Firebase Auth.

---

## 4. Tabs Principais

### 4.1 Home

**Arquivo:** `app/(tabs)/index.tsx`

**Objetivo:** Servir como ponto central de descoberta de eventos.

**Características:**
- Mapa em tela cheia como base visual.
- Overlay com título, subtítulo e campo de busca.
- Visual escuro consistente com o tema do app.

**Regras de negócio:**
- Usuário deve estar autenticado.
- Busca não está implementada ainda; entrada de texto é placeholder.

### 4.2 Mapa

**Arquivo:** `app/(tabs)/map.tsx`

**Objetivo:** Permitir exploração visual de eventos por localização.

**Características:**
- `MapView` com marcadores.
- Estados de loading, erro e vazio tratados explicitamente.
- `PROVIDER_GOOGLE` configurado.

**Regras de negócio:**
- Evento só aparece se tiver latitude e longitude válidas.
- Região inicial fixa usada como fallback.
- Dados carregados do Firestore via `getEvents()`.

### 4.3 Criar Evento

**Arquivo:** `app/(tabs)/create.tsx`

**Objetivo:** Permitir criação completa de eventos.

**Características:**
- Seleção de imagem de capa.
- Campos de título, descrição, artista/palestrante e link do ingresso.
- Seleção de gênero musical e categoria.
- Captura de localização atual via GPS.
- Ícone ou feedback de permissão por tipo de conta.

**Regras de negócio:**
- Usuário autenticado obrigatório.
- CPF: evento sempre privado, sem toggle.
- CNPJ: pode alternar entre público e privado.
- Usuário sem tipo `user?.type` ainda tem acesso ao toggle, com estado padrão `false`.

### 4.4 Favoritos

**Arquivo:** `app/(tabs)/favorites.tsx`

**Objetivo:** Listar eventos salvos pelo usuário.

**Características:**
- `FlatList` com `EventCard`.
- Dados vindos do hook `useFavorites`.

**Regras de negócio:**
- Usuário autenticado obrigatório.
- Cada card exibe os dados mínimos do evento.

### 4.5 Perfil

**Arquivo:** `app/(tabs)/profile.tsx`

**Objetivo:** Mostrar dados da conta e opções de navegação relacionadas ao usuário.

---

## 5. Componentes Compartilhados

### 5.1 EventCard

**Arquivo:** `src/components/common/EventCard/index.tsx`

**Objetivo:** Apresentar um evento no formato padrão do app.

**Props obrigatórias:**
- `id`, `title`, `location`, `date`, `description`.

**Uso:**
- Favoritos.
- Pode ser reutilizado em listas futuras de mapas, chats e perfil.

---

## 6. Serviços

### 6.1 Autenticação

**Arquivo:** `src/services/auth/firebase-auth.ts`

**Responsabilidades:**
- Integração com Firebase Auth.
- `signIn(email, password)`: login.
- `signUp(data)`: criação de conta, recebendo objeto tipado com tipo de conta.

### 6.2 Eventos

**Arquivo:** `src/services/events/firebase-events.ts`

**Responsabilidades:**
- `getEvents()`: retorna lista tipada de eventos.
- `createEvent(eventData)`: cria novo documento no Firestore.

### 6.3 Usuários

**Arquivo:** `src/services/users/firebase-users.ts`

**Responsabilidades:**
- Persistência do perfil do usuário.
- Campos comuns: uid, email, accountType, avatar, bio, phone, timestamps.

### 6.4 Firebase Config

**Arquivo:** `src/services/firebase-config.ts`

**Responsabilidades:**
- Inicialização do app Firebase.
- Inicialização do Auth com persistência via AsyncStorage.

---

## 7. Contextos e Hooks

- `src/contexts/AuthContext.tsx`: expõe `useAuth` com `signIn`, `signUp` e `user`.
- `src/hooks/useAuth.ts`: wrapper/helper para uso do contexto.
- `src/hooks/useFavorites.ts`: estado local/grid de eventos favoritos.

---

## 8. Regras de Negócio Resumidas

- Contas CPF criam apenas eventos privados.
- Contas CNPJ podem escolher entre público e privado.
- Evento precisa de localização válida para aparecer no mapa.
- Dados sensíveis (senha, tokens) não são armazenados no Firestore.
- Onboarding é exibido apenas uma vez.

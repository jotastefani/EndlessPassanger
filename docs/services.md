# Serviços e APIs - EndPass

Documentação das integrações e contratos de dados utilizados pelo app, com foco em como as camadas se comunicam e quais endpoints ou coleções são consumidos.

---

## 1. Firebase Config

Arquivo: `src/services/firebase-config.ts`

Responsabilidades:
- Inicializar o app Firebase.
- Inicializar a camada de autenticação com persistência via AsyncStorage.
- Exportar instâncias reutilizáveis:
  - `app`
  - `auth`
  - `db`

Decisão:
- `getReactNativePersistence` não é usado diretamente; a inicialização é feita com objeto compatível com `Persistence` apoiado em AsyncStorage para manter funcionamento com a versão instalada do Firebase.

---

## 2. Autenticação

Arquivo: `src/services/auth/firebase-auth.ts`

Contrato principal:
- Entrada: dados de login ou cadastro.
- Saída: sucesso ou falha da operação.
- Efeito colateral: criação de usuário no Firebase Auth e, quando aplicável, atualização do perfil no Firestore.

Fluxos:
- Login:
  - Entrada: `email`, `password`
  - Saída: booleano indicando sucesso.
- Cadastro:
  - Entrada: objeto com dados do usuário e `type: 'CPF' | 'CNPJ'`.
  - Saída: booleano indicando sucesso.

Requisitos:
- Provedor Email/Password habilitado no Firebase Console.
- Tratamento de erro voltado para feedback ao usuário no front.

---

## 3. Eventos

Arquivo: `src/services/events/firebase-events.ts`

Coleção principal:
- `events`

Contratos:
- `getEvents(): Promise<Event[]>`
  - Recupera todos os eventos da coleção.
  - Retorna objetos tipados com id e campos do tipo `Event`.
  - Em caso de erro, retorna array vazio.

- `createEvent(eventData): Promise<string | null>`
  - Cria novo documento em `events`.
  - Retorna `id` do documento criado ou `null` em falha.

Campos relevantes do evento:
- `title`
- `description`
- `image`
- `category`
- `genre`
- `artist`
- `ticketLink`
- `latitude`
- `longitude`
- `date`
- `privateEvent`
- `interestedCount`
- `createdAt`

Observação:
- Latitude e longitude não são obrigatórios no armazenamento, mas são necessários para que o evento apareça no mapa.

---

## 4. Usuários

Arquivo: `src/services/users/firebase-users.ts`

Coleção principal:
- `users`

Responsabilidades:
- Persistir dados complementares do usuário depois do cadastro no Firebase Auth.
- Armazenar campos organizacionais quando o tipo de conta for CNPJ.

Campos comuns do perfil:
- `uid`
- `email`
- `accountType`
- `avatar`
- `bio`
- `phone`
- `createdAt`

Decisão:
- Dados sensíveis não são replicados no Firestore.
- Informações específicas de CNPJ são separadas em campos próprios do perfil.

---

## 5. Tipos e Contratos

Arquivo: `src/types/events.ts`

Objetivo:
- Garantir contrato forte entre telas e serviços.
- Evitar uso de `any` em pontos críticos.

Uso:
- `Event` é usado em leitura de eventos e em componentes como `EventCard`.
- Qualquer alteração nos campos do evento deve ser refletida primeiro no tipo.

---

## 6. Regras de Integração

- Toda escrita deve passar por serviço, não diretamente pelo Firestore em tela.
- Toda leitura deve retornar tipos conhecidos pelo front.
- Erros devem ser convertidos em mensagens amigáveis antes de chegar ao usuário.

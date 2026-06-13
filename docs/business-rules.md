# Regras de Negócio - EndPass

Documentação das regras principais que regem o comportamento do app, com base no fluxo atual, nas telas já implementadas e nos documentos já produzidos.

---

## 1. Identidade e Perfis

- O app diferencia usuários por tipo de conta:
  - CPF: pessoa física padrão.
  - CNPJ: organizador/empresa.
- O tipo da conta é definido no cadastro e guia regras específicas no fluxo de criação de eventos.
- A escolha CPF x CNPJ é feita em tela única de seleção antes do formulário de dados.

---

## 2. Cadastro e Autenticação

- Cadastro CPF exige:
  - Nome completo
  - CPF
  - E-mail
  - Senha
- Cadastro CNPJ exige:
  - Nome da empresa
  - CNPJ
  - E-mail
  - Senha
- Após cadastro, um modal de sucesso é exibido antes do redirecionamento para login.
- O login é feito apenas com e-mail e senha.
- Email/Password precisa estar habilitado no Firebase Auth para que contas CNPJ sejam criadas sem erro administrativo.

---

## 3. Regras por Tipo de Conta

### 3.1 Conta CPF

- Pode criar eventos, mas apenas como **privado**.
- Não pode alterar a visibilidade do evento.
- UI de criação exibe informação fixa de evento privado, sem toggle.
- Pode visualizar mapa, favoritar eventos e interagir com a plataforma como participante.

### 3.2 Conta CNPJ

- Pode criar eventos **públicos** ou **privados**.
- Pode alternar a visibilidade no momento da criação.
- Assume-se que também terá acesso a funcionalidades futuras de gestão de eventos.

---

## 4. Criação de Eventos

Campos obrigatórios mínimos:
- Título
- Descrição
- Categoria
- Gênero musical

Campos adicionais:
- Artista/Palestrante
- Link do ingresso
- Imagem de capa
- Localização atual via GPS

Regras:
- Eventos sem latitude/longitude válidas não aparecem no mapa.
- O usuário autenticado é obrigatório para acessar `/tabs/create`.
- CPF força `privateEvent` como `true`.
- CNPJ respeita a escolha do usuário no toggle.

---

## 5. Mapa

- A tela inicial do app autenticado usa mapa como experiência principal.
- Marcadores são exibidos por eventos com coordenadas válidas.
- Eventos sem coordenadas válidas não geram marcador e podem exibir estado vazio.
- O app trata explicitamente carregamento, erro e ausência de dados.

---

## 6. Favoritos

- Usuário pode favoritar eventos visualizados no app.
- A listagem de favoritos usa componente `EventCard` padronizado.
- Integração entre lista e componente depende de props consistentes:
  - `id`
  - `title`
  - `location`
  - `date`
  - `description`

---

## 7. Onboarding

- Exibido uma única vez por instalação.
- Estado salvo em AsyncStorage.
- Após confirmação, usuário é levado para fluxo principal.

---

## 8. Restrições e Bloqueios Conhecidos

- Para contas CNPJ, o Firebase precisa ter o provedor Email/Password habilitado; caso contrário o cadastro retorna erro administrativo.
- Assets ausentes devem ser substituídos por alternativas já presentes no projeto para evitar falhas em tempo de build.
- O app usa versões específicas do Expo e React Native; alterar majoritariamente essas versões exige validação dos módulos de navegação e dependências nativas.

---

## 9. Validações Planejadas ou Futuras

- Validação de formato de CPF e CNPJ antes do envio do formulário.
- Validação de link de ingresso como URL válida.
- Limite de tamanho e tipo de imagem na seleção de capa.
- Impedimento de criação de eventos duplicados em intervalo curto.
- Validação de sessão expirada e redirecionamento automático para login.

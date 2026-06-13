# EndPass

Aplicativo de eventos em tempo real com login, mapa e criação de eventos. Construído com Expo, React Native, Firebase e React Native Maps.

## Requisitos

- Node.js
- npm ou yarn
- Expo Go ou build de desenvolvimento
- Projeto Firebase com Auth e Firestore habilitados

## Como rodar

1. Instale as dependências:
```bash
npm install
```

2. Inicie o projeto:
```bash
npx expo start
```

3. Abra no Expo Go (Android/iOS) ou em um emulador configurado.

## Estrutura do projeto

- `app/`: rotas públicas e protegidas, tabs e fluxos principais.
- `src/`: contextos, serviços, hooks e componentes reutilizáveis.
- `assets/`: imagens e ícones do app.

## Funcionalidades principais

- Onboarding e fluxo de login/cadastro (CPF e CNPJ).
- Mapa com eventos e marcadores.
- Criação de eventos com imagem, localização e regras de visibilidade.
- Favoritos e componente de card padronizado.

## Documentação adicional

- `docs/vision.md`
- `docs/screens.md`
- `docs/architecture.md`
- `docs/business-rules.md`
- `docs/services.md`
- `docs/quality.md`
- `docs/deploy.md`

## Observações

- Email/Password precisa estar habilitado no Firebase Auth.
- O app usa tema escuro e assets visuais para abas e cards.

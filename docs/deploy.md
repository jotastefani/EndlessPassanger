# Deploy e Infraestrutura - EndPass

Documentação das etapas necessárias para publicar, rodar e manter o aplicativo em ambiente de desenvolvimento e produção.

---

## 1. Ambientes

Atualmente o projeto está em fase de validação acadêmica/protótipo funcional. Não há separação formal entre staging e production, mas recomenda-se manter:
- Ambiente local para desenvolvimento.
- Firebase com projeto exclusivo para desenvolvimento, antes de migrar para produção.

---

## 2. Execução Local

Comandos principais:
- Instalar dependências:
```bash
npm install
```
- Rodar o app:
```bash
npx expo start
```
- Rodar Android:
```bash
npm run android
```
- Rodar iOS:
```bash
npm run ios
```
- Rodar web:
```bash
npm run web
```

Pré-requisitos:
- Expo Go ou build de desenvolvimento instalada no dispositivo.
- Node.js atualizado.
- Dependências nativas instaladas, quando necessário.

---

## 3. Configuração do Firebase

Passos obrigatórios:
1. Criar projeto no Firebase Console.
2. Ativar Authentication > Sign-in method > Email/Password.
3. Criar Firestore Database.
4. Copiar credenciais e configurar em `src/services/firebase-config.ts`.
5. Verificar regras de segurança do Firestore para evitar acesso excessivo.

Observações:
- Sem Email/Password habilitado, contas CNPJ falham com erro administrativo.
- Em produção, usar regras mais restritivas e separar coleções por ambiente quando necessário.

---

## 4. Build e Publicação

### 4.1 Expo Application Services (EAS)

Recomenda-se usar EAS Build quando o app sair de fase de prototipação.

Pré-requisitos:
- Conta Expo.
- CLI do Expo configurada (`eas login`).

Comandos:
- Build para Android:
```bash
eas build --platform android --profile preview
```
- Build para iOS:
```bash
eas build --platform ios --profile preview
```

Perfis recomendados:
- preview: builds internas para validação.
- production: builds para loja.

### 4.2 Google Maps Android

O app usa `react-native-maps` com provedor Google no Android.
Para builds públicas:
- Configurar chave de API do Google Maps no `AndroidManifest.xml`.
- Habilitar Maps SDK for Android.
- Restringir a chave por pacote e fingerprint quando possível.

---

## 5. Monitoramento e Operação

- Usar logs do Firebase para Auth e Firestore.
- Monitorar erros em telas críticas:
  - login/cadastro
  - mapa
  - criação de eventos
- Alertas importantes:
  - quota de Firestore
  - erros repetidos de autenticação

Sugestões futuras:
- Integração com ferramenta de crash reporting.
- Métricas de sessão e início do fluxo.

---

## 6. Checklist de Release Sugerido

- [ ] `npm run lint` passa
- [ ] `npx tsc --noEmit` passa
- [ ] Credenciais do Firebase configuradas para o ambiente correto
- [ ] Regras do Firestore revisadas para produção
- [ ] Chave do Google Maps configurada para Android
- [ ] Chave do Google Maps configurada para iOS, quando aplicável
- [ ] Teste de fluxo completo: onboarding, login, criação e mapa
- [ ] Validação de CPF e CNPJ se necessário antes do deploy

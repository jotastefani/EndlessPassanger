# Qualidade e Validação - EndPass

Documentação dos controles de qualidade, verificações recomendadas e critérios usados para considerar o projeto em estado utilizável.

---

## 1. Verificações Obrigatórias

Antes de considerar uma alteração concluída, rodar:

- `npm run lint`
  - Verifica regras do ESLint configuradas no projeto.
- `npx tsc --noEmit`
  - Verifica conformidade TypeScript sem gerar bundle.

Critério mínimo:
- Comando `lint` deve finalizar sem erros.
- Comando `tsc --noEmit` deve finalizar sem erros.

---

## 2. Regras de Código Aplicadas

- TypeScript strict ativo.
- Tipagem explícita em integrações com Firebase.
- Sem uso de `any` em fluxos principais.
- Serviços separados de telas.
- Estados de loading e erro tratados nas telas de dados remotos.

---

## 3. Critérios de Revisão

- Alteração respeita regras de negócio (CPF sempre privado, CNPJ pública/privada).
- Assets referenciados existem ou possuem fallback declarado.
- Comportamento do app não é quebrado por ajustes de estilo.
- Navegação mantém fluxos autenticados e públicos separados.

---

## 4. Problemas Conhecidos e Obstruções

- Cadastros CNPJ exigem Email/Password habilitado no Firebase.
- Rollbacks manuais são preferíveis a refactors emergenciais quando apenas uma linha quebra.
- Regressões em `tsconfig`/declarações devem ser documentadas e reavaliadas antes do merge.

---

## 5. Recomendações Futuras

- Adicionar testes unitários para serviços de autenticação e eventos.
- Criar um script de checagem rápida que rode `lint` e `tsc` juntos.
- Automatizar bloqueio de merge quando verificações falharem.

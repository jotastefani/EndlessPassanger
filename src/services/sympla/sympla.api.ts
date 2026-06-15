import axios from 'axios';

const SYMPLA_TOKEN =
  process.env.EXPO_PUBLIC_SYMPLA_TOKEN;

if (!SYMPLA_TOKEN) {
  console.log(
    '[SYMPLA DEBUG] Token não encontrado. Verifique EXPO_PUBLIC_SYMPLA_TOKEN no arquivo .env'
  );
}

export const symplaApi = axios.create({
  baseURL: 'https://api.sympla.com.br/public/v3',

  timeout: 15000,

  headers: {
    s_token: SYMPLA_TOKEN || '',
  },
});
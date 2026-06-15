import axios from 'axios';

const SYMPLA_TOKEN =
  process.env.EXPO_PUBLIC_SYMPLA_TOKEN;

export const symplaApi = axios.create({
  baseURL: 'https://api.sympla.com.br/public/v3',

  headers: {
    s_token: SYMPLA_TOKEN,
  },
});
import axios from 'axios';

const TICKETMASTER_API_KEY =
  process.env.EXPO_PUBLIC_TICKETMASTER_API_KEY;

if (!TICKETMASTER_API_KEY) {
  console.log(
    '[TICKETMASTER DEBUG] API Key não encontrada. Verifique EXPO_PUBLIC_TICKETMASTER_API_KEY no arquivo .env'
  );
}

export const ticketmasterApi = axios.create({
  baseURL: 'https://app.ticketmaster.com/discovery/v2',

  timeout: 15000,

  params: {
    apikey: TICKETMASTER_API_KEY,
  },
});
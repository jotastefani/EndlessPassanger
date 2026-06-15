import axios from 'axios';

import { symplaApi } from './sympla.api';

import {
  SymplaEvent,
} from './sympla-types';

export type SymplaMapEvent = {
  id: string;

  title: string;

  description: string;

  date: string;

  location: string;

  ticketLink?: string;

  latitude: number;

  longitude: number;

  source: 'SYMPLA';
};

function getFallbackCoordinate(
  index: number
) {
  const baseLatitude = -22.7338;
  const baseLongitude = -47.6476;

  return {
    latitude:
      baseLatitude + index * 0.004,

    longitude:
      baseLongitude + index * 0.004,
  };
}

function toNumber(
  value: unknown
): number | null {
  const numberValue =
    Number(value);

  if (
    Number.isNaN(numberValue) ||
    !Number.isFinite(numberValue)
  ) {
    return null;
  }

  return numberValue;
}

function normalizeSymplaEvent(
  event: SymplaEvent,
  index: number
): SymplaMapEvent {
  const fallback =
    getFallbackCoordinate(index);

  const eventData =
    event as any;

  const latitude =
    toNumber(eventData.latitude) ??
    toNumber(eventData.lat) ??
    toNumber(eventData.address?.latitude) ??
    toNumber(eventData.address?.lat) ??
    fallback.latitude;

  const longitude =
    toNumber(eventData.longitude) ??
    toNumber(eventData.lon) ??
    toNumber(eventData.lng) ??
    toNumber(eventData.address?.longitude) ??
    toNumber(eventData.address?.lon) ??
    toNumber(eventData.address?.lng) ??
    fallback.longitude;

  const city =
    event.address?.city || '';

  const state =
    event.address?.state || '';

  const address =
    event.address?.address || '';

  const addressName =
    event.address?.name || '';

  const location =
    city && state
      ? `${city} - ${state}`
      : address ||
        addressName ||
        'Local não informado';

  return {
    id:
      String(event.id),

    title:
      event.name ||
      'Evento Sympla',

    description:
      event.detail ||
      'Evento disponível na Sympla',

    date:
      event.start_date ||
      'Data não informada',

    location,

    ticketLink:
      event.url,

    latitude,

    longitude,

    source:
      'SYMPLA',
  };
}

export async function getSymplaEvents(): Promise<SymplaMapEvent[]> {
  try {
    console.log(
      '[SYMPLA DEBUG] Token carregado:',
      process.env.EXPO_PUBLIC_SYMPLA_TOKEN
        ? 'SIM'
        : 'NÃO'
    );

    const response =
      await symplaApi.get('/events');

    console.log(
      '[SYMPLA DEBUG] Status:',
      response.status
    );

    console.log(
      '[SYMPLA DEBUG] Chaves do retorno:',
      Object.keys(response.data || {})
    );

    console.log(
      '[SYMPLA DEBUG] Retorno parcial:',
      JSON.stringify(response.data).slice(
        0,
        1000
      )
    );

    const rawEvents =
      Array.isArray(response.data?.data)
        ? response.data.data
        : Array.isArray(response.data?.events)
          ? response.data.events
          : Array.isArray(response.data)
            ? response.data
            : [];

    console.log(
      '[SYMPLA DEBUG] Quantidade bruta de eventos:',
      rawEvents.length
    );

    return rawEvents.map(
      normalizeSymplaEvent
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(
        '[SYMPLA DEBUG] Erro Axios status:',
        error.response?.status
      );

      console.log(
        '[SYMPLA DEBUG] Erro Axios data:',
        JSON.stringify(
          error.response?.data
        )
      );

      console.log(
        '[SYMPLA DEBUG] Erro Axios message:',
        error.message
      );
    } else {
      console.log(
        '[SYMPLA DEBUG] Erro desconhecido:',
        error
      );
    }

    return [];
  }
}
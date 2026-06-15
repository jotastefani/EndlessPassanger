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

function normalizeSymplaEvent(
  event: SymplaEvent,
  index: number
): SymplaMapEvent {
  const fallback =
    getFallbackCoordinate(index);

  const latitude =
    event.address?.lat ||
    event.address?.latitude ||
    fallback.latitude;

  const longitude =
    event.address?.lon ||
    event.address?.longitude ||
    fallback.longitude;

  const city =
    event.address?.city || '';

  const state =
    event.address?.state || '';

  const address =
    event.address?.address || '';

  const location =
    city && state
      ? `${city} - ${state}`
      : address || 'Local não informado';

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
    const response =
      await symplaApi.get('/events');

    const rawEvents: SymplaEvent[] =
      response.data?.data || [];

    return rawEvents.map(
      normalizeSymplaEvent
    );
  } catch (error) {
    console.log(
      'Erro ao buscar eventos da Sympla:',
      error
    );

    return [];
  }
}
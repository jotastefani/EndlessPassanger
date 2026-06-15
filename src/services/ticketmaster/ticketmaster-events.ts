import axios from 'axios';

import { ticketmasterApi } from './ticketmaster.api';

import {
    TicketmasterEvent,
    TicketmasterResponse,
} from './ticketmaster-types';

export type TicketmasterMapEvent = {
  id: string;

  title: string;

  description: string;

  date: string;

  location: string;

  ticketLink?: string;

  image?: string;

  latitude: number;

  longitude: number;

  source: 'TICKETMASTER';
};

function getFallbackCoordinate(
  index: number
) {
  const baseLatitude = -23.5505;
  const baseLongitude = -46.6333;

  return {
    latitude:
      baseLatitude + index * 0.01,

    longitude:
      baseLongitude + index * 0.01,
  };
}

function toNumber(
  value: unknown
): number | null {
  const numberValue = Number(value);

  if (
    Number.isNaN(numberValue) ||
    !Number.isFinite(numberValue)
  ) {
    return null;
  }

  return numberValue;
}

function getBestImage(
  event: TicketmasterEvent
) {
  if (!event.images?.length) {
    return undefined;
  }

  const sortedImages =
    [...event.images].sort(
      (a, b) =>
        (b.width || 0) -
        (a.width || 0)
    );

  return sortedImages[0]?.url;
}

function normalizeTicketmasterEvent(
  event: TicketmasterEvent,
  index: number
): TicketmasterMapEvent {
  const venue =
    event._embedded?.venues?.[0];

  const fallback =
    getFallbackCoordinate(index);

  const latitude =
    toNumber(
      venue?.location?.latitude
    ) ?? fallback.latitude;

  const longitude =
    toNumber(
      venue?.location?.longitude
    ) ?? fallback.longitude;

  const city =
    venue?.city?.name || '';

  const state =
    venue?.state?.stateCode ||
    venue?.state?.name ||
    '';

  const venueName =
    venue?.name || '';

  const address =
    venue?.address?.line1 || '';

  const location =
    venueName && city
      ? `${venueName} - ${city}${state ? `/${state}` : ''}`
      : city
        ? `${city}${state ? `/${state}` : ''}`
        : address || 'Local não informado';

  const localDate =
    event.dates?.start?.localDate ||
    '';

  const localTime =
    event.dates?.start?.localTime ||
    '';

  const date =
    localDate && localTime
      ? `${localDate} às ${localTime}`
      : localDate ||
        event.dates?.start?.dateTime ||
        'Data não informada';

  const classification =
    event.classifications?.[0];

  const genre =
    classification?.genre?.name ||
    classification?.segment?.name ||
    'Evento';

  return {
    id:
      event.id ||
      String(index),

    title:
      event.name ||
      'Evento Ticketmaster',

    description:
      genre,

    date,

    location,

    ticketLink:
      event.url,

    image:
      getBestImage(event),

    latitude,

    longitude,

    source:
      'TICKETMASTER',
  };
}

type GetTicketmasterEventsParams = {
  keyword?: string;

  countryCode?: string;

  size?: number;
};

export async function getTicketmasterEvents({
  keyword = '',
  countryCode = 'BR',
  size = 50,
}: GetTicketmasterEventsParams = {}): Promise<TicketmasterMapEvent[]> {
  try {
    console.log(
      '[TICKETMASTER DEBUG] API Key carregada:',
      process.env.EXPO_PUBLIC_TICKETMASTER_API_KEY
        ? 'SIM'
        : 'NÃO'
    );

    const response =
      await ticketmasterApi.get<TicketmasterResponse>(
        '/events.json',
        {
          params: {
            keyword:
              keyword || undefined,

            countryCode,

            size,
          },
        }
      );

    console.log(
      '[TICKETMASTER DEBUG] Status:',
      response.status
    );

    console.log(
      '[TICKETMASTER DEBUG] Total informado:',
      response.data.page?.totalElements
    );

    const rawEvents =
      response.data._embedded?.events || [];

    console.log(
      '[TICKETMASTER DEBUG] Quantidade carregada:',
      rawEvents.length
    );

    return rawEvents.map(
      normalizeTicketmasterEvent
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(
        '[TICKETMASTER DEBUG] Erro status:',
        error.response?.status
      );

      console.log(
        '[TICKETMASTER DEBUG] Erro data:',
        JSON.stringify(
          error.response?.data
        )
      );

      console.log(
        '[TICKETMASTER DEBUG] Erro message:',
        error.message
      );
    } else {
      console.log(
        '[TICKETMASTER DEBUG] Erro desconhecido:',
        error
      );
    }

    return [];
  }
}
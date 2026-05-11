export type EventCategory =
  | 'Festa'
  | 'Bar'
  | 'Show'
  | 'Teatro'
  | 'Palestra'
  | 'Privado';

export type MusicGenre =
  | 'Sertanejo'
  | 'Funk'
  | 'Pagode'
  | 'Eletrônica'
  | 'Rock'
  | 'Trap'
  | 'Rap'
  | 'Pop';

export type EventType =
  | 'PUBLIC'
  | 'PRIVATE';

export type Event = {
  id: string;

  title: string;

  description: string;

  image: string;

  category: EventCategory;

  genre?: MusicGenre;

  artist?: string;

  ticketLink?: string;

  type: EventType;

  latitude: number;

  longitude: number;

  date: string;

  createdBy: string;

  interestedCount: number;
};
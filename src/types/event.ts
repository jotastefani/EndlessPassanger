export type EventSource = 'FIRESTORE' | 'SYMPLA';

export type EventCategory =
  | 'Festa'
  | 'Show'
  | 'Teatro'
  | 'Palestra'
  | 'Festival'
  | 'Stand-up'
  | 'Privado';

export type MusicGenre =
  | 'Sertanejo'
  | 'Funk'
  | 'Pagode'
  | 'Eletrônica'
  | 'Rock'
  | 'Trap'
  | 'Rap'
  | 'Pop'
  | 'Stand-up'
  | 'Outro';

export type AppEvent = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  location?: string;
  date?: string;
  category?: EventCategory | string;
  genre?: MusicGenre | string;
  artist?: string;
  ticketLink?: string;
  latitude: number;
  longitude: number;
  interestedCount: number;
  privateEvent: boolean;
  premiumEvent?: boolean;
  source: EventSource;
};
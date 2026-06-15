export type TicketmasterImage = {
  url?: string;

  width?: number;

  height?: number;
};

export type TicketmasterVenue = {
  id?: string;

  name?: string;

  city?: {
    name?: string;
  };

  state?: {
    name?: string;

    stateCode?: string;
  };

  country?: {
    name?: string;

    countryCode?: string;
  };

  address?: {
    line1?: string;
  };

  location?: {
    latitude?: string;

    longitude?: string;
  };
};

export type TicketmasterEvent = {
  id?: string;

  name?: string;

  url?: string;

  images?: TicketmasterImage[];

  dates?: {
    start?: {
      localDate?: string;

      localTime?: string;

      dateTime?: string;
    };
  };

  classifications?: Array<{
    segment?: {
      name?: string;
    };

    genre?: {
      name?: string;
    };

    subGenre?: {
      name?: string;
    };
  }>;

  _embedded?: {
    venues?: TicketmasterVenue[];
  };
};

export type TicketmasterResponse = {
  _embedded?: {
    events?: TicketmasterEvent[];
  };

  page?: {
    size?: number;

    totalElements?: number;

    totalPages?: number;

    number?: number;
  };
};
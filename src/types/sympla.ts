export type SymplaEvent = {
  id: number | string;
  name?: string;
  detail?: string;
  start_date?: string;
  end_date?: string;
  url?: string;
  image?: string;
  address?: {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    lat?: number;
    lon?: number;
  };
};
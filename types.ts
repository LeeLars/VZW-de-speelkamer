
export enum ActivityType {
  CAMP = 'CAMP',
  FREE_DAY = 'FREE_DAY',
  STUDY = 'STUDY'
}

export interface Activity {
  id: string;
  title: string; // e.g. "Herfstkamp: De Ruimte" or "Pedagogische studiedag"
  type: ActivityType;
  category?: string; // e.g. "Pedagogische studiedag", "Facultatieve vrije dag", "Brugdag"
  startDate: string; // ISO string YYYY-MM-DD
  endDate?: string; // ISO string YYYY-MM-DD
  locationId: string;
  hours: string; // e.g. "08:00 - 18:00"
  price: string; // e.g. "€15 halve dag / €25 volle dag"
  description: string;
  googleFormUrl: string;
  imageUrl?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  googleMapsUrl: string;
  description: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  locationIds: string[];
  imageUrl?: string; // Optional, fallback to placeholder
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  content: string;
}

export interface Pricing {
  standardRate: number; // Cost per half hour (e.g., 1.20)
  noonRate: number;     // Cost per noon session (e.g., 1.60)
}

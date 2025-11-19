
import { Activity, ActivityType, Location, TeamMember, NewsItem, Pricing } from './types';

export const COLORS = {
  mint: '#B8D7A3',
  yellow: '#F0E471',
  pink: '#EF9294',
  teal: '#4AB1C4',
  rose: '#E6C3D1',
  slate: '#A0ABBC',
  orange: '#F2A55A',
};

export const INITIAL_PRICING: Pricing = {
  standardRate: 1.20,
  noonRate: 1.60
};

// --- LOCATIES ---
// Placeholder beelden van Unsplash zodat de site er meteen goed uitziet.
export const INITIAL_LOCATIONS: Location[] = [
  {
    id: 'loc1',
    name: 'VBS De Frères',
    address: 'Nieuwstraat 2, 8000 Brugge',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nieuwstraat+2+8000+Brugge',
    description: 'Onze hoofdlocatie gelegen in het hartje van Brugge, verbonden aan VBS De Frères.',
    // Image: School Building / Historic
    image: '/images/VBS-De-freres.png'
  },
  {
    id: 'loc2',
    name: 'Sint-Andreas',
    address: 'Gentpoortstraat 1, 8000 Brugge',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gentpoortstraat+1+8000+Brugge',
    description: 'Een gezellige locatie met veel speelruimte, vlakbij de Gentpoort.',
    // Image: Playground
    image: '/images/VBS-sint-andreas.png'
  },
  {
    id: 'loc3',
    name: 'Het Kleurenpalet',
    address: 'Groenestraat 27, 8000 Brugge',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Groenestraat+27+8000+Brugge',
    description: 'Onze locatie met focus op creativiteit en buiten spelen.',
    // Image: Creative Classroom
    image: '/images/VBS-het-kleurenpalet.png'
  }
];

// --- TEAM ---
// Placeholder portretten
export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 't1',
    name: 'Sarah Pieters',
    role: 'Algemeen Coördinator',
    locationIds: ['loc1', 'loc2', 'loc3'],
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't2',
    name: 'Tom Maes',
    role: 'Hoofdbegeleider',
    locationIds: ['loc1'],
    // Fallback icon
  },
  {
    id: 't3',
    name: 'Elke De Smet',
    role: 'Begeleider & Creatief Atelier',
    locationIds: ['loc2'],
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't4',
    name: 'Jonas Vermeulen',
    role: 'Sportbegeleider',
    locationIds: ['loc3'],
  }
];

// --- ACTIVITEITEN ---
export const INITIAL_ACTIVITIES: Activity[] = [
  // Pedagogische studiedagen
  {
    id: 'ps1',
    title: 'Pedagogische studiedag',
    type: ActivityType.FREE_DAY,
    startDate: '2025-10-03',
    locationId: 'loc1',
    hours: '08:00 - 18:00',
    price: '€12 (halve dag) / €23 (volle dag)',
    description: 'Een dag vol spel en plezier terwijl de juffen en meesters studeren.',
    googleFormUrl: 'https://forms.gle/evfadnRYwcG7F8hj6',
  },
  {
    id: 'ps2',
    title: 'Pedagogische studiedag',
    type: ActivityType.FREE_DAY,
    startDate: '2026-02-13',
    locationId: 'loc1',
    hours: '08:00 - 18:00',
    price: '€12 (halve dag) / €23 (volle dag)',
    description: 'Een dag vol spel en plezier terwijl de juffen en meesters studeren.',
    googleFormUrl: 'https://forms.gle/YBA47sE6ao1bfHJu6',
  },
  {
    id: 'ps3',
    title: 'Pedagogische studiedag',
    type: ActivityType.FREE_DAY,
    startDate: '2026-05-20',
    locationId: 'loc1',
    hours: '08:00 - 18:00',
    price: '€12 (halve dag) / €23 (volle dag)',
    description: 'Een dag vol spel en plezier terwijl de juffen en meesters studeren.',
    googleFormUrl: 'https://forms.gle/T5SaVNfUHjDPgggz5',
  },
  
  // Facultatieve vrije dagen
  {
    id: 'fv1',
    title: 'Facultatieve vrije dag',
    type: ActivityType.FREE_DAY,
    startDate: '2025-11-10',
    locationId: 'loc1',
    hours: '08:00 - 18:00',
    price: '€12 (halve dag) / €23 (volle dag)',
    description: 'Opvang tijdens de facultatieve vrije dag.',
    googleFormUrl: 'https://forms.gle/kjPC96ZvrsxrnjuP8',
  },
  {
    id: 'fv2',
    title: 'Facultatieve vrije dag',
    type: ActivityType.FREE_DAY,
    startDate: '2026-01-30',
    locationId: 'loc1',
    hours: '08:00 - 18:00',
    price: '€12 (halve dag) / €23 (volle dag)',
    description: 'Opvang tijdens de facultatieve vrije dag.',
    googleFormUrl: 'https://forms.gle/VB1vDttSrfBvt7W77',
  },
  
  // Brugdag
  {
    id: 'bd1',
    title: 'Brugdag na Hemelvaart',
    type: ActivityType.FREE_DAY,
    startDate: '2026-05-15',
    locationId: 'loc1',
    hours: '08:00 - 18:00',
    price: '€12 (halve dag) / €23 (volle dag)',
    description: 'Opvang tijdens de brugdag na Hemelvaart.',
    googleFormUrl: 'https://forms.gle/PukQMiSm5Pii2PyC8',
  },
  
  // Vakantiekampen
  {
    id: 'vk1',
    title: 'Herfstvakantie',
    type: ActivityType.CAMP,
    startDate: '2025-10-27',
    endDate: '2025-10-31',
    locationId: 'loc1',
    hours: '09:00 - 16:00',
    price: '€115 (week)',
    description: 'Een week vol avontuur en plezier tijdens de herfstvakantie!',
    googleFormUrl: 'https://forms.gle/vEVfsC6qHehb7zvP6',
  },
  {
    id: 'vk2',
    title: 'Kerstvakantie',
    type: ActivityType.CAMP,
    startDate: '2025-12-22',
    endDate: '2025-12-23',
    locationId: 'loc1',
    hours: '09:00 - 16:00',
    price: '€46 (2 dagen)',
    description: 'Gezellige dagen in de kerstvakantie met leuke activiteiten.',
    googleFormUrl: 'https://forms.gle/sb4dNoRFMTn85L5F6',
  },
  {
    id: 'vk3',
    title: 'Kerstvakantie',
    type: ActivityType.CAMP,
    startDate: '2025-12-29',
    endDate: '2025-12-30',
    locationId: 'loc1',
    hours: '09:00 - 16:00',
    price: '€46 (2 dagen)',
    description: 'Gezellige dagen in de kerstvakantie met leuke activiteiten.',
    googleFormUrl: 'https://forms.gle/sb4dNoRFMTn85L5F6',
  },
  {
    id: 'vk4',
    title: 'Krokusvakantie',
    type: ActivityType.CAMP,
    startDate: '2026-02-16',
    endDate: '2026-02-20',
    locationId: 'loc1',
    hours: '09:00 - 16:00',
    price: '€115 (week)',
    description: 'Een week vol winterse activiteiten en plezier!',
    googleFormUrl: 'https://forms.gle/YZF4jhJHiRjYUj9h8',
  },
  {
    id: 'vk5',
    title: 'Paasvakantie - Week 1',
    type: ActivityType.CAMP,
    startDate: '2026-04-07',
    endDate: '2026-04-10',
    locationId: 'loc1',
    hours: '09:00 - 16:00',
    price: '€92 (4 dagen)',
    description: 'Eerste week van de paasvakantie met leuke lenteactiviteiten!',
    googleFormUrl: 'https://forms.gle/M4tgGDaWAsdQbS5y5',
  },
  {
    id: 'vk6',
    title: 'Paasvakantie - Week 2',
    type: ActivityType.CAMP,
    startDate: '2026-04-13',
    endDate: '2026-04-17',
    locationId: 'loc1',
    hours: '09:00 - 16:00',
    price: '€115 (week)',
    description: 'Tweede week van de paasvakantie met nog meer plezier!',
    googleFormUrl: 'https://forms.gle/XueKeMDacTDsiL357',
  },
  {
    id: 'vk7',
    title: 'Zomervakantie',
    type: ActivityType.CAMP,
    startDate: '2026-07-01',
    endDate: '2026-07-03',
    locationId: 'loc1',
    hours: '09:00 - 16:00',
    price: '€69 (3 dagen)',
    description: 'Start van de zomervakantie met zonnige activiteiten!',
    googleFormUrl: 'https://forms.gle/hjwNLZsVqARA7HwW8',
  },
  {
    id: 'vk8',
    title: 'Zomervakantie',
    type: ActivityType.CAMP,
    startDate: '2026-07-06',
    endDate: '2026-07-10',
    locationId: 'loc1',
    hours: '09:00 - 16:00',
    price: '€115 (week)',
    description: 'Een week vol zomerse avonturen en waterpret!',
    googleFormUrl: 'https://forms.gle/ZLxPz7vXQoyhi17E8',
  },
  {
    id: 'vk9',
    title: 'Zomervakantie',
    type: ActivityType.CAMP,
    startDate: '2026-07-13',
    endDate: '2026-07-17',
    locationId: 'loc1',
    hours: '09:00 - 16:00',
    price: '€115 (week)',
    description: 'Nog een week vol zomerse activiteiten!',
    googleFormUrl: 'https://forms.gle/Es42mNCiooFqotCk9',
  },
  {
    id: 'vk10',
    title: 'Zomervakantie',
    type: ActivityType.CAMP,
    startDate: '2026-08-17',
    endDate: '2026-08-21',
    locationId: 'loc1',
    hours: '09:00 - 16:00',
    price: '€115 (week)',
    description: 'Zomerkamp in augustus met leuke buitenactiviteiten!',
    googleFormUrl: 'https://forms.gle/bqWo2KJ2V2Q6VzxX8',
  },
  {
    id: 'vk11',
    title: 'Zomervakantie',
    type: ActivityType.CAMP,
    startDate: '2026-08-24',
    endDate: '2026-08-28',
    locationId: 'loc1',
    hours: '09:00 - 16:00',
    price: '€115 (week)',
    description: 'Laatste week van augustus met nog meer zomerplezier!',
    googleFormUrl: 'https://forms.gle/NMdYa8o2KqEmuSnYA',
  },
  {
    id: 'vk12',
    title: 'Zomervakantie',
    type: ActivityType.CAMP,
    startDate: '2026-08-31',
    locationId: 'loc1',
    hours: '09:00 - 16:00',
    price: '€23 (1 dag)',
    description: 'Laatste dag van de zomervakantie - nog één keer genieten!',
    googleFormUrl: 'https://forms.gle/1kTN9UXf5dzaohAK6',
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'n1',
    date: '2025-09-01',
    title: 'Welkom in het nieuwe schooljaar!',
    content: 'We zijn er helemaal klaar voor. Vergeet niet je kind tijdig in te schrijven via het nieuwe portaal.'
  }
];

export const CONTACT_INFO = {
  email: 'info@vzwdespeelkamer.be',
  phone: '050 12 34 56',
  facebookUrl: 'https://www.facebook.com/opvangminipalet',
  reglementUrl: '/huishoudelijk-reglement.pdf'
};

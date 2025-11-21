// VZW De Speelkamer - Data

const DATA = {
    locations: [
        {
            id: 'loc1',
            name: 'VBS De Frères',
            address: 'Mariastraat 7, 8000 Brugge',
            description: 'Onze hoofdlocatie gelegen in het hartje van Brugge.',
            image: './images/Nieuwstraat.png',
            phone: '050 33 63 47',
            email: 'Inge.Versavel@vbsdefreres.be'
        },
        {
            id: 'loc2',
            name: 'Sint-Andreas',
            address: 'Gentpoortstraat 1, 8000 Brugge',
            description: 'Een gezellige locatie met veel speelruimte.',
            image: './images/Gentpoortstraat.png',
            phone: '050 33 63 47',
            email: 'Inge.Versavel@vbsdefreres.be'
        },
        {
            id: 'loc3',
            name: 'Het Kleurenpalet',
            address: 'Groenestraat 27, 8000 Brugge',
            description: 'Onze locatie met focus op creativiteit.',
            image: './images/Groenestraat.png',
            phone: '050 33 63 47',
            email: 'Inge.Versavel@vbsdefreres.be'
        }
    ],

    team: [
        {
            id: 't1',
            name: 'Sarah Pieters',
            role: 'Algemeen Coördinator',
            locationIds: ['loc1', 'loc2', 'loc3'],
            imageUrl: './images/team.jpg',
            bio: 'Sarah is de drijvende kracht achter De Speelkamer en zorgt voor een warme en professionele werking.'
        },
        {
            id: 't2',
            name: 'Tom Maes',
            role: 'Hoofdbegeleider',
            locationIds: ['loc1'],
            imageUrl: './images/team.jpg',
            bio: 'Tom staat in voor de dagelijkse begeleiding en brengt veel energie en creativiteit mee.'
        },
        {
            id: 't3',
            name: 'Elke De Smet',
            role: 'Begeleider',
            locationIds: ['loc2'],
            imageUrl: './images/team.jpg',
            bio: 'Elke zorgt voor een veilige en gezellige sfeer waar kinderen zich thuis voelen.'
        },
        {
            id: 't4',
            name: 'Jonas Vermeulen',
            role: 'Sportbegeleider',
            locationIds: ['loc3'],
            imageUrl: './images/team.jpg',
            bio: 'Jonas brengt beweging en sport in de opvang met veel enthousiasme.'
        }
    ],

    activities: [
        {
            id: 'vk1',
            title: 'Herfstvakantie',
            type: 'CAMP',
            startDate: '2025-10-27',
            endDate: '2025-10-31',
            hours: '09:00 - 16:00',
            price: '€115 (week)',
            googleFormUrl: 'https://forms.gle/vEVfsC6qHehb7zvP6',
            description: 'Een week vol herfstknutsels, buitenspelen en gezelligheid.'
        },
        {
            id: 'vk2',
            title: 'Kerstvakantie',
            type: 'CAMP',
            startDate: '2025-12-22',
            endDate: '2025-12-23',
            hours: '09:00 - 16:00',
            price: '€46 (2 dagen)',
            googleFormUrl: 'https://forms.gle/sb4dNoRFMTn85L5F6',
            description: 'Twee dagen vol kerstsfeer, knutselen en spelletjes.'
        },
        {
            id: 'vk4',
            title: 'Krokusvakantie',
            type: 'CAMP',
            startDate: '2026-02-16',
            endDate: '2026-02-20',
            hours: '09:00 - 16:00',
            price: '€115 (week)',
            googleFormUrl: 'https://forms.gle/YZF4jhJHiRjYUj9h8',
            description: 'Een week vol winterpret en creatieve activiteiten.'
        },
        {
            id: 'vk5',
            title: 'Paasvakantie - Week 1',
            type: 'CAMP',
            startDate: '2026-04-07',
            endDate: '2026-04-10',
            hours: '09:00 - 16:00',
            price: '€92 (4 dagen)',
            googleFormUrl: 'https://forms.gle/M4tgGDaWAsdQbS5y5',
            description: 'Vier dagen vol lentepret en paasactiviteiten.'
        },
        {
            id: 'vk6',
            title: 'Paasvakantie - Week 2',
            type: 'CAMP',
            startDate: '2026-04-13',
            endDate: '2026-04-17',
            hours: '09:00 - 16:00',
            price: '€115 (week)',
            googleFormUrl: 'https://forms.gle/XueKeMDacTDsiL357',
            description: 'Een week vol buitenspelen en creatieve workshops.'
        },
        {
            id: 'ps1',
            title: 'Pedagogische studiedag',
            type: 'FREE_DAY',
            startDate: '2025-10-03',
            hours: '08:00 - 18:00',
            price: '€12 (halve dag) / €23 (volle dag)',
            googleFormUrl: 'https://forms.gle/evfadnRYwcG7F8hj6',
            description: 'Opvang tijdens de pedagogische studiedag.'
        },
        {
            id: 'ps2',
            title: 'Pedagogische studiedag',
            type: 'FREE_DAY',
            startDate: '2026-02-13',
            hours: '08:00 - 18:00',
            price: '€12 (halve dag) / €23 (volle dag)',
            googleFormUrl: 'https://forms.gle/YBA47sE6ao1bfHJu6',
            description: 'Opvang tijdens de pedagogische studiedag.'
        },
        {
            id: 'fv1',
            title: 'Facultatieve vrije dag',
            type: 'FREE_DAY',
            startDate: '2025-11-10',
            hours: '08:00 - 18:00',
            price: '€12 (halve dag) / €23 (volle dag)',
            googleFormUrl: 'https://forms.gle/kjPC96ZvrsxrnjuP8',
            description: 'Opvang tijdens de facultatieve vrije dag.'
        }
    ],

    pricing: {
        standardRate: 1.20,
        noonRate: 1.60,
        wednesdayAfternoon: 12.00,
        fullDay: 23.00,
        halfDay: 12.00
    },

    contact: {
        email: 'Inge.Versavel@vbsdefreres.be',
        phone: '050 33 63 47',
        gsm: '0476 90 81 23',
        facebook: 'https://www.facebook.com/opvangminipalet',
        address: 'Mariastraat 7, 8000 Brugge'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DATA;
}

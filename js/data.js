// VZW De Speelkamer - Dynamic Data with CMS Integration
// This file fetches data from the CMS API when available, with fallback to static data

// API Configuration
// Set PRODUCTION_CMS_URL to your deployed CMS URL (e.g., Heroku, Railway, Render)
// Leave as null to use static fallback data in production
const PRODUCTION_CMS_URL = null; // Change to: 'https://your-cms.herokuapp.com/api'

const API_CONFIG = {
    // Detect if running locally or in production
    baseUrl: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:3001/api'
        : PRODUCTION_CMS_URL, // Use production CMS if configured, otherwise fallback
    timeout: 5000 // 5 second timeout
};

// Static fallback data
const FALLBACK_DATA = {
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

// Fetch with timeout
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

// Fetch data from CMS API
async function fetchFromCMS(endpoint) {
    if (!API_CONFIG.baseUrl) {
        return null; // No API configured, use fallback
    }
    
    try {
        const response = await fetchWithTimeout(
            `${API_CONFIG.baseUrl}/${endpoint}`,
            API_CONFIG.timeout
        );
        
        if (!response.ok) {
            console.warn(`CMS API error for ${endpoint}:`, response.status);
            return null;
        }
        
        return await response.json();
    } catch (error) {
        console.warn(`Failed to fetch from CMS (${endpoint}):`, error.message);
        return null;
    }
}

// Transform CMS data to match expected format
function transformCMSData(cmsData, type) {
    if (!cmsData) return null;
    
    switch (type) {
        case 'activities':
            return cmsData.map(activity => ({
                id: activity.id,
                title: activity.title,
                type: activity.type,
                startDate: activity.start_date,
                endDate: activity.end_date,
                hours: activity.hours,
                price: activity.price,
                googleFormUrl: activity.google_form_url,
                description: activity.description || ''
            }));
            
        case 'team':
            return cmsData.map(member => ({
                id: member.id,
                name: member.name,
                role: member.role,
                locationIds: member.location_ids ? member.location_ids.split(',') : [],
                imageUrl: member.image_url || './images/team.jpg',
                bio: member.bio || ''
            }));
            
        case 'pricing':
            // CMS returns array, convert to object
            const pricingObj = {};
            cmsData.forEach(item => {
                const key = item.category.replace(/-/g, '_').replace(/\s+/g, '_');
                pricingObj[key] = parseFloat(item.amount);
            });
            return pricingObj;
            
        case 'locations':
            return cmsData.map(loc => ({
                id: loc.id,
                name: loc.name,
                address: loc.address || '',
                description: loc.description || '',
                image: loc.image || './images/location.jpg',
                phone: loc.phone || '050 33 63 47',
                email: loc.email || 'Inge.Versavel@vbsdefreres.be'
            }));
            
        default:
            return cmsData;
    }
}

// Load all data
async function loadData() {
    console.log('🔄 Loading data...');
    
    const data = {
        locations: FALLBACK_DATA.locations,
        team: FALLBACK_DATA.team,
        activities: FALLBACK_DATA.activities,
        pricing: FALLBACK_DATA.pricing,
        contact: FALLBACK_DATA.contact
    };
    
    // Try to fetch from CMS if available
    if (API_CONFIG.baseUrl) {
        console.log('📡 Fetching from CMS API...');
        
        // Fetch all data in parallel
        const [activities, team, pricing, locations] = await Promise.all([
            fetchFromCMS('activities'),
            fetchFromCMS('team'),
            fetchFromCMS('pricing'),
            fetchFromCMS('locations')
        ]);
        
        // Use CMS data if available, otherwise keep fallback
        if (activities) {
            data.activities = transformCMSData(activities, 'activities');
            console.log('✅ Activities loaded from CMS');
        } else {
            console.log('⚠️ Using fallback activities');
        }
        
        if (team) {
            data.team = transformCMSData(team, 'team');
            console.log('✅ Team loaded from CMS');
        } else {
            console.log('⚠️ Using fallback team');
        }
        
        if (pricing) {
            data.pricing = transformCMSData(pricing, 'pricing');
            console.log('✅ Pricing loaded from CMS');
        } else {
            console.log('⚠️ Using fallback pricing');
        }
        
        if (locations) {
            data.locations = transformCMSData(locations, 'locations');
            console.log('✅ Locations loaded from CMS');
        } else {
            console.log('⚠️ Using fallback locations');
        }
    } else {
        console.log('📦 Using static fallback data (no CMS API configured)');
    }
    
    return data;
}

// Initialize DATA as a promise
let DATA = null;
let dataPromise = loadData().then(loadedData => {
    DATA = loadedData;
    console.log('✅ Data loaded successfully');
    return DATA;
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DATA, dataPromise, loadData };
}

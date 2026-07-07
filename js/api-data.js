// API Data Loader for VZW De Speelkamer
// This file loads data from the Railway CMS API

const API_BASE_URL = 'https://vzw-de-speelkamer-production.up.railway.app/api';

// Load all data from API (no caching - always fresh data)
async function loadDataFromAPI() {
    try {
        // Add cache-busting timestamp to prevent browser caching
        const timestamp = new Date().getTime();
        const [locations, team, activities, pricing, siteImages, contact, settings] = await Promise.all([
            fetch(`${API_BASE_URL}/locations?_=${timestamp}`, { cache: 'no-store' }).then(r => r.json()),
            fetch(`${API_BASE_URL}/team?_=${timestamp}`, { cache: 'no-store' }).then(r => r.json()),
            fetch(`${API_BASE_URL}/activities?_=${timestamp}`, { cache: 'no-store' }).then(r => r.json()),
            fetch(`${API_BASE_URL}/pricing?_=${timestamp}`, { cache: 'no-store' }).then(r => r.json()),
            fetch(`${API_BASE_URL}/site-images?_=${timestamp}`, { cache: 'no-store' }).then(r => r.json()),
            fetch(`${API_BASE_URL}/contact?_=${timestamp}`, { cache: 'no-store' }).then(r => r.json()),
            fetch(`${API_BASE_URL}/settings?_=${timestamp}`, { cache: 'no-store' }).then(r => r.json()).catch(() => ({}))
        ]);

        return {
            locations: locations || [],
            team: team || [],
            activities: activities || [],
            pricing: pricing || {
                standardRate: 1.20,
                noonRate: 1.60,
                wednesdayAfternoon: 12.00,
                fullDay: 23.00,
                halfDay: 12.00
            },
            siteImages: siteImages || [],
            settings: {
                reglementUrl: settings?.reglement_url || '',
                reglementName: settings?.reglement_name || ''
            },
            contact: {
                email: contact?.email || 'Inge.Versavel@vbsdefreres.be',
                email2: contact?.email2 || '',
                phone: contact?.phone || '050 33 63 47',
                phone2: contact?.phone2 || '',
                gsm: contact?.gsm || '0476 90 81 23',
                gsm2: contact?.gsm2 || '',
                facebook: contact?.facebook || 'https://www.facebook.com/opvangminipalet',
                address: contact?.address || 'Mariastraat 7, 8000 Brugge'
            }
        };
    } catch (error) {
        console.error('Error loading data from API:', error);
        // Fallback to static data if API fails
        return DATA;
    }
}

// Initialize data on page load
let DATA = {
    locations: [],
    team: [],
    activities: [],
    pricing: {
        standardRate: 1.20,
        noonRate: 1.60,
        wednesdayAfternoon: 12.00,
        fullDay: 23.00,
        halfDay: 12.00
    },
    siteImages: [],
    settings: {
        reglementUrl: '',
        reglementName: ''
    },
    contact: {
        email: 'Inge.Versavel@vbsdefreres.be',
        phone: '050 33 63 47',
        gsm: '0476 90 81 23',
        facebook: 'https://www.facebook.com/opvangminipalet',
        address: 'Mariastraat 7, 8000 Brugge'
    }
};

// Update the "Huishoudelijk Reglement" link(s) in the footer to point at the
// CMS-managed document. Falls back to the static PDF if nothing is uploaded yet.
function updateReglementLinks(settings) {
    const url = settings?.reglementUrl;
    if (!url) return; // keep the existing static ./documents/... link as fallback

    const apply = () => {
        document.querySelectorAll('a[href$="huishoudelijk-reglement-25-26.pdf"], a[data-reglement-link]')
            .forEach(link => {
                link.href = url;
                link.setAttribute('data-reglement-link', '');
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener');
            });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', apply, { once: true });
    } else {
        apply();
    }
}

// Load data when script loads
(async function() {
    try {
        const apiData = await loadDataFromAPI();
        // Update DATA with API data
        DATA.locations = apiData.locations;
        DATA.team = apiData.team;
        DATA.activities = apiData.activities;
        DATA.pricing = apiData.pricing;
        DATA.siteImages = apiData.siteImages || [];
        DATA.settings = apiData.settings || DATA.settings;
        DATA.contact = apiData.contact || DATA.contact;

        // Point the footer "Huishoudelijk Reglement" link at the CMS document
        updateReglementLinks(DATA.settings);

        console.log('✅ Data loaded from Railway API:', {
            locations: DATA.locations.length,
            team: DATA.team.length,
            activities: DATA.activities.length,
            siteImages: DATA.siteImages.length
        });
        
        // Trigger custom event to notify other scripts that data is loaded
        window.dispatchEvent(new CustomEvent('dataLoaded', { detail: DATA }));
    } catch (error) {
        console.error('❌ Failed to load API data:', error);
    }
})();

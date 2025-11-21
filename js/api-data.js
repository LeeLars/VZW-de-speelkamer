// API Data Loader for VZW De Speelkamer
// This file loads data from the Railway CMS API

const API_BASE_URL = 'https://vzw-de-speelkamer-production.up.railway.app/api';

// Cache for API data
let cachedData = null;

// Load all data from API
async function loadDataFromAPI() {
    if (cachedData) {
        return cachedData;
    }

    try {
        const [locations, team, activities, pricing] = await Promise.all([
            fetch(`${API_BASE_URL}/locations`).then(r => r.json()),
            fetch(`${API_BASE_URL}/team`).then(r => r.json()),
            fetch(`${API_BASE_URL}/activities`).then(r => r.json()),
            fetch(`${API_BASE_URL}/pricing`).then(r => r.json())
        ]);

        cachedData = {
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
            contact: {
                email: 'Inge.Versavel@vbsdefreres.be',
                phone: '050 33 63 47',
                gsm: '0476 90 81 23',
                facebook: 'https://www.facebook.com/opvangminipalet',
                address: 'Mariastraat 7, 8000 Brugge'
            }
        };

        return cachedData;
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
    contact: {
        email: 'Inge.Versavel@vbsdefreres.be',
        phone: '050 33 63 47',
        gsm: '0476 90 81 23',
        facebook: 'https://www.facebook.com/opvangminipalet',
        address: 'Mariastraat 7, 8000 Brugge'
    }
};

// Load data when script loads
(async function() {
    try {
        const apiData = await loadDataFromAPI();
        // Update DATA with API data
        DATA.locations = apiData.locations;
        DATA.team = apiData.team;
        DATA.activities = apiData.activities;
        DATA.pricing = apiData.pricing;
        
        console.log('✅ Data loaded from Railway API:', {
            locations: DATA.locations.length,
            team: DATA.team.length,
            activities: DATA.activities.length
        });
        
        // Trigger custom event to notify other scripts that data is loaded
        window.dispatchEvent(new CustomEvent('dataLoaded', { detail: DATA }));
    } catch (error) {
        console.error('❌ Failed to load API data:', error);
    }
})();

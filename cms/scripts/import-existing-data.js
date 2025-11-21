/**
 * Script to import existing data from js/data.js into the CMS database
 * Run this once to migrate your existing data
 * 
 * Usage: node scripts/import-existing-data.js
 */

const path = require('path');
const fs = require('fs');

// Read the existing data.js file
const dataJsPath = path.join(__dirname, '../../js/data.js');
const dbPath = path.join(__dirname, '../database/db.json');

console.log('🔄 Importing existing data into CMS...\n');

// This is a manual script - you'll need to copy data from js/data.js
// and format it for the CMS database structure

const exampleData = {
    users: [
        // Admin user is already created by init.js
    ],
    activities: [
        // Example format:
        // {
        //     id: "camp1",
        //     title: "Zomerkamp Week 1",
        //     type: "CAMP",
        //     start_date: "2024-07-01",
        //     end_date: "2024-07-05",
        //     hours: "09:00 - 16:00",
        //     price: "€115 (week)",
        //     google_form_url: "https://forms.gle/...",
        //     description: "Leuke activiteiten voor kinderen",
        //     created_at: new Date().toISOString(),
        //     updated_at: new Date().toISOString()
        // }
    ],
    pricing: [
        // Already initialized with default values
    ],
    team_members: [
        // Example format:
        // {
        //     id: "t1",
        //     name: "Naam",
        //     role: "Rol",
        //     bio: "Bio tekst",
        //     image_url: "./images/team.jpg",
        //     location_ids: "loc1,loc2",
        //     created_at: new Date().toISOString(),
        //     updated_at: new Date().toISOString()
        // }
    ],
    locations: []
};

console.log('ℹ️  This is a template script.');
console.log('📝 To import your data:');
console.log('   1. Open js/data.js');
console.log('   2. Copy your activities and team data');
console.log('   3. Format them according to the example above');
console.log('   4. Add them to this script');
console.log('   5. Run: node scripts/import-existing-data.js\n');

console.log('💡 Or use the CMS interface to add data manually!\n');
console.log('✅ CMS is ready at: http://localhost:3001\n');

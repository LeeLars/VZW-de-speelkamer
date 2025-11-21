/**
 * Script to import existing data from js/data.js into the CMS database
 * Run this once to migrate your existing data
 * 
 * Usage: node scripts/import-existing-data.js
 */

const path = require('path');
const fs = require('fs');

// Import the existing data
const DATA = require('../../js/data.js');
const dbPath = path.join(__dirname, '../database/db.json');

console.log('🔄 Importing existing data into CMS...\n');

// Read current database
let db = {};
try {
    const dbContent = fs.readFileSync(dbPath, 'utf8');
    db = JSON.parse(dbContent);
} catch (error) {
    console.log('⚠️  Database not found, creating new one...');
    db = {
        users: [],
        activities: [],
        pricing: [],
        team_members: [],
        locations: []
    };
}

const now = new Date().toISOString();

// Import locations
console.log('📍 Importing locations...');
db.locations = DATA.locations.map(loc => ({
    id: loc.id,
    name: loc.name,
    address: loc.address,
    description: loc.description,
    image: loc.image,
    phone: loc.phone,
    email: loc.email,
    created_at: now,
    updated_at: now
}));
console.log(`   ✅ Imported ${db.locations.length} locations`);

// Import team members
console.log('👥 Importing team members...');
db.team_members = DATA.team.map(member => ({
    id: member.id,
    name: member.name,
    role: member.role,
    bio: member.bio || '',
    image_url: member.imageUrl,
    location_ids: member.locationIds.join(','),
    created_at: now,
    updated_at: now
}));
console.log(`   ✅ Imported ${db.team_members.length} team members`);

// Import activities
console.log('🎪 Importing activities...');
db.activities = DATA.activities.map(activity => ({
    id: activity.id,
    title: activity.title,
    type: activity.type,
    start_date: activity.startDate,
    end_date: activity.endDate || activity.startDate,
    hours: activity.hours,
    price: activity.price,
    google_form_url: activity.googleFormUrl,
    description: activity.description || '',
    created_at: now,
    updated_at: now
}));
console.log(`   ✅ Imported ${db.activities.length} activities`);

// Import pricing
console.log('💰 Importing pricing...');
db.pricing = [{
    id: 'pricing1',
    standard_rate: DATA.pricing.standardRate,
    noon_rate: DATA.pricing.noonRate,
    wednesday_afternoon: DATA.pricing.wednesdayAfternoon,
    full_day: DATA.pricing.fullDay,
    half_day: DATA.pricing.halfDay,
    created_at: now,
    updated_at: now
}];
console.log(`   ✅ Imported pricing`);

// Write to database
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

console.log('\n✅ Import completed successfully!');
console.log(`📊 Summary:`);
console.log(`   - ${db.locations.length} locations`);
console.log(`   - ${db.team_members.length} team members`);
console.log(`   - ${db.activities.length} activities`);
console.log(`   - Pricing configured`);
console.log('\n🚀 You can now start the CMS server with: npm start\n');

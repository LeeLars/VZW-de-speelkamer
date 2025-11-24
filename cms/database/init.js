const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const adapter = new FileSync(dbPath);
const db = low(adapter);

function initializeDatabase() {
    console.log('Initializing database...');

    // Set default structure
    db.defaults({
        users: [],
        activities: [],
        pricing: [],
        team_members: [],
        locations: []
    }).write();

    // Insert default admin user if not exists
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'changeme123';
    
    // Security warning if using default credentials
    if (!process.env.ADMIN_PASSWORD) {
        console.warn('⚠️  WARNING: Using default admin password! Set ADMIN_PASSWORD environment variable in production!');
    }
    
    const existingUser = db.get('users').find({ username: adminUsername }).value();
    
    if (!existingUser) {
        const hashedPassword = bcrypt.hashSync(adminPassword, 10);
        db.get('users').push({
            id: 1,
            username: adminUsername,
            password: hashedPassword,
            created_at: new Date().toISOString()
        }).write();
        console.log(`Default admin user created: ${adminUsername}`);
        console.log('⚠️  IMPORTANT: Change the default password immediately!');
    }

    // Insert default pricing if not exists
    const pricingData = [
        { id: 1, category: 'standard_rate', rate: 1.20, description: 'Standaard tarief per begonnen halfuur' },
        { id: 2, category: 'noon_rate', rate: 1.60, description: 'Middagtoezicht' },
        { id: 3, category: 'wednesday_afternoon', rate: 12.00, description: 'Woensdagnamiddag' },
        { id: 4, category: 'full_day', rate: 23.00, description: 'Volle dag' },
        { id: 5, category: 'half_day', rate: 12.00, description: 'Halve dag' },
        { id: 6, category: 'study_rate', rate: 2.40, description: 'Studiebegeleiding per uur' }
    ];

    pricingData.forEach(pricing => {
        const exists = db.get('pricing').find({ category: pricing.category }).value();
        if (!exists) {
            db.get('pricing').push({
                ...pricing,
                updated_at: new Date().toISOString()
            }).write();
        }
    });

    console.log('Database initialization complete!');
}

module.exports = { db, initializeDatabase };

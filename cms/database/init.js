const bcrypt = require('bcryptjs');
const { query, queryOne, queryAll } = require('./db');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
    console.log('🔄 Initializing PostgreSQL database...');

    try {
        // Test database connection first
        await query('SELECT NOW()');
        console.log('✅ Database connection successful');

        // Read and execute schema
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        
        // Split schema into individual statements and execute them
        const statements = schema
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);
        
        console.log(`📝 Executing ${statements.length} schema statements...`);
        
        for (const statement of statements) {
            try {
                await query(statement);
            } catch (err) {
                // Ignore "already exists" errors
                if (!err.message.includes('already exists')) {
                    throw err;
                }
            }
        }
        
        console.log('✅ Database schema created');

        // Insert default admin user if not exists
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPassword = process.env.ADMIN_PASSWORD || 'changeme123';
        
        // Security warning if using default credentials
        if (!process.env.ADMIN_PASSWORD) {
            console.warn('⚠️  WARNING: Using default admin password! Set ADMIN_PASSWORD environment variable in production!');
        }
        
        const existingUser = await queryOne(
            'SELECT * FROM users WHERE username = $1',
            [adminUsername]
        );
        
        if (!existingUser) {
            const hashedPassword = bcrypt.hashSync(adminPassword, 10);
            await query(
                'INSERT INTO users (username, password) VALUES ($1, $2)',
                [adminUsername, hashedPassword]
            );
            console.log(`✅ Default admin user created: ${adminUsername}`);
            console.log('⚠️  IMPORTANT: Change the default password immediately!');
        }

        // Insert default pricing if not exists
        const pricingData = [
            { category: 'standard_rate', rate: 1.20, description: 'Standaard tarief per begonnen halfuur' },
            { category: 'noon_rate', rate: 1.60, description: 'Middagtoezicht' },
            { category: 'wednesday_afternoon', rate: 12.00, description: 'Woensdagnamiddag' },
            { category: 'full_day', rate: 23.00, description: 'Volle dag' },
            { category: 'half_day', rate: 12.00, description: 'Halve dag' },
            { category: 'study_rate', rate: 2.40, description: 'Studiebegeleiding per uur' }
        ];

        for (const pricing of pricingData) {
            const exists = await queryOne(
                'SELECT * FROM pricing WHERE category = $1',
                [pricing.category]
            );
            if (!exists) {
                await query(
                    'INSERT INTO pricing (category, rate, description) VALUES ($1, $2, $3)',
                    [pricing.category, pricing.rate, pricing.description]
                );
            }
        }

        console.log('✅ Database initialization complete!');
    } catch (error) {
        console.error('❌ Database initialization error:', error);
        throw error;
    }
}

module.exports = { initializeDatabase };

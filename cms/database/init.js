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

        // Ensure optional columns exist (handles schema updates)
        await query(`
            ALTER TABLE activities
            ADD COLUMN IF NOT EXISTS practical_info_url TEXT
        `);
        await query(`
            ALTER TABLE activities
            ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'geopend'
        `);
        await query(`
            UPDATE activities
            SET status = 'geopend'
            WHERE status IS NULL
        `);

        // Ensure safe defaults on content columns so empty saves do not fail
        await query(`ALTER TABLE activities ALTER COLUMN title SET DEFAULT ''`);
        await query(`ALTER TABLE activities ALTER COLUMN type SET DEFAULT 'CAMP'`);
        await query(`ALTER TABLE activities ALTER COLUMN start_date SET DEFAULT CURRENT_DATE`);
        await query(`ALTER TABLE activities ALTER COLUMN hours SET DEFAULT ''`);
        await query(`ALTER TABLE activities ALTER COLUMN price SET DEFAULT ''`);
        await query(`ALTER TABLE activities ALTER COLUMN google_form_url SET DEFAULT '#'`);
        await query(`ALTER TABLE team_members ALTER COLUMN name SET DEFAULT 'Teamlid'`);
        await query(`ALTER TABLE team_members ALTER COLUMN role SET DEFAULT ''`);
        await query(`ALTER TABLE locations ALTER COLUMN name SET DEFAULT 'Locatie'`);
        await query(`ALTER TABLE locations ALTER COLUMN address SET DEFAULT ''`);
        await query(`ALTER TABLE pricing ALTER COLUMN rate SET DEFAULT 0`);
        await query(`
            ALTER TABLE team_members
            ADD COLUMN IF NOT EXISTS intro TEXT
        `);
        await query(`
            ALTER TABLE team_members
            ADD COLUMN IF NOT EXISTS phone2 VARCHAR(50)
        `);
        await query(`
            ALTER TABLE team_members
            ADD COLUMN IF NOT EXISTS email2 VARCHAR(255)
        `);
        await query(`
            ALTER TABLE locations
            ADD COLUMN IF NOT EXISTS phone2 VARCHAR(50)
        `);
        await query(`
            ALTER TABLE locations
            ADD COLUMN IF NOT EXISTS email2 VARCHAR(255)
        `);
        await query(`
            CREATE TABLE IF NOT EXISTS contact_info (
                id INTEGER PRIMARY KEY DEFAULT 1,
                email VARCHAR(255),
                email2 VARCHAR(255),
                phone VARCHAR(50),
                phone2 VARCHAR(50),
                gsm VARCHAR(50),
                gsm2 VARCHAR(50),
                facebook TEXT,
                address TEXT,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Verified optional columns (activities.practical_info_url, activities.status, team_members.intro, team_members.phone2/email2, locations.phone2/email2, contact_info table)');

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

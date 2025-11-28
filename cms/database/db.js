const { Pool } = require('pg');

// DATABASE_URL check is done in server.js before database initialization
// This allows dotenv to load first and Railway to inject environment variables properly

if (process.env.DATABASE_URL) {
    console.log('🔗 Connecting to database:', process.env.DATABASE_URL.split('@')[1] || 'localhost');
}

// Create PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
    } : false
});

// Test connection
pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('❌ Unexpected error on idle client', err);
    process.exit(-1);
});

// Helper function to execute queries
async function query(text, params) {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        // Only log in development
        if (process.env.NODE_ENV !== 'production') {
            console.log('Executed query', { text: text.substring(0, 100), duration, rows: res.rowCount });
        }
        return res;
    } catch (error) {
        console.error('❌ Query error:', error.message);
        console.error('Query:', text.substring(0, 200));
        throw error;
    }
}

// Helper function to get a single row
async function queryOne(text, params) {
    const result = await query(text, params);
    return result.rows[0];
}

// Helper function to get all rows
async function queryAll(text, params) {
    const result = await query(text, params);
    return result.rows;
}

module.exports = {
    pool,
    query,
    queryOne,
    queryAll
};

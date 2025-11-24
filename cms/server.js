require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeDatabase } = require('./database/init');

// Import routes
const authRoutes = require('./routes/auth');
const activitiesRoutes = require('./routes/activities');
const pricingRoutes = require('./routes/pricing');
const teamRoutes = require('./routes/team');
const locationsRoutes = require('./routes/locations');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Note: Images are now stored on Cloudinary, no local uploads folder needed

// Serve CMS static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'CMS API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error'
    });
});

// Start server function
async function startServer() {
    try {
        // Check if DATABASE_URL is set
        if (!process.env.DATABASE_URL) {
            console.error('❌ DATABASE_URL environment variable is not set!');
            console.error('⚠️  Please add DATABASE_URL to your Railway environment variables');
            process.exit(1);
        }

        console.log('🔄 Initializing database...');
        await initializeDatabase();
        console.log('✅ Database initialized successfully');

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`\n🚀 CMS Server running on port ${PORT}`);
            console.log(`📊 API endpoints available at /api`);
            console.log(`✅ Connected to PostgreSQL database`);
            console.log(`\n⚠️  Make sure to:`);
            console.log(`   1. Change the default admin password`);
            console.log(`   2. Set a secure JWT_SECRET\n`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        console.error('\n🔍 Troubleshooting:');
        console.error('   1. Check if DATABASE_URL is set in Railway');
        console.error('   2. Verify PostgreSQL service is running');
        console.error('   3. Check Railway logs for more details\n');
        process.exit(1);
    }
}

// Start the server
startServer();

module.exports = app;

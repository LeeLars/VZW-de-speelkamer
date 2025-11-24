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

// Start server after database initialization
async function startServer() {
    try {
        console.log('🔄 Initializing database...');
        await initializeDatabase();
        console.log('✅ Database initialized successfully');
        
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`\n🚀 CMS Server running on port ${PORT}`);
            console.log(`📊 API endpoints available at /api`);
            console.log(`\n⚠️  Make sure to:`);
            console.log(`   1. Copy .env.example to .env`);
            console.log(`   2. Change the default admin password`);
            console.log(`   3. Set a secure JWT_SECRET\n`);
        });
    } catch (err) {
        console.error('❌ Failed to initialize database:', err);
        process.exit(1);
    }
}

startServer();

module.exports = app;

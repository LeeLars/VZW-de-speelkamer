const express = require('express');
const router = express.Router();
const { query } = require('../database/db');
const { authenticateToken } = require('../middleware/auth');

// Seed pricing data (protected route - requires authentication)
router.post('/pricing', authenticateToken, async (req, res) => {
    try {
        const pricingData = [
            { category: 'standard_rate', rate: 1.20, description: 'Standaard tarief per begonnen halfuur' },
            { category: 'noon_rate', rate: 1.60, description: 'Middagtoezicht' },
            { category: 'wednesday_afternoon', rate: 12.00, description: 'Woensdagnamiddag' },
            { category: 'full_day', rate: 23.00, description: 'Volle dag' },
            { category: 'half_day', rate: 12.00, description: 'Halve dag' },
            { category: 'study_rate', rate: 2.40, description: 'Studiebegeleiding per uur' }
        ];

        const results = {
            added: [],
            skipped: []
        };

        for (const pricing of pricingData) {
            // Check if exists
            const result = await query(
                'SELECT * FROM pricing WHERE category = $1',
                [pricing.category]
            );
            
            if (result.rows.length === 0) {
                // Insert new pricing
                await query(
                    'INSERT INTO pricing (category, rate, description) VALUES ($1, $2, $3)',
                    [pricing.category, pricing.rate, pricing.description]
                );
                results.added.push(pricing.description);
            } else {
                results.skipped.push(pricing.description);
            }
        }

        res.json({
            success: true,
            message: 'Pricing data seeded successfully',
            results
        });
    } catch (error) {
        console.error('Error seeding pricing:', error);
        res.status(500).json({ error: 'Failed to seed pricing data' });
    }
});

module.exports = router;

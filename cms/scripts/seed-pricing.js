require('dotenv').config();
const { query } = require('../database/db');

async function seedPricing() {
    console.log('🌱 Seeding pricing data...');
    
    const pricingData = [
        { category: 'standard_rate', rate: 1.20, description: 'Standaard tarief per begonnen halfuur' },
        { category: 'noon_rate', rate: 1.60, description: 'Middagtoezicht' },
        { category: 'wednesday_afternoon', rate: 12.00, description: 'Woensdagnamiddag' },
        { category: 'full_day', rate: 23.00, description: 'Volle dag' },
        { category: 'half_day', rate: 12.00, description: 'Halve dag' },
        { category: 'study_rate', rate: 2.40, description: 'Studiebegeleiding per uur' }
    ];

    try {
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
                console.log(`✅ Added: ${pricing.description} - €${pricing.rate}`);
            } else {
                console.log(`⏭️  Skipped (already exists): ${pricing.description}`);
            }
        }
        
        console.log('\n✅ Pricing data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding pricing:', error);
        process.exit(1);
    }
}

seedPricing();

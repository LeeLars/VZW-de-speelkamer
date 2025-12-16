const express = require('express');
const { query, queryOne, queryAll } = require('../database/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all activities (public)
router.get('/', async (req, res) => {
    try {
        const activities = await queryAll(
            'SELECT * FROM activities ORDER BY start_date ASC'
        );
        res.json(activities);
    } catch (error) {
        console.error('Get activities error:', error);
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});

// Get single activity (public)
router.get('/:id', async (req, res) => {
    try {
        const activity = await queryOne(
            'SELECT * FROM activities WHERE id = $1',
            [parseInt(req.params.id)]
        );
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        res.json(activity);
    } catch (error) {
        console.error('Get activity error:', error);
        res.status(500).json({ error: 'Failed to fetch activity' });
    }
});

// Create activity (protected)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { 
            title, 
            type, 
            start_date, 
            end_date, 
            hours, 
            price, 
            google_form_url, 
            status,
            description,
            practical_info_url 
        } = req.body;

        const resolvedType = type || 'CAMP';
        if (!['CAMP', 'FREE_DAY', 'STUDY_DAY'].includes(resolvedType)) {
            return res.status(400).json({ error: 'Invalid activity type' });
        }

        const resolvedStartDate = start_date || new Date().toISOString().slice(0, 10);
        const resolvedEndDate = end_date || null;
        const resolvedTitle = title || '';
        const resolvedHours = hours || '';
        const resolvedPrice = price || '';
        const resolvedFormUrl = google_form_url || '#';

        if (status && !['geopend', 'volzet'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const resolvedStatus = resolvedType === 'CAMP' ? (status || 'geopend') : '';

        const newActivity = await queryOne(
            `INSERT INTO activities (
                title, type, start_date, end_date, hours, price, google_form_url, status, description, practical_info_url
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *`,
            [
                resolvedTitle,
                resolvedType,
                resolvedStartDate,
                resolvedEndDate,
                resolvedHours,
                resolvedPrice,
                resolvedFormUrl,
                resolvedStatus,
                description || null,
                practical_info_url || null
            ]
        );

        res.status(201).json(newActivity);
    } catch (error) {
        console.error('Create activity error:', error);
        res.status(500).json({ error: 'Failed to create activity' });
    }
});

// Update activity (protected) - PATCH-like: only update provided non-empty fields
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { 
            title, 
            type, 
            start_date, 
            end_date, 
            hours, 
            price, 
            google_form_url, 
            status,
            description,
            practical_info_url 
        } = req.body;
        const activityId = parseInt(req.params.id);

        if (isNaN(activityId)) {
            return res.status(400).json({ error: 'Invalid activity ID' });
        }

        const existing = await queryOne(
            'SELECT * FROM activities WHERE id = $1',
            [activityId]
        );
        if (!existing) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        // Validate status only if provided and non-empty
        if (status && status !== '' && !['geopend', 'volzet'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        // Helper: use new value only if provided and non-empty, else keep existing
        const pick = (newVal, existingVal) => {
            if (newVal === undefined || newVal === null || newVal === '') {
                return existingVal;
            }
            return newVal;
        };

        // Resolve all fields with PATCH semantics
        const resolvedTitle = pick(title, existing.title);
        const resolvedType = pick(type, existing.type);
        const resolvedStartDate = pick(start_date, existing.start_date);
        const resolvedEndDate = end_date !== undefined ? (end_date || null) : existing.end_date;
        const resolvedHours = pick(hours, existing.hours);
        const resolvedPrice = pick(price, existing.price);
        const resolvedFormUrl = pick(google_form_url, existing.google_form_url);
        const resolvedDescription = description !== undefined ? description : existing.description;
        const resolvedPracticalUrl = pick(practical_info_url, existing.practical_info_url);

        // Status: for CAMP use provided or existing, for other types use empty string (not null due to DB constraint)
        let resolvedStatus = '';
        if (resolvedType === 'CAMP') {
            if (status !== undefined && status !== '') {
                resolvedStatus = status;
            } else {
                resolvedStatus = existing.status || 'geopend';
            }
        }

        const updated = await queryOne(
            `UPDATE activities SET
                title = $1,
                type = $2,
                start_date = $3,
                end_date = $4,
                hours = $5,
                price = $6,
                google_form_url = $7,
                status = $8,
                description = $9,
                practical_info_url = $10,
                updated_at = CURRENT_TIMESTAMP
             WHERE id = $11
             RETURNING *`,
            [
                resolvedTitle,
                resolvedType,
                resolvedStartDate,
                resolvedEndDate,
                resolvedHours,
                resolvedPrice,
                resolvedFormUrl,
                resolvedStatus,
                resolvedDescription,
                resolvedPracticalUrl,
                activityId
            ]
        );

        res.json(updated);
    } catch (error) {
        console.error('Update activity error:', error.message, error.stack);
        res.status(500).json({ error: `Failed to update activity: ${error.message}` });
    }
});

// Delete activity (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const activityId = parseInt(req.params.id);
        
        const existing = await queryOne(
            'SELECT * FROM activities WHERE id = $1',
            [activityId]
        );
        if (!existing) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        await query(
            'DELETE FROM activities WHERE id = $1',
            [activityId]
        );
        res.json({ message: 'Activity deleted successfully' });
    } catch (error) {
        console.error('Delete activity error:', error);
        res.status(500).json({ error: 'Failed to delete activity' });
    }
});

module.exports = router;

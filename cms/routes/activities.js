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

        const resolvedStatus = resolvedType === 'CAMP' ? (status || 'geopend') : null;

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

// Update activity (protected)
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

        const existing = await queryOne(
            'SELECT * FROM activities WHERE id = $1',
            [activityId]
        );
        if (!existing) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        if (status && !['geopend', 'volzet'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const resolvedType = type || existing.type;
        const resolvedStatus = resolvedType === 'CAMP'
            ? (status !== undefined ? status : (existing.status || 'geopend'))
            : null;

        const resolvedStartDate = start_date || existing.start_date;

        const updated = await queryOne(
            `UPDATE activities SET
                title = COALESCE($1, title),
                type = COALESCE($2, type),
                start_date = COALESCE($3, start_date),
                end_date = $4,
                hours = COALESCE($5, hours),
                price = COALESCE($6, price),
                google_form_url = COALESCE($7, google_form_url),
                status = $8,
                description = $9,
                practical_info_url = COALESCE($10, practical_info_url),
                updated_at = CURRENT_TIMESTAMP
             WHERE id = $11
             RETURNING *`,
            [
                title !== undefined && title !== '' ? title : null,
                type !== undefined && type !== '' ? type : null,
                resolvedStartDate,
                end_date !== undefined ? end_date : existing.end_date,
                hours !== undefined && hours !== '' ? hours : null,
                price !== undefined && price !== '' ? price : null,
                google_form_url !== undefined && google_form_url !== '' ? google_form_url : null,
                resolvedStatus,
                description !== undefined ? description : existing.description,
                practical_info_url !== undefined ? practical_info_url : existing.practical_info_url,
                activityId
            ]
        );

        res.json(updated);
    } catch (error) {
        console.error('Update activity error:', error);
        res.status(500).json({ error: 'Failed to update activity' });
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

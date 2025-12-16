const express = require('express');
const { query, queryOne, queryAll } = require('../database/db');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all team members (public)
router.get('/', async (req, res) => {
    try {
        const team = await queryAll(
            'SELECT * FROM team_members ORDER BY created_at ASC'
        );
        res.json(team);
    } catch (error) {
        console.error('Get team error:', error);
        res.status(500).json({ error: 'Failed to fetch team members' });
    }
});

// Get single team member (public)
router.get('/:id', async (req, res) => {
    try {
        const member = await queryOne(
            'SELECT * FROM team_members WHERE id = $1',
            [parseInt(req.params.id)]
        );
        if (!member) {
            return res.status(404).json({ error: 'Team member not found' });
        }
        res.json(member);
    } catch (error) {
        console.error('Get team member error:', error);
        res.status(500).json({ error: 'Failed to fetch team member' });
    }
});

// Create team member (protected)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, role, intro, phone, email, image_url } = req.body;

        if (!name || !role) {
            return res.status(400).json({ error: 'Missing required fields (name, role)' });
        }

        const newMember = await queryOne(
            `INSERT INTO team_members (name, role, intro, phone, email, image_url)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [
                name,
                role,
                intro || null,
                phone || null,
                email || null,
                image_url || './images/team.jpg'
            ]
        );

        res.status(201).json(newMember);
    } catch (error) {
        console.error('Create team member error:', error);
        res.status(500).json({ error: 'Failed to create team member' });
    }
});

// Update team member (protected)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { name, role, intro, phone, email, image_url } = req.body;
        const memberId = parseInt(req.params.id);

        const existing = await queryOne(
            'SELECT * FROM team_members WHERE id = $1',
            [memberId]
        );
        if (!existing) {
            return res.status(404).json({ error: 'Team member not found' });
        }

        const updated = await queryOne(
            `UPDATE team_members SET
                name = COALESCE($1, name),
                role = COALESCE($2, role),
                intro = $3,
                phone = $4,
                email = $5,
                image_url = $6,
                updated_at = CURRENT_TIMESTAMP
             WHERE id = $7
             RETURNING *`,
            [
                name, 
                role, 
                intro !== undefined ? intro : existing.intro,
                phone !== undefined ? phone : existing.phone,
                email !== undefined ? email : existing.email,
                image_url !== undefined ? image_url : existing.image_url, 
                memberId
            ]
        );

        res.json(updated);
    } catch (error) {
        console.error('Update team member error:', error);
        res.status(500).json({ error: 'Failed to update team member' });
    }
});

// Delete team member (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const memberId = parseInt(req.params.id);
        
        const existing = await queryOne(
            'SELECT * FROM team_members WHERE id = $1',
            [memberId]
        );
        if (!existing) {
            return res.status(404).json({ error: 'Team member not found' });
        }

        await query(
            'DELETE FROM team_members WHERE id = $1',
            [memberId]
        );
        res.json({ message: 'Team member deleted successfully' });
    } catch (error) {
        console.error('Delete team member error:', error);
        res.status(500).json({ error: 'Failed to delete team member' });
    }
});

module.exports = router;

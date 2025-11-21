const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { db } = require('../database/init');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../../images');
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'team-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Get all team members (public)
router.get('/', (req, res) => {
    try {
        const team = db.get('team_members').sortBy('created_at').value();
        res.json(team);
    } catch (error) {
        console.error('Get team error:', error);
        res.status(500).json({ error: 'Failed to fetch team members' });
    }
});

// Get single team member (public)
router.get('/:id', (req, res) => {
    try {
        const member = db.get('team_members').find({ id: req.params.id }).value();
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
router.post('/', authMiddleware, upload.single('image'), (req, res) => {
    try {
        const { id, name, role, bio, location_ids } = req.body;

        if (!id || !name || !role) {
            return res.status(400).json({ error: 'Missing required fields (id, name, role)' });
        }

        const image_url = req.file ? `./images/${req.file.filename}` : './images/team.jpg';

        const existing = db.get('team_members').find({ id }).value();
        if (existing) {
            return res.status(409).json({ error: 'Team member with this ID already exists' });
        }

        const newMember = {
            id,
            name,
            role,
            bio: bio || null,
            image_url,
            location_ids: location_ids || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        db.get('team_members').push(newMember).write();
        res.status(201).json(newMember);
    } catch (error) {
        console.error('Create team member error:', error);
        res.status(500).json({ error: 'Failed to create team member' });
    }
});

// Update team member (protected)
router.put('/:id', authMiddleware, upload.single('image'), (req, res) => {
    try {
        const { name, role, bio, location_ids } = req.body;

        const existing = db.get('team_members').find({ id: req.params.id }).value();
        if (!existing) {
            return res.status(404).json({ error: 'Team member not found' });
        }

        let image_url = existing.image_url;
        
        // If new image uploaded, delete old one (if not default) and use new one
        if (req.file) {
            if (existing.image_url && existing.image_url !== './images/team.jpg') {
                const oldImagePath = path.join(__dirname, '../../', existing.image_url);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            image_url = `./images/${req.file.filename}`;
        }

        const updated = {
            ...existing,
            name: name || existing.name,
            role: role || existing.role,
            bio: bio !== undefined ? bio : existing.bio,
            image_url,
            location_ids: location_ids !== undefined ? location_ids : existing.location_ids,
            updated_at: new Date().toISOString()
        };

        db.get('team_members').find({ id: req.params.id }).assign(updated).write();
        res.json(updated);
    } catch (error) {
        console.error('Update team member error:', error);
        res.status(500).json({ error: 'Failed to update team member' });
    }
});

// Delete team member (protected)
router.delete('/:id', authMiddleware, (req, res) => {
    try {
        const existing = db.get('team_members').find({ id: req.params.id }).value();
        if (!existing) {
            return res.status(404).json({ error: 'Team member not found' });
        }

        // Delete image file if not default
        if (existing.image_url && existing.image_url !== './images/team.jpg') {
            const imagePath = path.join(__dirname, '../../', existing.image_url);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        db.get('team_members').remove({ id: req.params.id }).write();
        res.json({ message: 'Team member deleted successfully' });
    } catch (error) {
        console.error('Delete team member error:', error);
        res.status(500).json({ error: 'Failed to delete team member' });
    }
});

module.exports = router;

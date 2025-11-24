const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../database/init');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Login
router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        const user = db.get('users').find({ username }).value();

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Verify token
router.get('/verify', authMiddleware, (req, res) => {
    res.json({ valid: true, user: req.user });
});

// Change password
router.post('/change-password', authMiddleware, (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current and new password required' });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ error: 'New password must be at least 8 characters' });
        }

        const user = db.get('users').find({ id: req.user.id }).value();

        const validPassword = bcrypt.compareSync(currentPassword, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        db.get('users').find({ id: req.user.id }).assign({ password: hashedPassword }).write();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ error: 'Failed to change password' });
    }
});

// Get all users (protected - returns usernames only, no passwords)
router.get('/users', authMiddleware, (req, res) => {
    try {
        const users = db.get('users')
            .map(user => ({
                id: user.id,
                username: user.username,
                created_at: user.created_at
            }))
            .value();
        
        res.json(users);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Create new user (protected)
router.post('/users', authMiddleware, (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }

        // Check if username already exists
        const existing = db.get('users').find({ username }).value();
        if (existing) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = {
            id: 'user_' + Date.now(),
            username,
            password: hashedPassword,
            created_at: new Date().toISOString()
        };

        db.get('users').push(newUser).write();

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                username: newUser.username
            }
        });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Delete user (protected)
router.delete('/users/:id', authMiddleware, (req, res) => {
    try {
        const userId = req.params.id;

        // Prevent deleting yourself
        if (userId === req.user.id) {
            return res.status(400).json({ error: 'Cannot delete your own account' });
        }

        const user = db.get('users').find({ id: userId }).value();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        db.get('users').remove({ id: userId }).write();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;

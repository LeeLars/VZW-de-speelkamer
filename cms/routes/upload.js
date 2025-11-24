const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../../images/uploads');
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
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
            cb(new Error('Alleen afbeeldingen zijn toegestaan (jpeg, jpg, png, gif, webp)'));
        }
    }
});

// Upload image endpoint
router.post('/', authMiddleware, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Geen bestand geüpload' });
        }

        // Return both relative and absolute paths
        const relativePath = `./images/uploads/${req.file.filename}`;
        const absolutePath = `/uploads/${req.file.filename}`;
        
        res.json({
            success: true,
            path: relativePath,
            url: absolutePath,
            filename: req.file.filename
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Fout bij uploaden van afbeelding' });
    }
});

// Delete image endpoint
router.delete('/:filename', authMiddleware, (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '../../images/uploads', filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.json({ success: true, message: 'Afbeelding verwijderd' });
        } else {
            res.status(404).json({ error: 'Afbeelding niet gevonden' });
        }
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Fout bij verwijderen van afbeelding' });
    }
});

module.exports = router;

const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for memory storage (no local files)
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Alleen afbeeldingen zijn toegestaan (jpeg, jpg, png, gif, webp)'));
        }
    }
});

// Upload image endpoint
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Geen bestand geüpload' });
        }

        // Upload to Cloudinary using buffer
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'vzw-speelkamer',
                    resource_type: 'image',
                    transformation: [
                        { width: 1200, height: 1200, crop: 'limit' },
                        { quality: 'auto' },
                        { fetch_format: 'auto' }
                    ]
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(req.file.buffer);
        });
        
        res.json({
            success: true,
            path: result.secure_url,
            url: result.secure_url,
            public_id: result.public_id,
            filename: result.original_filename
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Fout bij uploaden van afbeelding' });
    }
});

// Delete image endpoint
router.delete('/:public_id', authMiddleware, async (req, res) => {
    try {
        const publicId = req.params.public_id.replace(/-/g, '/');
        
        const result = await cloudinary.uploader.destroy(publicId);
        
        if (result.result === 'ok') {
            res.json({ success: true, message: 'Afbeelding verwijderd' });
        } else {
            res.status(404).json({ error: 'Afbeelding niet gevonden' });
        }
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Fout bij verwijderen van afbeelding' });
    }
});

// Document upload (e.g., PDF practical info)
const documentUpload = multer({
    storage,
    limits: {
        fileSize: 15 * 1024 * 1024 // 15MB for PDFs
    },
    fileFilter: function (req, file, cb) {
        const allowedTypes = /pdf/;
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Alleen PDF-bestanden zijn toegestaan voor praktische info'));
        }
    }
});

router.post('/document', authMiddleware, documentUpload.single('document'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Geen bestand geüpload' });
        }

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'vzw-speelkamer/practical-info',
                    resource_type: 'raw'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(req.file.buffer);
        });

        res.json({
            success: true,
            path: result.secure_url,
            url: result.secure_url,
            public_id: result.public_id,
            filename: result.original_filename
        });
    } catch (error) {
        console.error('Document upload error:', error);
        res.status(500).json({ error: 'Fout bij uploaden van document' });
    }
});

module.exports = router;

const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const http = require('http');
const https = require('https');
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

// Document upload (practical info - any file type)
const documentUpload = multer({
    storage,
    limits: {
        fileSize: 15 * 1024 * 1024 // 15MB limit
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

// Delete document endpoint (raw files)
router.delete('/document/:public_id(*)', authMiddleware, async (req, res) => {
    try {
        // The public_id comes URL-encoded with slashes replaced by dashes
        // We need to restore the original format
        let publicId = req.params.public_id;
        
        // If it contains dashes that should be slashes (for folder structure)
        // The format is: vzw-speelkamer-practical-info-filename
        // Should become: vzw-speelkamer/practical-info/filename
        if (publicId.startsWith('vzw-speelkamer-practical-info-')) {
            publicId = publicId.replace('vzw-speelkamer-practical-info-', 'vzw-speelkamer/practical-info/');
        }
        
        const result = await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
        
        if (result.result === 'ok' || result.result === 'not found') {
            res.json({ success: true, message: 'Document verwijderd' });
        } else {
            res.status(404).json({ error: 'Document niet gevonden' });
        }
    } catch (error) {
        console.error('Delete document error:', error);
        res.status(500).json({ error: 'Fout bij verwijderen van document' });
    }
});

// Public document preview proxy (iframe-friendly)
router.get('/document/preview', async (req, res) => {
    try {
        const rawUrl = req.query.url;
        if (!rawUrl || typeof rawUrl !== 'string') {
            return res.status(400).json({ error: 'Missing url' });
        }

        let parsed;
        try {
            parsed = new URL(rawUrl);
        } catch {
            return res.status(400).json({ error: 'Invalid url' });
        }

        if (!['http:', 'https:'].includes(parsed.protocol)) {
            return res.status(400).json({ error: 'Invalid url protocol' });
        }

        // Basic SSRF protection: only allow Cloudinary hosted assets
        if (!/\.cloudinary\.com$/i.test(parsed.hostname)) {
            return res.status(400).json({ error: 'Only cloudinary urls are allowed' });
        }

        const requestHeaders = {};
        if (req.headers.range) {
            requestHeaders.Range = req.headers.range;
        }

        const fetchStream = (targetUrl, redirects = 0) => new Promise((resolve, reject) => {
            const u = new URL(targetUrl);
            const lib = u.protocol === 'https:' ? https : http;

            const request = lib.get(u, { headers: requestHeaders }, (upstream) => {
                const status = upstream.statusCode || 0;
                const shouldRedirect = [301, 302, 303, 307, 308].includes(status);
                const location = upstream.headers.location;

                if (shouldRedirect && location && redirects < 5) {
                    upstream.resume();
                    const next = new URL(location, u).toString();
                    fetchStream(next, redirects + 1).then(resolve).catch(reject);
                    return;
                }

                resolve(upstream);
            });

            request.on('error', reject);
        });

        const upstream = await fetchStream(parsed.toString());
        const status = upstream.statusCode || 502;
        if (status < 200 || status >= 300) {
            upstream.resume();
            return res.status(status).json({ error: 'Failed to fetch document' });
        }

        res.status(status);

        const contentType = upstream.headers['content-type'] || 'application/octet-stream';
        const contentLength = upstream.headers['content-length'];
        const contentRange = upstream.headers['content-range'];
        const acceptRanges = upstream.headers['accept-ranges'];

        res.setHeader('Content-Type', contentType);
        if (contentLength) res.setHeader('Content-Length', contentLength);
        if (contentRange) res.setHeader('Content-Range', contentRange);
        if (acceptRanges) res.setHeader('Accept-Ranges', acceptRanges);
        res.setHeader('Content-Disposition', 'inline');
        res.setHeader('Cache-Control', 'no-store');

        upstream.pipe(res);
    } catch (error) {
        console.error('Document preview error:', error);
        res.status(500).json({ error: 'Failed to preview document' });
    }
});

module.exports = router;

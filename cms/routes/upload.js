const express = require('express');
const multer = require('multer');
const ImageKit = require('imagekit');
const http = require('http');
const https = require('https');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
});

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (/jpeg|jpg|png|gif|webp/.test(file.mimetype)) cb(null, true);
        else cb(new Error('Alleen afbeeldingen zijn toegestaan (jpeg, jpg, png, gif, webp)'));
    }
});

router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'Geen bestand geüpload' });
        const result = await imagekit.upload({
            file: req.file.buffer,
            fileName: req.file.originalname || `upload-${Date.now()}.jpg`,
            folder: '/vzw-speelkamer',
            useUniqueFileName: true,
        });
        res.json({ success: true, path: result.url, url: result.url, public_id: result.fileId, filename: result.name });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Fout bij uploaden van afbeelding' });
    }
});

router.delete('/:public_id', authMiddleware, async (req, res) => {
    try {
        await imagekit.deleteFile(req.params.public_id);
        res.json({ success: true, message: 'Afbeelding verwijderd' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: 'Fout bij verwijderen van afbeelding' });
    }
});

const documentUpload = multer({ storage, limits: { fileSize: 15 * 1024 * 1024 } });

router.post('/document', authMiddleware, documentUpload.single('document'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'Geen bestand geüpload' });
        const result = await imagekit.upload({
            file: req.file.buffer,
            fileName: req.file.originalname || `document-${Date.now()}`,
            folder: '/vzw-speelkamer/practical-info',
            useUniqueFileName: true,
        });
        res.json({ success: true, path: result.url, url: result.url, public_id: result.fileId, filename: result.name });
    } catch (error) {
        console.error('Document upload error:', error);
        res.status(500).json({ error: 'Fout bij uploaden van document' });
    }
});

router.delete('/document/:public_id(*)', authMiddleware, async (req, res) => {
    try {
        await imagekit.deleteFile(req.params.public_id);
        res.json({ success: true, message: 'Document verwijderd' });
    } catch (error) {
        console.error('Delete document error:', error);
        res.status(500).json({ error: 'Fout bij verwijderen van document' });
    }
});

router.get('/document/preview', async (req, res) => {
    try {
        const rawUrl = req.query.url;
        if (!rawUrl || typeof rawUrl !== 'string') return res.status(400).json({ error: 'Missing url' });
        let parsed;
        try { parsed = new URL(rawUrl); } catch { return res.status(400).json({ error: 'Invalid url' }); }
        if (!['http:', 'https:'].includes(parsed.protocol)) return res.status(400).json({ error: 'Invalid url protocol' });
        if (!/ik\.imagekit\.io$/i.test(parsed.hostname)) return res.status(400).json({ error: 'Only ImageKit urls are allowed' });

        const requestHeaders = {};
        if (req.headers.range) requestHeaders.Range = req.headers.range;

        const fetchStream = (targetUrl, redirects = 0) => new Promise((resolve, reject) => {
            const u = new URL(targetUrl);
            const lib = u.protocol === 'https:' ? https : http;
            lib.get(u, { headers: requestHeaders }, (upstream) => {
                const status = upstream.statusCode || 0;
                if ([301, 302, 303, 307, 308].includes(status) && upstream.headers.location && redirects < 5) {
                    upstream.resume();
                    fetchStream(new URL(upstream.headers.location, u).toString(), redirects + 1).then(resolve).catch(reject);
                    return;
                }
                resolve(upstream);
            }).on('error', reject);
        });

        const upstream = await fetchStream(parsed.toString());
        const status = upstream.statusCode || 502;
        if (status < 200 || status >= 300) { upstream.resume(); return res.status(status).json({ error: 'Failed to fetch document' }); }
        res.status(status);
        const ct = upstream.headers['content-type'] || 'application/octet-stream';
        res.setHeader('Content-Type', ct);
        if (upstream.headers['content-length']) res.setHeader('Content-Length', upstream.headers['content-length']);
        if (upstream.headers['content-range']) res.setHeader('Content-Range', upstream.headers['content-range']);
        if (upstream.headers['accept-ranges']) res.setHeader('Accept-Ranges', upstream.headers['accept-ranges']);
        res.setHeader('Content-Disposition', 'inline');
        res.setHeader('Cache-Control', 'no-store');
        upstream.pipe(res);
    } catch (error) {
        console.error('Document preview error:', error);
        res.status(500).json({ error: 'Failed to preview document' });
    }
});

module.exports = router;

const express = require('express');
const Video = require('../models/Video');
const { requireAuth, requireVerified } = require('../middleware/auth');
const { buildObjectKey, createPresignedPutUrl, getPublicUrl, deleteObject } = require('../utils/r2');

const router = express.Router();

/**
 * GET /api/videos
 * Query: ?all=true (admin only)
 * Returns list of videos for the authenticated user, or all if admin+all=true
 */
router.get('/', requireAuth, async (req, res) => {
  try {
    const isAdmin = req.user.role === 'admin';
    const wantAll = String(req.query.all || '').toLowerCase() === 'true';

    let filter = { deletedAt: null };
    if (isAdmin && wantAll) {
      // no owner filter
    } else {
      filter.owner = req.user._id;
    }

    const videos = await Video.find(filter).sort({ createdAt: -1 });
    return res.json({ ok: true, videos: videos.map((v) => v.toSafeJSON()) });
  } catch (err) {
    console.error('List videos error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to list videos' });
  }
});

/**
 * POST /api/videos/presign
 * Body: { filename, contentType }
 * Creates a presigned PUT URL to upload directly to Cloudflare R2
 */
router.post('/presign', requireAuth, requireVerified, async (req, res) => {
  try {
    const { filename, contentType } = req.body || {};
    if (!filename) return res.status(400).json({ ok: false, error: 'filename is required' });

    const key = buildObjectKey({ userId: req.user._id.toString(), filename });
    const { uploadUrl } = await createPresignedPutUrl({ key, contentType });
    const publicUrl = getPublicUrl(key);

    return res.json({
      ok: true,
      key,
      uploadUrl,
      publicUrl,
    });
  } catch (err) {
    console.error('Presign error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to create upload URL' });
  }
});

/**
 * POST /api/videos/finalize
 * Body: { key, title, description, size, contentType, isPublic }
 * After client uploads to R2, call this to persist metadata
 */
router.post('/finalize', requireAuth, requireVerified, async (req, res) => {
  try {
    const { key, title, description = '', size = 0, contentType = 'video/mp4', isPublic = false } = req.body || {};
    if (!key || !title) {
      return res.status(400).json({ ok: false, error: 'key and title are required' });
    }

    // Security: ensure key belongs to this user (starts with userId/)
    const expectedPrefix = `${req.user._id.toString()}/`;
    if (!String(key).startsWith(expectedPrefix) && req.user.role !== 'admin') {
      return res.status(400).json({ ok: false, error: 'Invalid key for this user' });
    }

    const publicUrl = getPublicUrl(key);
    if (!publicUrl) {
      return res.status(500).json({ ok: false, error: 'R2_PUBLIC_BASE_URL not configured' });
    }

    let video = await Video.findOne({ r2Key: key, deletedAt: null });
    if (!video) {
      video = new Video({
        title,
        description,
        r2Key: key,
        publicUrl,
        contentType,
        size: Number(size) || 0,
        isPublic: Boolean(isPublic),
        owner: req.user._id,
      });
      await video.save();
    } else {
      // idempotent finalize: update fields
      video.title = title;
      video.description = description;
      video.publicUrl = publicUrl;
      video.contentType = contentType;
      video.size = Number(size) || 0;
      video.isPublic = Boolean(isPublic);
      await video.save();
    }

    return res.status(201).json({ ok: true, video: video.toSafeJSON() });
  } catch (err) {
    console.error('Finalize video error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to save video metadata' });
  }
});

/**
 * GET /api/videos/:id
 * Returns a single video if owner or admin or public
 */
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const v = await Video.findById(req.params.id);
    if (!v || v.deletedAt) return res.status(404).json({ ok: false, error: 'Video not found' });

    const isOwner = v.owner.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    if (!v.isPublic && !isOwner && !isAdmin) {
      return res.status(403).json({ ok: false, error: 'Forbidden' });
    }

    return res.json({ ok: true, video: v.toSafeJSON() });
  } catch (err) {
    console.error('Get video error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to get video' });
  }
});

/**
 * PUT /api/videos/:id
 * Body: { title?, description?, isPublic? }
 * Update metadata; only owner or admin
 */
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const v = await Video.findById(req.params.id);
    if (!v || v.deletedAt) return res.status(404).json({ ok: false, error: 'Video not found' });

    const isOwner = v.owner.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ ok: false, error: 'Forbidden' });

    const { title, description, isPublic } = req.body || {};
    if (typeof title === 'string') v.title = title;
    if (typeof description === 'string') v.description = description;
    if (typeof isPublic !== 'undefined') v.isPublic = Boolean(isPublic);

    await v.save();
    return res.json({ ok: true, video: v.toSafeJSON() });
  } catch (err) {
    console.error('Update video error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to update video' });
  }
});

/**
 * DELETE /api/videos/:id
 * Deletes object from R2 and soft-deletes document
 */
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const v = await Video.findById(req.params.id);
    if (!v || v.deletedAt) return res.status(404).json({ ok: false, error: 'Video not found' });

    const isOwner = v.owner.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ ok: false, error: 'Forbidden' });

    try {
      await deleteObject(v.r2Key);
    } catch (e) {
      // Log but continue to soft-delete metadata to avoid being stuck
      console.warn('R2 delete failed; proceeding to soft-delete metadata:', e?.message || e);
    }

    v.deletedAt = new Date();
    await v.save();

    return res.json({ ok: true });
  } catch (err) {
    console.error('Delete video error:', err);
    return res.status(500).json({ ok: false, error: 'Failed to delete video' });
  }
});

module.exports = router;
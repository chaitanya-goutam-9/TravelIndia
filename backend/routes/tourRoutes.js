const express = require('express');
const router = express.Router();
const { 
  getTours, 
  getTourBySlug,
  createTour, 
  updateTour, 
  deleteTour,
  toggleTourStatus
} = require('../controller/tourPackageController');
const adminAuth = require('../Middleware/adminAuth');

// Public routes
router.get('/', getTours);
router.get('/:slugOrId', getTourBySlug);

// Admin protected routes
router.post('/admin', adminAuth, createTour);
router.put('/admin/:id', adminAuth, updateTour);
router.delete('/admin/:id', adminAuth, deleteTour);
router.patch('/admin/:id/status', adminAuth, toggleTourStatus);
const multer = require('multer');
const { saveImage } = require('../services/media.service');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit before processing
  }
});

// Admin protected route for image upload
router.post('/upload', adminAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }
    const result = await saveImage(req.file, 'tours');
    res.status(200).json({
      success: true,
      url: result.url,
      key: result.key,
      alt: result.alt
    });
  } catch (error) {
    console.error('Error in image upload:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message
    });
  }
});

module.exports = router;
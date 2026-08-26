const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  uploadGuestPhoto,
  getAllGuestPhotos,
  getGuestPhotoById,
  updateGuestPhoto,
  deleteGuestPhoto,
  bulkUploadGuestPhotos
} = require('../controller/guestPhoto.controller');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Routes
router.post('/', upload.single('photo'), uploadGuestPhoto);
router.post('/bulk', upload.array('photos', 10), bulkUploadGuestPhotos);
router.get('/', getAllGuestPhotos);
router.get('/:id', getGuestPhotoById);
router.patch('/:id', updateGuestPhoto);
router.delete('/:id', deleteGuestPhoto);

module.exports = router;
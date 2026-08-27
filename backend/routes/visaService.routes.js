const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  createVisaService,
  getAllVisaServices,
  getVisaServiceById,
  updateVisaService,
  deleteVisaService
} = require('../controller/visaService.controller');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Routes
router.post(
  '/',
  upload.fields([
    { name: 'flag', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
  ]),
  createVisaService
);

router.get('/', getAllVisaServices);
router.get('/:id', getVisaServiceById);

router.patch(
  '/:id',
  upload.fields([
    { name: 'flag', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
  ]),
  updateVisaService
);

router.delete('/:id', deleteVisaService);

module.exports = router;
const GuestPhoto = require('../models/GuestPhoto');
const { saveImage, deleteImage } = require('../services/media.service');
const { buildUrl } = require('../services/s3.service');

/**
 * Upload single guest photo
 * POST /api/guest-photos
 */
const uploadGuestPhoto = async (req, res) => {
  try {
    const { bookingId, customerName } = req.body;

    // Validation
    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID is required'
      });
    }

    if (!customerName) {
      return res.status(400).json({
        success: false,
        message: 'Customer name is required'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Photo file is required'
      });
    }

    // Upload to S3 - only key and alt return hoga
    const uploadResult = await saveImage(req.file, 'guest-photos');

    // Save to database - sirf key aur alt store karo
    const guestPhoto = new GuestPhoto({
      bookingId,
      customerName,
      photoKey: uploadResult.key,
      alt: uploadResult.alt,
      metadata: {
        size: req.file.size,
        format: 'webp',
        width: req.file.width || null,
        height: req.file.height || null
      }
    });

    await guestPhoto.save();

    // Convert to object and add photoUrl for response
    const photoData = guestPhoto.toObject();
    photoData.photoUrl = buildUrl(photoData.photoKey);

    return res.status(201).json({
      success: true,
      message: 'Guest photo uploaded successfully',
      data: photoData
    });

  } catch (error) {
    console.error('Error uploading guest photo:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to upload guest photo',
      error: error.message
    });
  }
};

/**
 * Get all guest photos with pagination and filters
 * GET /api/guest-photos
 */
const getAllGuestPhotos = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      bookingId,
      customerName,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter
    const filter = {};
    if (bookingId) filter.bookingId = bookingId;
    if (customerName) filter.customerName = { $regex: customerName, $options: 'i' };

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    // Execute query
    const [photos, total] = await Promise.all([
      GuestPhoto.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      GuestPhoto.countDocuments(filter)
    ]);

    // Add photoUrl to each photo
    const photosWithUrls = photos.map(photo => ({
      ...photo,
      photoUrl: buildUrl(photo.photoKey)
    }));

    return res.status(200).json({
      success: true,
      data: photosWithUrls,
      pagination: {
        page: parseInt(page),
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
        hasNext: parseInt(page) * limitNum < total,
        hasPrev: parseInt(page) > 1
      }
    });

  } catch (error) {
    console.error('Error fetching guest photos:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch guest photos',
      error: error.message
    });
  }
};

/**
 * Get guest photos by booking ID
 * GET /api/guest-photos/booking/:bookingId
 */
const getGuestPhotosByBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID is required'
      });
    }

    const photos = await GuestPhoto.find({ bookingId })
      .sort({ createdAt: -1 })
      .lean();

    // Add photoUrl to each photo
    const photosWithUrls = photos.map(photo => ({
      ...photo,
      photoUrl: buildUrl(photo.photoKey)
    }));

    return res.status(200).json({
      success: true,
      count: photosWithUrls.length,
      data: photosWithUrls
    });

  } catch (error) {
    console.error('Error fetching guest photos by booking:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch guest photos',
      error: error.message
    });
  }
};

/**
 * Get single guest photo by ID
 * GET /api/guest-photos/:id
 */
const getGuestPhotoById = async (req, res) => {
  try {
    const { id } = req.params;

    const photo = await GuestPhoto.findById(id);
    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Guest photo not found'
      });
    }

    // Convert to object and add photoUrl
    const photoData = photo.toObject();
    photoData.photoUrl = buildUrl(photoData.photoKey);

    return res.status(200).json({
      success: true,
      data: photoData
    });

  } catch (error) {
    console.error('Error fetching guest photo:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch guest photo',
      error: error.message
    });
  }
};

/**
 * Update guest photo (only metadata, not the image itself)
 * PATCH /api/guest-photos/:id
 */
const updateGuestPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerName, alt, bookingId } = req.body;

    const photo = await GuestPhoto.findById(id);
    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Guest photo not found'
      });
    }

    // Update only allowed fields
    if (customerName) photo.customerName = customerName;
    if (alt) photo.alt = alt;
    if (bookingId) photo.bookingId = bookingId;

    await photo.save();

    // Convert to object and add photoUrl
    const photoData = photo.toObject();
    photoData.photoUrl = buildUrl(photoData.photoKey);

    return res.status(200).json({
      success: true,
      message: 'Guest photo updated successfully',
      data: photoData
    });

  } catch (error) {
    console.error('Error updating guest photo:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update guest photo',
      error: error.message
    });
  }
};

/**
 * Delete guest photo (from DB and S3)
 * DELETE /api/guest-photos/:id
 */
const deleteGuestPhoto = async (req, res) => {
  try {
    const { id } = req.params;

    const photo = await GuestPhoto.findById(id);
    if (!photo) {
      return res.status(404).json({
        success: false,
        message: 'Guest photo not found'
      });
    }

    // Delete from S3
    await deleteImage(photo.photoKey);

    // Delete from database
    await photo.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Guest photo deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting guest photo:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete guest photo',
      error: error.message
    });
  }
};

/**
 * Bulk upload guest photos
 * POST /api/guest-photos/bulk
 */
const bulkUploadGuestPhotos = async (req, res) => {
  try {
    const { bookingId, customerName } = req.body;

    if (!bookingId || !customerName) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID and customer name are required'
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one photo file is required'
      });
    }

    const uploadPromises = req.files.map(async (file) => {
      const uploadResult = await saveImage(file, 'guest-photos');

      const guestPhoto = new GuestPhoto({
        bookingId,
        customerName,
        photoKey: uploadResult.key,
        alt: uploadResult.alt,
        metadata: {
          size: file.size,
          format: 'webp',
          width: file.width || null,
          height: file.height || null
        }
      });

      return guestPhoto.save();
    });

    const savedPhotos = await Promise.all(uploadPromises);

    // Add photoUrl to each saved photo
    const photosWithUrls = savedPhotos.map(photo => ({
      ...photo.toObject(),
      photoUrl: buildUrl(photo.photoKey)
    }));

    return res.status(201).json({
      success: true,
      message: `${savedPhotos.length} guest photos uploaded successfully`,
      data: photosWithUrls
    });

  } catch (error) {
    console.error('Error bulk uploading guest photos:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to bulk upload guest photos',
      error: error.message
    });
  }
};

// Export all controllers
module.exports = {
  uploadGuestPhoto,
  getAllGuestPhotos,
  getGuestPhotosByBooking,
  getGuestPhotoById,
  updateGuestPhoto,
  deleteGuestPhoto,
  bulkUploadGuestPhotos
};
const VisaService = require('../models/VisaService');
const { saveImage, deleteImage } = require('../services/media.service');
const { buildUrl } = require('../services/s3.service');

/**
 * Create new visa service
 * POST /api/visa-services
 */
const createVisaService = async (req, res) => {
  try {
    const { visaType, country, appointmentDates, displayOrder } = req.body;

    // Validation
    if (!visaType || !country || !appointmentDates) {
      return res.status(400).json({
        success: false,
        message: 'Visa type, country, and appointment dates are required'
      });
    }

    // Parse appointment dates if string
    let parsedDates = appointmentDates;
    if (typeof appointmentDates === 'string') {
      parsedDates = JSON.parse(appointmentDates);
    }

    // Upload images
    let flagKey = null;
    let bannerKey = null;

    if (req.files) {
      if (req.files.flag) {
        const flagResult = await saveImage(req.files.flag[0], 'visa-flags');
        flagKey = flagResult.key;
      }
      if (req.files.banner) {
        const bannerResult = await saveImage(req.files.banner[0], 'visa-banners');
        bannerKey = bannerResult.key;
      }
    }

    // Validate images
    if (!flagKey) {
      return res.status(400).json({
        success: false,
        message: 'Flag image is required'
      });
    }
    if (!bannerKey) {
      return res.status(400).json({
        success: false,
        message: 'Banner image is required'
      });
    }

    // Create visa service
    const visaService = new VisaService({
      visaType,
      country,
      flagImage: flagKey,
      bannerImage: bannerKey,
      appointmentDates: parsedDates,
      displayOrder: displayOrder || 0
    });

    await visaService.save();

    // Add URLs to response
    const visaData = visaService.toObject();
    visaData.flagUrl = buildUrl(visaData.flagImage);
    visaData.bannerUrl = buildUrl(visaData.bannerImage);

    return res.status(201).json({
      success: true,
      message: 'Visa service created successfully',
      data: visaData
    });

  } catch (error) {
    console.error('Error creating visa service:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create visa service',
      error: error.message
    });
  }
};


/**
 * Get all visa services with filters
 * GET /api/visa-services
 */
const getAllVisaServices = async (req, res) => {
  try {
    const { visaType, isActive, page = 1, limit = 100 } = req.query;

    const filter = {};
    if (visaType) filter.visaType = visaType;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    const [visas, total] = await Promise.all([
      VisaService.find(filter)
        .sort({ displayOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      VisaService.countDocuments(filter)
    ]);

    // Add URLs to each visa
    const visasWithUrls = visas.map(visa => ({
      ...visa,
      flagUrl: buildUrl(visa.flagImage),
      bannerUrl: buildUrl(visa.bannerImage)
    }));

    return res.status(200).json({
      success: true,
      data: visasWithUrls,
      pagination: {
        page: parseInt(page),
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });

  } catch (error) {
    console.error('Error fetching visa services:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch visa services',
      error: error.message
    });
  }
};

/**
 * Get visa service by ID
 * GET /api/visa-services/:id
 */
const getVisaServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const visa = await VisaService.findById(id).lean();
    if (!visa) {
      return res.status(404).json({
        success: false,
        message: 'Visa service not found'
      });
    }

    // Add URLs
    const visaData = {
      ...visa,
      flagUrl: buildUrl(visa.flagImage),
      bannerUrl: buildUrl(visa.bannerImage)
    };

    return res.status(200).json({
      success: true,
      data: visaData
    });

  } catch (error) {
    console.error('Error fetching visa service:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch visa service',
      error: error.message
    });
  }
};

/**
 * Update visa service
 * PATCH /api/visa-services/:id
 */
const updateVisaService = async (req, res) => {
  try {
    const { id } = req.params;
    const { country, appointmentDates, displayOrder, isActive } = req.body;

    const visa = await VisaService.findById(id);
    if (!visa) {
      return res.status(404).json({
        success: false,
        message: 'Visa service not found'
      });
    }

    // Update fields
    if (country) visa.country = country;
    if (displayOrder !== undefined) visa.displayOrder = displayOrder;
    if (isActive !== undefined) visa.isActive = isActive;

    // Update appointment dates
    if (appointmentDates) {
      let parsedDates = appointmentDates;
      if (typeof appointmentDates === 'string') {
        parsedDates = JSON.parse(appointmentDates);
      }
      visa.appointmentDates = parsedDates;
    }

    // Update images if new ones are uploaded
    if (req.files) {
      if (req.files.flag) {
        // Delete old flag image
        if (visa.flagImage) {
          await deleteImage(visa.flagImage);
        }
        const flagResult = await saveImage(req.files.flag[0], 'visa-flags');
        visa.flagImage = flagResult.key;
      }
      if (req.files.banner) {
        // Delete old banner image
        if (visa.bannerImage) {
          await deleteImage(visa.bannerImage);
        }
        const bannerResult = await saveImage(req.files.banner[0], 'visa-banners');
        visa.bannerImage = bannerResult.key;
      }
    }

    await visa.save();

    // Add URLs to response
    const visaData = visa.toObject();
    visaData.flagUrl = buildUrl(visaData.flagImage);
    visaData.bannerUrl = buildUrl(visaData.bannerImage);

    return res.status(200).json({
      success: true,
      message: 'Visa service updated successfully',
      data: visaData
    });

  } catch (error) {
    console.error('Error updating visa service:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update visa service',
      error: error.message
    });
  }
};

/**
 * Delete visa service
 * DELETE /api/visa-services/:id
 */
const deleteVisaService = async (req, res) => {
  try {
    const { id } = req.params;

    const visa = await VisaService.findById(id);
    if (!visa) {
      return res.status(404).json({
        success: false,
        message: 'Visa service not found'
      });
    }

    // Delete images from S3
    if (visa.flagImage) {
      await deleteImage(visa.flagImage);
    }
    if (visa.bannerImage) {
      await deleteImage(visa.bannerImage);
    }

    // Delete from database
    await visa.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Visa service deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting visa service:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete visa service',
      error: error.message
    });
  }
};

module.exports = {
  createVisaService,
  getAllVisaServices,
  getVisaServiceById,
  updateVisaService,
  deleteVisaService
};
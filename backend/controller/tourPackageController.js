const TourPackage = require('../models/TourPackage');
const Category = require('../models/Category');
const Destination = require('../models/Destination');
const mongoose = require('mongoose');

// Public: Get tour packages based on queries
exports.getTours = async (req, res) => {
  try {
    const { category, isPopular, region, destination, limit, search } = req.query;
    let query = { isActive: true };

    // Filter by Popular
    if (isPopular !== undefined) {
      query.isPopular = isPopular === 'true';
    }

    // Filter by Category slug or ID
    if (category) {
      const cat = await Category.findOne({ slug: category });
      if (cat) {
        query.categories = cat._id;
      } else {
        // Try to find by ID if slug not found
        const catById = await Category.findById(category);
        if (catById) {
          query.categories = catById._id;
        } else {
          return res.status(200).json({ success: true, count: 0, data: [] });
        }
      }
    }

    // Filter by Destination ID
    if (destination) {
      query.destination = destination;
    }

    // Filter by Region
    if (region) {
      const destinationsInRegion = await Destination.find({ region }).select('_id');
      const destIds = destinationsInRegion.map(d => d._id);
      query.destination = { $in: destIds };
    }

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Build query with population
    let toursQuery = TourPackage.find(query)
      .populate('destination')
      .populate('categories')
      .sort({ createdAt: -1 });

    // Apply limit if provided
    if (limit && !isNaN(limit)) {
      toursQuery = toursQuery.limit(parseInt(limit));
    }

    const tours = await toursQuery.exec();
    
    res.status(200).json({ 
      success: true, 
      count: tours.length, 
      data: tours 
    });
  } catch (error) {
    console.error('Error fetching tours:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
};

// Public: Get single tour by slug or ID
exports.getTourBySlug = async (req, res) => {
  try {
    const { slugOrId } = req.params;
    let query = { isActive: true };

    // Check if it's an ObjectId or slug
    if (mongoose.Types.ObjectId.isValid(slugOrId)) {
      query._id = slugOrId;
    } else {
      query.slug = slugOrId;
    }

    const tour = await TourPackage.findOne(query)
      .populate('destination')
      .populate('categories');

    if (!tour) {
      return res.status(404).json({ 
        success: false, 
        message: 'Tour package not found' 
      });
    }

    // Increment view count if you have that field
    // tour.views = (tour.views || 0) + 1;
    // await tour.save();

    res.status(200).json({ 
      success: true, 
      data: tour 
    });
  } catch (error) {
    console.error('Error fetching tour:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
};

// Admin: Create new tour package
exports.createTour = async (req, res) => {
  try {
    // Validate required fields
    const { title, startingPrice, destination, duration, overview } = req.body;
    if (!title || !startingPrice || !destination || !duration || !overview) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, startingPrice, destination, duration, overview'
      });
    }

    // Check if tour with same title exists
    const existingTour = await TourPackage.findOne({ title });
    if (existingTour) {
      return res.status(400).json({
        success: false,
        message: 'A tour with this title already exists'
      });
    }

    // Create tour
    const tour = await TourPackage.create(req.body);
    
    // Populate references
    await tour.populate('destination');
    await tour.populate('categories');

    res.status(201).json({ 
      success: true, 
      data: tour,
      message: 'Tour package created successfully'
    });
  } catch (error) {
    console.error('Error creating tour:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A tour with this title or slug already exists'
      });
    }

    res.status(400).json({ 
      success: false, 
      message: 'Bad Request', 
      error: error.message 
    });
  }
};

// Admin: Update tour package
exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find existing tour
    const existingTour = await TourPackage.findById(id);
    if (!existingTour) {
      return res.status(404).json({ 
        success: false, 
        message: 'Tour Package not found' 
      });
    }

    // Check for duplicate title
    if (req.body.title && req.body.title !== existingTour.title) {
      const duplicateTour = await TourPackage.findOne({ 
        title: req.body.title,
        _id: { $ne: id }
      });
      if (duplicateTour) {
        return res.status(400).json({
          success: false,
          message: 'Another tour with this title already exists'
        });
      }
    }

    // Update tour
    const tour = await TourPackage.findByIdAndUpdate(
      id, 
      req.body, 
      { 
        new: true, 
        runValidators: true 
      }
    )
    .populate('destination')
    .populate('categories');

    res.status(200).json({ 
      success: true, 
      data: tour,
      message: 'Tour package updated successfully'
    });
  } catch (error) {
    console.error('Error updating tour:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A tour with this title or slug already exists'
      });
    }

    res.status(400).json({ 
      success: false, 
      message: 'Bad Request', 
      error: error.message 
    });
  }
};

// Admin: Delete tour package
exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    
    const tour = await TourPackage.findByIdAndDelete(id);
    if (!tour) {
      return res.status(404).json({ 
        success: false, 
        message: 'Tour Package not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: {},
      message: 'Tour package deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting tour:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
};

// Admin: Toggle tour status (active/inactive)
exports.toggleTourStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const tour = await TourPackage.findById(id);
    if (!tour) {
      return res.status(404).json({ 
        success: false, 
        message: 'Tour Package not found' 
      });
    }

    tour.isActive = isActive !== undefined ? isActive : !tour.isActive;
    await tour.save();

    res.status(200).json({ 
      success: true, 
      data: tour,
      message: `Tour ${tour.isActive ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    console.error('Error toggling tour status:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
};

// Helper function to generate slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
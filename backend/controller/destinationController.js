const Destination = require('../models/Destination');

// Public: Get all destinations (optional filter by region)
exports.getDestinations = async (req, res) => {
  try {
    const { region } = req.query;
    let query = {};
    if (region) query.region = region;
    
    const destinations = await Destination.find(query);
    res.status(200).json({ success: true, count: destinations.length, data: destinations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Admin: Create new destination
exports.createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json({ success: true, data: destination });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Bad Request', error: error.message });
  }
};

// Admin: Update destination
exports.updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.status(200).json({ success: true, data: destination });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Bad Request', error: error.message });
  }
};

// Admin: Delete destination
exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) return res.status(404).json({ success: false, message: 'Destination not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

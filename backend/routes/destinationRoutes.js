const express = require('express');
const router = express.Router();
const { getDestinations, createDestination, updateDestination, deleteDestination } = require('../controller/destinationController');
const adminAuth = require('../Middleware/adminAuth');

// Public route
router.get('/', getDestinations);

// Admin protected routes
router.post('/admin', adminAuth, createDestination);
router.put('/admin/:id', adminAuth, updateDestination);
router.delete('/admin/:id', adminAuth, deleteDestination);

module.exports = router;

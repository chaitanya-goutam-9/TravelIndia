const express = require('express');
const router = express.Router();
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controller/categoryController');
const adminAuth = require('../Middleware/adminAuth');

// Public route
router.get('/', getCategories);

// Admin protected routes
router.post('/admin', adminAuth, createCategory);
router.put('/admin/:id', adminAuth, updateCategory);
router.delete('/admin/:id', adminAuth, deleteCategory);

module.exports = router;

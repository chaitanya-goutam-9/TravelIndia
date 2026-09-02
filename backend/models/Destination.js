const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Destination name is required'],
    trim: true
  },
  region: {
    type: String,
    enum: ['India', 'World'],
    required: [true, 'Region must be India or World']
  },
  zone: {
    type: String, // e.g., 'North India', 'South India'
    required: false
  },
  image: {
    type: String, // Can store image URL or S3 key
    required: false
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for faster queries on navbars
destinationSchema.index({ region: 1 });

module.exports = mongoose.model('Destination', destinationSchema);

const mongoose = require('mongoose');

const guestPhotoSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: [true, 'Booking ID is required'],
    trim: true,
    index: true
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  photoKey: {
    type: String,
    required: [true, 'Photo key is required'],
    unique: true
  },
  // photoUrl field hata diya
  alt: {
    type: String,
    default: 'Guest photo'
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  metadata: {
    size: Number,
    format: String,
    width: Number,
    height: Number
  }
}, {
  timestamps: true
});

// Index for faster queries
guestPhotoSchema.index({ bookingId: 1, createdAt: -1 });

module.exports = mongoose.model('GuestPhoto', guestPhotoSchema);
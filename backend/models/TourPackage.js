const mongoose = require('mongoose');

const itineraryDaySchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },

});

const tourPackageSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    unique: true
  },
  startingPrice: {
    type: Number,
    required: [true, 'Starting price is required'],
    min: [0, 'Price cannot be negative']
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: [true, 'Destination is required']
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true
  },
  tourType: {
    type: String,
    default: 'Daily Tour',
    trim: true
  },
  groupSize: {
    type: String,
    default: 'Unlimited',
    trim: true
  },
  languages: [{
    type: String,
    trim: true
  }],
  isPopular: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },

  // Images
  thumbnailImage: {
    type: String,
    default: ''
  },
  bannerImages: [{
    type: String,
    default: ''
  }],

  // Overview & Details
  overview: {
    type: String,
    default: '',
    required: [true, 'Overview is required']
  },
  highlights: [{
    type: String,
    trim: true
  }],
  included: [{
    type: String,
    trim: true
  }],
  excluded: [{
    type: String,
    trim: true
  }],

  // Itinerary
  itinerary: [itineraryDaySchema],

  // SEO
  metaTitle: {
    type: String,
    default: ''
  },
  metaDescription: {
    type: String,
    default: ''
  },
  slug: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true
  }

}, {
  timestamps: true
});

// Auto-generate slug from title if not provided
tourPackageSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Indexes for efficient queries
tourPackageSchema.index({ categories: 1 });
tourPackageSchema.index({ isPopular: 1 });
tourPackageSchema.index({ destination: 1 });
tourPackageSchema.index({ slug: 1 });
tourPackageSchema.index({ isActive: 1 });

module.exports = mongoose.model('TourPackage', tourPackageSchema);
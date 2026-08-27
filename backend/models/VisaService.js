const mongoose = require('mongoose');

const visaServiceSchema = new mongoose.Schema({
  // Visa Type: "upcoming" or "biometric"
  visaType: {
    type: String,
    enum: ['upcoming', 'biometric'],
    required: true
  },
  country: {
    type: String,
    required: [true, 'Country name is required'],
    trim: true
  },
  flagImage: {
    type: String,
    required: [true, 'Flag image key is required']
  },
  bannerImage: {
    type: String,
    required: [true, 'Banner image key is required']
  },
  // Multiple appointment dates
  appointmentDates: [{
    month: {
      type: String,
      required: true,
      enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    day: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^([1-9]|[12][0-9]|3[01])$/.test(v);
        },
        message: 'Day must be between 1 and 31'
      }
    },
    year: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^[0-9]{4}$/.test(v);
        },
        message: 'Year must be 4 digits'
      }
    }
  }],
  // Order for display
  displayOrder: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes for better performance
visaServiceSchema.index({ visaType: 1, displayOrder: 1 });
visaServiceSchema.index({ country: 1 });

module.exports = mongoose.model('VisaService', visaServiceSchema);
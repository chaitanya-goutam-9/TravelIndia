const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  region: { type: String, enum: ['India', 'World'], required: true },
  zone: { type: String },
  image: { type: String },
  description: { type: String }
}, { timestamps: true });

const Destination = mongoose.model('Destination', destinationSchema);

const MONGODB_URI = 'mongodb://localhost:27017/travel-india-tourism';

const seedData = [
  // North India
  { name: 'Kashmir', region: 'India', zone: 'North India', slug: 'kashmir' },
  { name: 'Rajasthan', region: 'India', zone: 'North India', slug: 'rajasthan' },
  { name: 'Leh Ladakh', region: 'India', zone: 'North India', slug: 'leh-ladakh' },
  { name: 'Uttarakhand', region: 'India', zone: 'North India', slug: 'uttarakhand' },
  { name: 'Himachal Pradesh', region: 'India', zone: 'North India', slug: 'himachal-pradesh' },

  // South India
  { name: 'Kerala', region: 'India', zone: 'South India', slug: 'kerala' },
  { name: 'Andaman', region: 'India', zone: 'South India', slug: 'andaman' },
  { name: 'Karnataka', region: 'India', zone: 'South India', slug: 'karnataka' },
  { name: 'Tamil Nadu', region: 'India', zone: 'South India', slug: 'tamil-nadu' },
  { name: 'Andhra Pradesh', region: 'India', zone: 'South India', slug: 'andhra-pradesh' },

  // East India
  { name: 'Assam', region: 'India', zone: 'East India', slug: 'assam' },
  { name: 'Sikkim', region: 'India', zone: 'East India', slug: 'sikkim' },
  { name: 'Meghalaya', region: 'India', zone: 'East India', slug: 'meghalaya' },
  { name: 'West Bengal', region: 'India', zone: 'East India', slug: 'west-bengal' },
  { name: 'Arunachal Pradesh', region: 'India', zone: 'East India', slug: 'arunachal-pradesh' },

  // West India
  { name: 'Goa', region: 'India', zone: 'West India', slug: 'goa' },
  { name: 'Gujarat', region: 'India', zone: 'West India', slug: 'gujarat' },
  { name: 'Maharastra', region: 'India', zone: 'West India', slug: 'maharastra' },
  { name: 'Chhattisgarh', region: 'India', zone: 'West India', slug: 'chhattisgarh' },
  { name: 'Madhya Pradesh', region: 'India', zone: 'West India', slug: 'madhya-pradesh' }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    for (const item of seedData) {
      const exists = await Destination.findOne({ name: item.name });
      if (!exists) {
        await Destination.create(item);
        console.log(`Added ${item.name}`);
      } else {
        await Destination.updateOne({ _id: exists._id }, { $set: { zone: item.zone } });
        console.log(`Updated ${item.name}`);
      }
    }
    
    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    mongoose.disconnect();
  }
}

seed();

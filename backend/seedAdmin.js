require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('ADMIN_EMAIL or ADMIN_PASSWORD missing in .env');
    process.exit(1);
  }

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log('Admin already exists — skipping seed.');
    process.exit(0);
  }

  await Admin.create({ email, password });
  console.log(`Admin seeded → email: ${email}`);
  process.exit(0);
};

seed().catch((err) => { console.error(err); process.exit(1); });

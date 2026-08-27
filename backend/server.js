require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const guestPhotoRoutes = require('./routes/guestPhoto.routes');
const visaServiceRoutes = require('./routes/visaService.routes');


const app = express();

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/admin/auth', require('./routes/adminAuthRoutes'));
app.use('/api/guest-photos', guestPhotoRoutes);
app.use('/api/visa-services', visaServiceRoutes);


// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

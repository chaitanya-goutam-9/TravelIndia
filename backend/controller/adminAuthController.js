const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateTokens = (adminId) => {
  const accessToken = jwt.sign(
    { id: adminId },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES }
  );
  const refreshToken = jwt.sign(
    { id: adminId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES }
  );
  return { accessToken, refreshToken };
};

// POST /api/admin/login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  const admin = await Admin.findOne({ email });
  if (!admin)
    return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await admin.comparePassword(password);
  if (!isMatch)
    return res.status(401).json({ message: 'Invalid credentials' });

  const { accessToken, refreshToken } = generateTokens(admin._id);

  // Send refresh token in httpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({ accessToken });
};

// POST /api/admin/logout
const logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
};

// POST /api/admin/refresh
const refresh = (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.JWT_ACCESS_EXPIRES }
    );
    res.json({ accessToken });
  } catch {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

module.exports = { login, logout, refresh };

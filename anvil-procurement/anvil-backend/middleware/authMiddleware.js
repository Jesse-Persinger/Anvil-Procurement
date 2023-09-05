const jwt = require('jsonwebtoken');
const { User } = require('../models/User'); // Adjust the import path as needed
const bcrypt = require('bcrypt');


// Secret key for JWT (replace with your own secret)
const jwtSecret = 'cc15eb3dfe2c2bdf9018548da81e923ca5836bea8ff7896173200fa4687093db';

// Middleware for user authentication using JWT
const authenticateUser = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

// Middleware for user authorization (example: admin role)
const authorizeAdmin = async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied. Not authorized.' });
  }
};

// Middleware to hash a user's password before saving
const hashPassword = async (req, res, next) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }
  next();
};

module.exports = {
  authenticateUser,
  authorizeAdmin,
  hashPassword,
};
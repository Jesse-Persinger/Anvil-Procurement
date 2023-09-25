// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const Cart = require('../models/Cart')
const Budget = require('../models/Budget')
const { authenticateUser, authorizeAdmin, hashPassword } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to create a new user
router.post('/', hashPassword, async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, email, password } = req.body;

    // Check if the username or email already exists (You can add additional validation here)
    const existingUser = await User.findOne({
      where: { username },
    });

    const existingEmail = await User.findOne({
      where: { email },
    });

    if (existingUser || existingEmail) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // The hashed password is now available in req.body.password
    // Create a new user record in the database
    const newUser = await User.create({
      username,
      email,
      password: req.body.password, // Use the hashed password from req.body
    });

    // Create a cart for the new user
    const newCart = await Cart.create({
      quantity: 0, // You can set an initial quantity if needed
      userCartId: newUser.id, // Associate the cart with the newly created user
    });

    // Create a budget for the new user
    const newBudget = await Budget.create({
      budget_amount: 35000, // You can set an initial budget amount if needed
      userId: newUser.id, // Associate the budget with the newly created user
    });

    // Respond with the newly created user
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Example protected route that requires authentication and authorization
router.get('/admin', authenticateUser, authorizeAdmin, async (req, res) => {
  // Only accessible to authenticated users with the "admin" role
  res.json({ message: 'Admin access granted.' });
});

// Read
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update
router.put('/:id', async (req, res) => {
  // ... similar to your previous code
});

// Delete
router.delete('/:id', async (req, res) => {
  // ... similar to your previous code
});

module.exports = router;
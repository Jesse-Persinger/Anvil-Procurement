const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Route to retrieve all items
router.get('/api/items', async (req, res) => {
  try {
    // Fetch all items from the database
    const items = await Item.findAll();

    // Return the items as JSON response
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const Vendor = require('../models/Vendor')
const { Op } = require('sequelize');

// Route to retrieve all items
router.get('/items', async (req, res) => {
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

// Route to retrieve all vendors
router.get('/vendors', async (req, res) => {
  try {
    // Fetch all vendors from the database
    const vendors = await Vendor.findAll();

    // Return the items as JSON response
    res.json(vendors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a route to get items by vendor_id
router.get('/items/:vendor_id', async (req, res) => {
  const { vendor_id } = req.params;

  try {
    const items = await Item.findAll({ where: { vendor_id } });
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
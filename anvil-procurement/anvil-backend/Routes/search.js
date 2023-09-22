const express = require('express');
const router = express.Router();
const sequelize = require('../db'); // Import the Sequelize instance

// Endpoint for searching items
router.get('/items', async (req, res) => {
  const { searchString, vendorId } = req.query;

  try {
    const searchResults = await sequelize.query(
      `SELECT * FROM "items" WHERE "name" ILIKE :searchString AND "vendor_id" = :vendorId`,
      {
        replacements: { searchString: `%${searchString}%`, vendorId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json(searchResults);
  } catch (error) {
    console.error('Error searching for items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
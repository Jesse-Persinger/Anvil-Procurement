const Sequelize = require('sequelize');
const sequelize = require('../db');

const Item = sequelize.define('item', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  price: Sequelize.DECIMAL(10, 2)
});

module.exports = Item;
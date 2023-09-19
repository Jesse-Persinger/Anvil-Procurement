const Sequelize = require('sequelize');
const sequelize = require('../db');

const Item = sequelize.define('item', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  price: Sequelize.DECIMAL(10, 2),
  imgUrl: Sequelize.STRING,
  vendor: Sequelize.STRING
});

module.exports = Item;
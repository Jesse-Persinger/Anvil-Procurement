const Sequelize = require('sequelize');
const sequelize = require('../db');

const Item = sequelize.define('item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true, // This makes 'id' the primary key
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  price: Sequelize.DECIMAL(10, 2),
  imgUrl: Sequelize.STRING,
  vendor_id: Sequelize.INTEGER,
});

module.exports = Item;
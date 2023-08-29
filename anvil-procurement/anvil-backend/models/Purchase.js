const Sequelize = require('sequelize');
const sequelize = require('./db');

const Purchase = sequelize.define('purchase', {
  purchase_date: Sequelize.DATE,
  quantity: Sequelize.INTEGER,
  unit_price: Sequelize.DECIMAL(10, 2)
});

module.exports = Purchase;
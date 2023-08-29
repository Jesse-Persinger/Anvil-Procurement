const Sequelize = require('sequelize');
const sequelize = require('./db');

const PurchaseOrder = sequelize.define('purchase_order', {
  order_date: Sequelize.DATE,
  total_amount: Sequelize.DECIMAL(10, 2)
});

module.exports = PurchaseOrder;
const Sequelize = require('sequelize');
const sequelize = require('./db');

const PurchaseOrderItem = sequelize.define('po_item', {
  quantity: Sequelize.INTEGER,
  unit_price: Sequelize.DECIMAL(10, 2)
});

module.exports = PurchaseOrderItem;
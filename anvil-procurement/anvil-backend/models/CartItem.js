const Sequelize = require('sequelize');
const sequelize = require('../db');

const CartItem = sequelize.define('cart_item', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, // This makes 'id' the primary key
        autoIncrement: true,
      },
    quantity: Sequelize.INTEGER,
    unit_price: Sequelize.DECIMAL(10, 2),
    cartId: Sequelize.INTEGER,
    itemId: Sequelize.INTEGER,
  });

module.exports = CartItem;



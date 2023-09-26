const Sequelize = require('sequelize');
const sequelize = require('../db');

const Cart = sequelize.define('cart', {
  quantity: Sequelize.INTEGER,
  total_amount: Sequelize.DECIMAL(10, 2),
  userCartId: Sequelize.INTEGER,
  
});

module.exports = Cart;
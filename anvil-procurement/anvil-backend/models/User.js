const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  cart: Sequelize.INTEGER
});

module.exports = User;
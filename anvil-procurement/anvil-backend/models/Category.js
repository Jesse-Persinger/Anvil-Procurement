const Sequelize = require('sequelize');
const sequelize = require('./db');

const Category = sequelize.define('category', {
  name: Sequelize.STRING
});

module.exports = Category;
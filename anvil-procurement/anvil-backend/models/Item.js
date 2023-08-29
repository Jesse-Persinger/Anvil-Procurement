const Sequelize = require('sequelize');
const sequelize = require('./db');

const Item = sequelize.define('item', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT
});

module.exports = Item;
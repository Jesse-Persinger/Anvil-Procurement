const Sequelize = require('sequelize');

// Replace these values with your actual database credentials
const sequelize = new Sequelize('anvil-procurement', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
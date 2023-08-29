const Sequelize = require('sequelize');
const sequelize = require('./db');

const Vendor = sequelize.define('vendor', {
  name: Sequelize.STRING,
  contact_name: Sequelize.STRING,
  contact_email: Sequelize.STRING,
  contact_phone: Sequelize.STRING
});

module.exports = Vendor;
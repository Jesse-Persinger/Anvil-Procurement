const Sequelize = require('sequelize');
const sequelize = require('./db');

const Budget = sequelize.define('budget', {
  budget_amount: Sequelize.DECIMAL(10, 2)
});

module.exports = Budget;
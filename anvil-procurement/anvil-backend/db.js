const Sequelize = require('sequelize');

//Replace these values with your actual database credentials
const sequelize = new Sequelize(process.env.DATABASE_URL || 'anvil-procurement', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres'
});

// const sequelize = new Sequelize('anvilDb', 'Mau5trap91', 'password', {
//   host: 'rds-anvil-db.cnilt0q0gjft.us-east-1.rds.amazonaws.com',
//   dialect: 'postgres'
// });

module.exports = sequelize;
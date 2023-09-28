const Sequelize = require('sequelize');

//Replace these values with your actual database credentials
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://store_8748_user:KH62fXNxksEYiNFQH8QBet2krp1jSmx3@dpg-ckau5qsiibqc738dmk10-a/store_8748');

// const sequelize = new Sequelize('anvilDb', 'Mau5trap91', 'password', {
//   host: 'rds-anvil-db.cnilt0q0gjft.us-east-1.rds.amazonaws.com',
//   dialect: 'postgres'
// });

module.exports = sequelize;
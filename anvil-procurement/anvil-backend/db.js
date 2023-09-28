const Sequelize = require('sequelize');

//Replace these values with your actual database credentials
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://admin:u0qT5u2BM0zMEciNwVjV9dH2IBgIzK3v@dpg-ckaqk5kiibqc73abb99g-a/anvildb_yaxn');

// const sequelize = new Sequelize('anvilDb', 'Mau5trap91', 'password', {
//   host: 'rds-anvil-db.cnilt0q0gjft.us-east-1.rds.amazonaws.com',
//   dialect: 'postgres'
// });

module.exports = sequelize;
const Sequelize = require('sequelize');

//Replace these values with your actual database credentials
const sequelize = new Sequelize(process.env.DATABASE_URL || 'anvildb_z5ry', 'admin', 'uBNcRZ3TbrEJ6MjfRmCxR1jp1XvTchsG', {
  host: 'dpg-ckatujfs0fgc73avkhc0-a',
  dialect: 'postgres'
});

// const sequelize = new Sequelize('anvilDb', 'Mau5trap91', 'password', {
//   host: 'rds-anvil-db.cnilt0q0gjft.us-east-1.rds.amazonaws.com',
//   dialect: 'postgres'
// });

module.exports = sequelize;
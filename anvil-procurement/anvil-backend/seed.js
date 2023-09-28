const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('./db'); 

// Define models
const User = sequelize.define('user', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  cart: Sequelize.INTEGER
});

const Vendor = sequelize.define('vendor', {
  name: Sequelize.STRING,
  contact_name: Sequelize.STRING,
  contact_email: Sequelize.STRING,
  contact_phone: Sequelize.STRING
});

const Category = sequelize.define('category', {
  name: Sequelize.STRING,
});

const Item = sequelize.define('item', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  price: Sequelize.DECIMAL(10, 2),
  imgUrl: Sequelize.STRING,
  vendor_id: Sequelize.INTEGER
});

const Cart = sequelize.define('cart', {
  quantity: Sequelize.INTEGER,
  total_amount: Sequelize.DECIMAL(10, 2),
  userCartId: Sequelize.INTEGER,
});

const Budget = sequelize.define('budget', {
  budget_amount: Sequelize.DECIMAL(10, 2)
});

const Purchase = sequelize.define('purchase', {
  purchase_date: Sequelize.DATE,
  quantity: Sequelize.INTEGER,
  unit_price: Sequelize.DECIMAL(10, 2)
});

const PurchaseOrder = sequelize.define('purchase_order', {
  order_date: Sequelize.DATE,
  total_amount: Sequelize.DECIMAL(10, 2)
});

const PurchaseOrderItem = sequelize.define('po_item', {
  quantity: Sequelize.INTEGER,
  unit_price: Sequelize.DECIMAL(10, 2)
});

const CartItem = sequelize.define('cart_item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true, // This makes 'id' the primary key
    autoIncrement: true,
  },
quantity: Sequelize.INTEGER,
unit_price: Sequelize.DECIMAL(10, 2)
});

// Define associations
// Vendor.hasMany(Item);
Category.hasMany(Item);
User.hasOne(Budget);
User.hasMany(Purchase);
User.hasMany(PurchaseOrder);
User.hasOne(Cart, { as: 'userCart' });
Vendor.hasMany(PurchaseOrder);
Item.hasMany(Purchase);
Item.hasMany(PurchaseOrderItem);
PurchaseOrder.hasMany(PurchaseOrderItem);
Item.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Item, { through: CartItem });

// Sync the models with the database
sequelize.sync({ force: true }).then(async () => {
  console.log('Database synced and seeded.');
}).catch(error => {
  console.error('Error syncing database:', error);
})
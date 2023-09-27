const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

// Replace these values with your actual database credentials
const sequelize = new Sequelize('anvil-procurement', 'postgres', '12345', {
  host: 'localhost',
  dialect: 'postgres'
});

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
  // Seed initial data
  // const user = await User.create({ username: 'admin', email: 'jesse@example.com', password: '12345' });
  // const category = await Category.create({ name: 'Office Supplies' });
  // const vendor = await Vendor.create({ name: 'Office Depot' });
  // const item = await Item.create({ name: 'Notepad', description: 'A standard office notepad', category_id: category.id, vendor_id: vendor.id });
  // const budget = await Budget.create({ userId: user.id, category_id: category.id, budget_amount: 1000 });
  // const purchase = await Purchase.create({ userId: user.id, itemId: item.id, purchase_date: new Date(), quantity: 10, unit_price: 5 });
  // const purchaseOrder = await PurchaseOrder.create({ userId: user.id, vendor_id: vendor.id, order_date: new Date(), total_amount: 50 });
  // const poItem = await PurchaseOrderItem.create({ purchaseOrderId: purchaseOrder.id, itemId: item.id, quantity: 20, unit_price: 2 });
  // const cart = await Cart.create({ userCartId: 1, quantity: 5, total_amount: 102.50 })

  console.log('Database synced and seeded.');
}).catch(error => {
  console.error('Error syncing database:', error);
});
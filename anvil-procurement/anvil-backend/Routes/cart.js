const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Item = require('../models/Item');
const CartItem = require('../models/CartItem');

//route to add item to cartItems
router.post('/:cartId/addItem/:itemId', async (req, res) => {
  try {
    const { cartId, itemId } = req.params;

    // Find the cart and item
    const cart = await Cart.findByPk(cartId);
    const item = await Item.findByPk(itemId);

    if (!cart || !item) {
      return res.status(404).json({ error: 'Cart or item not found' });
    }

    // Check if the item already exists in the cart
    const existingCartItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        itemId: item.id,
      },
    });

    if (existingCartItem) {
      // If the item exists, increase the quantity by one
      existingCartItem.quantity += 1;
      await existingCartItem.save();
    } else {
      // If the item does not exist, create a new cart item with quantity 1
      CartItem.create({ unit_price: item.price, itemId: item.id, cartId: cart.id, quantity: 1 });
    }

    res.status(200).json();
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Define a route to get all items by cart ID
router.get('/cart-items/:cartId', async (req, res) => {
  const { cartId } = req.params;

  try {
    // Find all cart items that match the provided cart ID
    const cartItems = await CartItem.findAll({
      where: { cartId: cartId },
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ error: 'No cart items found for the provided cart ID' });
    }

    // Extract the item IDs and quantities from the cart items
    const itemData = cartItems.map((cartItem) => ({
      itemId: cartItem.itemId,
      quantity: cartItem.quantity,
    }));

    // Extract the item IDs from the cart items
    const itemIds = cartItems.map((cartItem) => cartItem.itemId);

    // Find all items that match the extracted item IDs
    const items = await Item.findAll({
      where: { id: itemIds },
    });

    // Combine item data with item details
    const itemsWithQuantity = items.map((item) => {
      const cartItemData = itemData.find((data) => data.itemId === item.id);
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        imgUrl: item.imgUrl,
        quantity: cartItemData.quantity,
      };
    });

    res.json(itemsWithQuantity);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Error fetching items' });
  }
});

// Define a route to remove a CartItem by itemId and cartId
router.delete('/remove-cart-item/:itemId/:cartId', async (req, res) => {
  const { itemId, cartId } = req.params;

  try {
    // Find the CartItem that matches both itemId and cartId
    const cartItem = await CartItem.findOne({
      where: { itemId: itemId, cartId: cartId },
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'CartItem not found' });
    }

    // Decrease the quantity by one, unless it's already 1
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
    } else {
      // If the quantity is 1, remove the CartItem
      await cartItem.destroy();
    }

    res.json({ message: 'CartItem updated successfully' });
  } catch (error) {
    console.error('Error updating CartItem:', error);
    res.status(500).json({ error: 'Error updating CartItem' });
  }
});

module.exports = router;
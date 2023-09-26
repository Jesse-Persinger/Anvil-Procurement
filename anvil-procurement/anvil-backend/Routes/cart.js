const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Item = require('../models/Item');
const CartItem = require('../models/CartItem');

router.post('/:cartId/addItem/:itemId', async (req, res) => {
    try {
      const { cartId, itemId } = req.params;
  
      // Find the cart and item
      const cart = await Cart.findByPk(cartId);
      const item = await Item.findByPk(itemId);
      console.log(cart.id + '===========cart========');
      console.log(item.id + '===========cart========');
      if (!cart || !item) {
        return res.status(404).json({ error: 'Cart or item not found' });
      }
  
      // Update the cart's item list with the new item's ID
      CartItem.create({ unit_price: item.price , itemId: item.id, cartId: cart.id, quantity: 1});
      
      // // Calculate the total amount based on the prices of the items
      // const totalAmount = await calculateTotalAmount(cart.itemId);
  
      // // Update the cart's quantity and total_amount
      // await cart.update({ quantity: cart.quantity + 1, total_amount: totalAmount });
  
      res.status(200).json();
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'Failed to add item to cart' });
    }
  });
  
  // // Helper function to calculate total amount based on item IDs
  // async function calculateTotalAmount(itemIds) {
  //   try {
  //     // Fetch the prices of the items from the database
  //     const itemPrices = await Item.findAll({
  //       attributes: ['price'],
  //       where: { id: itemIds },
  //     });
  
  //     // Calculate the total amount by summing up the prices
  //     const totalAmount = itemPrices.reduce((total, item) => total + item.price, 0);
  
  //     return totalAmount;
  //   } catch (error) {
  //     console.error('Error calculating total amount:', error);
  //     throw error;
  //   }
  // }

// Remove an item from the cart
router.post('/:cartId/removeItem/:itemId', async (req, res) => {
  try {
    const { cartId, itemId } = req.params;

    // Find the cart
    const cart = await Cart.findByPk(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Remove the item from the cart's item list
    const updatedItemIds = cart.itemId.filter((id) => id !== itemId);

    // Recalculate the total amount based on the remaining items (you can adjust this logic)
    const totalAmount = calculateTotalAmount(updatedItemIds);

    // Update the cart's quantity, total_amount, and item list
    await cart.update({
      quantity: cart.quantity - 1,
      total_amount: totalAmount,
      itemId: updatedItemIds,
    });

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

// View the cart
router.get('/:cartId', async (req, res) => {
  try {
    const { cartId } = req.params;

    // Find the cart
    const cart = await Cart.findByPk(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Helper function to calculate total amount based on item IDs
function calculateTotalAmount(itemIds) {
  // You can implement your own logic to calculate the total amount here
  // For example, fetch item prices from the database and sum them up
  return 0; // Replace this with your logic
}

module.exports = router;
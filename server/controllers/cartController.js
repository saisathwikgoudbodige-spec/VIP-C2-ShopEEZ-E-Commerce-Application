import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Helper to calculate total price
const calculateTotalPrice = (items) => {
  return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
};

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name price images discountPrice stock category brand');
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [], totalPrice: 0 });
    }
    res.json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
export const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    const price = product.discountPrice && product.discountPrice > 0 ? product.discountPrice : product.price;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [{ product: productId, quantity: Number(quantity) || 1, price }],
        totalPrice: price * (Number(quantity) || 1)
      });
    } else {
      const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += Number(quantity) || 1;
        cart.items[itemIndex].price = price;
      } else {
        cart.items.push({ product: productId, quantity: Number(quantity) || 1, price });
      }

      cart.totalPrice = calculateTotalPrice(cart.items);
    }

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('items.product', 'name price images discountPrice stock category brand');

    res.json({ success: true, cart: populatedCart });
  } catch (error) {
    next(error);
  }
};

// @desc    Update item quantity
// @route   PUT /api/cart/update
// @access  Private
export const updateCartItem = async (req, res, next) => {
  const { productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      res.status(404);
      throw new Error('Cart not found');
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex > -1) {
      if (Number(quantity) <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = Number(quantity);
      }
      cart.totalPrice = calculateTotalPrice(cart.items);
      await cart.save();

      const populatedCart = await Cart.findById(cart._id).populate('items.product', 'name price images discountPrice stock category brand');
      res.json({ success: true, cart: populatedCart });
    } else {
      res.status(404);
      throw new Error('Product not found in cart');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
export const removeCartItem = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      res.status(404);
      throw new Error('Cart not found');
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId);
    cart.totalPrice = calculateTotalPrice(cart.items);
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('items.product', 'name price images discountPrice stock category brand');
    res.json({ success: true, cart: populatedCart });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart/clear
// @access  Private
export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      cart.totalPrice = 0;
      await cart.save();
    }
    res.json({ success: true, message: 'Cart cleared successfully', cart });
  } catch (error) {
    next(error);
  }
};

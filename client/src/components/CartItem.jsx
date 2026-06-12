import React from 'react';
import { useDispatch } from 'react-redux';
import { updateCartItemQty, removeCartItem } from '../redux/slices/cartSlice';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { formatPrice } from '../utils/helpers';
import { toast } from 'react-toastify';
import './CartItem.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { product, quantity, price } = item;

  const handleQtyChange = (newQty) => {
    if (newQty <= 0) {
      handleRemove();
      return;
    }
    if (product && newQty > product.stock) {
      toast.error(`Only ${product.stock} items in stock!`);
      return;
    }
    dispatch(updateCartItemQty({ productId: product._id, quantity: newQty }));
  };

  const handleRemove = () => {
    dispatch(removeCartItem(product._id));
    toast.info(`${product.name} removed from cart`);
  };

  if (!product) return null;

  return (
    <div className="cart-item glass-card">
      <img
        src={product.images[0] || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600'}
        alt={product.name}
        className="cart-item-image"
      />
      <div className="cart-item-details">
        <h4 className="cart-item-title">{product.name}</h4>
        <span className="cart-item-brand">{product.brand || 'ShopEZ'}</span>
        <span className="cart-item-price">{formatPrice(price)}</span>
      </div>

      <div className="cart-item-actions">
        <div className="qty-controls">
          <button onClick={() => handleQtyChange(quantity - 1)} className="qty-btn">
            <FaMinus />
          </button>
          <span className="qty-val">{quantity}</span>
          <button onClick={() => handleQtyChange(quantity + 1)} className="qty-btn">
            <FaPlus />
          </button>
        </div>

        <button onClick={handleRemove} className="remove-btn">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

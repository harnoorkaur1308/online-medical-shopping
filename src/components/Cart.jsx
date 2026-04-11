

function Cart({ cart, onIncrease, onDecrease, onRemove, onCheckout, setPage }) {
  
  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0); 

  
  const DISCOUNT_THRESHOLD = 1000;
  const DISCOUNT_RATE = 0.10; 
  const discountAmount = subtotal > DISCOUNT_THRESHOLD
    ? Math.round(subtotal * DISCOUNT_RATE)
    : 0;

  
  const finalTotal = subtotal - discountAmount;

  
  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some medicines to get started!</p>
        <button className="primary-btn" onClick={() => setPage("home")}>
          Browse Medicines
        </button>
      </div>
    );
  }

  return (
    <div className="cart-section">
      <h2>🛒 Your Cart</h2>

      <div className="cart-layout">
        {                              }
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              {                   }
              <span className="cart-item-emoji">{item.emoji}</span>

              {                                 }
              <div className="cart-item-info">
                <strong>{item.name}</strong>
                <span className="unit-price">₹{item.price} each</span>
              </div>

              {                                                              }
              <div className="qty-controls">
                <button className="qty-btn" onClick={() => onDecrease(item.id)}>−</button>
                <span className="qty-number">{item.quantity}</span>
                <button className="qty-btn" onClick={() => onIncrease(item.id)}>+</button>
              </div>

              {                                     }
              <span className="item-total">₹{item.price * item.quantity}</span>

              {                   }
              <button className="remove-btn" onClick={() => onRemove(item.id)}>🗑️</button>
            </div>
          ))}
        </div>

        {                                }
        <div className="cart-summary">
          <h3>📋 Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          {                                                }
          {discountAmount > 0 && (
            <div className="summary-row discount-row">
              <span>🎉 Discount (10%)</span>
              <span>−₹{discountAmount}</span>
            </div>
          )}

          {                                                  }
          {subtotal <= DISCOUNT_THRESHOLD && (
            <p className="discount-hint">
              Add ₹{DISCOUNT_THRESHOLD - subtotal} more to get 10% off!
            </p>
          )}

          <div className="summary-divider" />

          <div className="summary-row total-row">
            <span>Total</span>
            <span>₹{finalTotal}</span>
          </div>

          {                                                  }
          <button className="checkout-btn" onClick={onCheckout}>
            Proceed to Checkout →
          </button>

          {                            }
          <button className="continue-btn" onClick={() => setPage("home")}>
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
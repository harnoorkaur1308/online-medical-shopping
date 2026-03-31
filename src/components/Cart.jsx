// ============================================================
// Cart.jsx - Shopping cart page
// Shows all added items, lets user change quantity, and
// calculates subtotal automatically
//
// Props:
//   cart           → array of cart items
//   onIncrease     → function to increase item quantity
//   onDecrease     → function to decrease item quantity
//   onRemove       → function to remove item entirely
//   onCheckout     → function to go to checkout page
//   setPage        → function to navigate back to home
// ============================================================

function Cart({ cart, onIncrease, onDecrease, onRemove, onCheckout, setPage }) {
  // Calculate subtotal: sum of (price × quantity) for each item
  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0); // start with 0

  // Discount logic:
  // If subtotal exceeds ₹1000, apply 10% discount
  const DISCOUNT_THRESHOLD = 1000;
  const DISCOUNT_RATE = 0.10; // 10%
  const discountAmount = subtotal > DISCOUNT_THRESHOLD
    ? Math.round(subtotal * DISCOUNT_RATE)
    : 0;

  // Final total after discount
  const finalTotal = subtotal - discountAmount;

  // If cart is empty, show a friendly empty state
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
        {/* LEFT: List of cart items */}
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              {/* Product emoji */}
              <span className="cart-item-emoji">{item.emoji}</span>

              {/* Product name and unit price */}
              <div className="cart-item-info">
                <strong>{item.name}</strong>
                <span className="unit-price">₹{item.price} each</span>
              </div>

              {/* Quantity controls: decrease / quantity number / increase */}
              <div className="qty-controls">
                <button className="qty-btn" onClick={() => onDecrease(item.id)}>−</button>
                <span className="qty-number">{item.quantity}</span>
                <button className="qty-btn" onClick={() => onIncrease(item.id)}>+</button>
              </div>

              {/* Item subtotal: price × quantity */}
              <span className="item-total">₹{item.price * item.quantity}</span>

              {/* Remove button */}
              <button className="remove-btn" onClick={() => onRemove(item.id)}>🗑️</button>
            </div>
          ))}
        </div>

        {/* RIGHT: Order summary panel */}
        <div className="cart-summary">
          <h3>📋 Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          {/* Show discount row only if discount applies */}
          {discountAmount > 0 && (
            <div className="summary-row discount-row">
              <span>🎉 Discount (10%)</span>
              <span>−₹{discountAmount}</span>
            </div>
          )}

          {/* Show discount message if almost at threshold */}
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

          {/* Checkout button - navigates to checkout page */}
          <button className="checkout-btn" onClick={onCheckout}>
            Proceed to Checkout →
          </button>

          {/* Continue shopping link */}
          <button className="continue-btn" onClick={() => setPage("home")}>
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

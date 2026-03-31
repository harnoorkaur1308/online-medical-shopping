// ============================================================
// Checkout.jsx - Automatic Checkout System
// This is the CORE feature of the project.
//
// It:
//   1. Auto-fills user details (from mockUser data)
//   2. Shows final order summary with discount applied
//   3. Has a "Place Order" button
//   4. Shows an "Order Confirmed" screen after placing order
//
// Props:
//   cart     → array of cart items
//   mockUser → pre-filled user object
//   onOrderPlaced → function to call after order is placed
//   setPage  → function to navigate pages
// ============================================================

import { useState } from "react";

function Checkout({ cart, mockUser, onOrderPlaced, setPage }) {
  // State: controls whether to show the confirmation screen
  const [orderPlaced, setOrderPlaced] = useState(false);

  // State: user details (pre-filled with mock data)
  // The user can still edit these if needed
  const [userDetails, setUserDetails] = useState({ ...mockUser });

  // ── Price Calculations ──────────────────────────────────────

  // Total number of items
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Subtotal: price × quantity for each item
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Delivery charge: free if order above ₹500
  const deliveryCharge = subtotal > 500 ? 0 : 49;

  // Discount: 10% off if subtotal > ₹1000
  const discountAmount = subtotal > 1000 ? Math.round(subtotal * 0.10) : 0;

  // Grand total: subtotal + delivery - discount
  const grandTotal = subtotal + deliveryCharge - discountAmount;

  // Generate a random order ID for confirmation
  const orderId = "MED" + Math.floor(Math.random() * 900000 + 100000);

  // ── Handle input change ────────────────────────────────────
  // When user edits any field, update that field in state
  function handleChange(e) {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  }

  // ── Handle Place Order ─────────────────────────────────────
  function handlePlaceOrder() {
    // Show the confirmation screen
    setOrderPlaced(true);

    // Tell App.jsx to clear the cart
    onOrderPlaced();
  }

  // ── ORDER CONFIRMED SCREEN ─────────────────────────────────
  // Shown after user clicks "Place Order"
  if (orderPlaced) {
    return (
      <div className="confirmation-screen">
        {/* Big success checkmark */}
        <div className="confirm-icon">✅</div>
        <h2 className="confirm-title">Order Confirmed!</h2>
        <p className="confirm-subtitle">
          Your medicines are on their way, {userDetails.name.split(" ")[0]}!
        </p>

        {/* Order ID */}
        <div className="order-id-box">
          <span>Order ID:</span>
          <strong>{orderId}</strong>
        </div>

        {/* Delivery info */}
        <div className="delivery-info">
          <p>📦 Estimated Delivery: <strong>2–4 Business Days</strong></p>
          <p>📍 Delivering to: <strong>{userDetails.address}, {userDetails.city} – {userDetails.pincode}</strong></p>
          <p>📧 Confirmation sent to: <strong>{userDetails.email}</strong></p>
        </div>

        {/* Summary of what was ordered */}
        <div className="confirm-summary">
          <h4>Items Ordered ({totalItems})</h4>
          {cart.map((item) => (
            <div className="confirm-item" key={item.id}>
              <span>{item.emoji} {item.name} × {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="confirm-total">
            <strong>Total Paid</strong>
            <strong>₹{grandTotal}</strong>
          </div>
        </div>

        {/* Back to home */}
        <button className="primary-btn" onClick={() => setPage("home")}>
          🏠 Back to Home
        </button>
      </div>
    );
  }

  // ── CHECKOUT FORM ──────────────────────────────────────────
  return (
    <div className="checkout-section">
      <h2>📋 Checkout</h2>
      <p className="checkout-sub">Review your details and place your order</p>

      <div className="checkout-layout">
        {/* LEFT: Delivery details form (auto-filled) */}
        <div className="checkout-form">
          <div className="form-header">
            <h3>📍 Delivery Details</h3>
            <span className="auto-fill-badge">✨ Auto-filled</span>
          </div>

          {/* Name field */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
            />
          </div>

          {/* Email field */}
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
            />
          </div>

          {/* Phone field */}
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
            />
          </div>

          {/* Address field */}
          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              name="address"
              value={userDetails.address}
              onChange={handleChange}
            />
          </div>

          {/* City and pincode side by side */}
          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={userDetails.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                value={userDetails.pincode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Payment method (mock - not real) */}
          <div className="form-group">
            <label>Payment Method</label>
            <select className="payment-select">
              <option>💳 Credit / Debit Card</option>
              <option>📱 UPI (PhonePe / GPay)</option>
              <option>🏦 Net Banking</option>
              <option>💵 Cash on Delivery</option>
            </select>
          </div>
        </div>

        {/* RIGHT: Final order summary */}
        <div className="checkout-summary">
          <h3>🧾 Order Summary</h3>

          {/* List of items */}
          <div className="checkout-items">
            {cart.map((item) => (
              <div className="checkout-item" key={item.id}>
                <span>{item.emoji} {item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="summary-divider" />

          {/* Pricing breakdown */}
          <div className="summary-row">
            <span>Subtotal ({totalItems} items)</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>{deliveryCharge === 0 ? "🎉 FREE" : `₹${deliveryCharge}`}</span>
          </div>

          {/* Only show discount if it applies */}
          {discountAmount > 0 && (
            <div className="summary-row discount-row">
              <span>Discount (10%)</span>
              <span>−₹{discountAmount}</span>
            </div>
          )}

          <div className="summary-divider" />

          {/* Grand total */}
          <div className="summary-row total-row">
            <span>Grand Total</span>
            <span>₹{grandTotal}</span>
          </div>

          {/* Savings note */}
          {(discountAmount > 0 || deliveryCharge === 0) && (
            <p className="savings-note">
              🎉 You saved ₹{discountAmount + (subtotal > 500 ? 49 : 0)} on this order!
            </p>
          )}

          {/* THE MAIN BUTTON - One-click checkout */}
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            ✅ Place Order — ₹{grandTotal}
          </button>

          {/* Secure note */}
          <p className="secure-note">🔒 100% secure checkout • Free returns</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

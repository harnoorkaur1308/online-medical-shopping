
import { useState } from "react";

function Checkout({ cart, mockUser, onOrderPlaced, setPage }) {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [userDetails, setUserDetails] = useState({ ...mockUser });


  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const deliveryCharge = subtotal > 500 ? 0 : 49;

  const discountAmount = subtotal > 1000 ? Math.round(subtotal * 0.10) : 0;

  const grandTotal = subtotal + deliveryCharge - discountAmount;

  const orderId = "MED" + Math.floor(Math.random() * 900000 + 100000);

  function handleChange(e) {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  }

  function handlePlaceOrder() {
    setOrderPlaced(true);

    onOrderPlaced();
  }

  if (orderPlaced) {
    return (
      <div className="confirmation-screen">
        {                           }
        <div className="confirm-icon">✅</div>
        <h2 className="confirm-title">Order Confirmed!</h2>
        <p className="confirm-subtitle">
          Your medicines are on their way, {userDetails.name.split(" ")[0]}!
        </p>

        {              }
        <div className="order-id-box">
          <span>Order ID:</span>
          <strong>{orderId}</strong>
        </div>

        {                   }
        <div className="delivery-info">
          <p>📦 Estimated Delivery: <strong>2–4 Business Days</strong></p>
          <p>📍 Delivering to: <strong>{userDetails.address}, {userDetails.city} – {userDetails.pincode}</strong></p>
          <p>📧 Confirmation sent to: <strong>{userDetails.email}</strong></p>
        </div>

        {                                 }
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

        {                  }
        <button className="primary-btn" onClick={() => setPage("home")}>
          🏠 Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-section">
      <h2>📋 Checkout</h2>
      <p className="checkout-sub">Review your details and place your order</p>

      <div className="checkout-layout">
        {                                               }
        <div className="checkout-form">
          <div className="form-header">
            <h3>📍 Delivery Details</h3>
            <span className="auto-fill-badge">✨ Auto-filled</span>
          </div>

          {                }
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
            />
          </div>

          {                 }
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
            />
          </div>

          {                 }
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
            />
          </div>

          {                   }
          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              name="address"
              value={userDetails.address}
              onChange={handleChange}
            />
          </div>

          {                                   }
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

          {                                      }
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

        {                                }
        <div className="checkout-summary">
          <h3>🧾 Order Summary</h3>

          {                   }
          <div className="checkout-items">
            {cart.map((item) => (
              <div className="checkout-item" key={item.id}>
                <span>{item.emoji} {item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="summary-divider" />

          {                       }
          <div className="summary-row">
            <span>Subtotal ({totalItems} items)</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>{deliveryCharge === 0 ? "🎉 FREE" : `₹${deliveryCharge}`}</span>
          </div>

          {                                      }
          {discountAmount > 0 && (
            <div className="summary-row discount-row">
              <span>Discount (10%)</span>
              <span>−₹{discountAmount}</span>
            </div>
          )}

          <div className="summary-divider" />

          {                 }
          <div className="summary-row total-row">
            <span>Grand Total</span>
            <span>₹{grandTotal}</span>
          </div>

          {                  }
          {(discountAmount > 0 || deliveryCharge === 0) && (
            <p className="savings-note">
              🎉 You saved ₹{discountAmount + (subtotal > 500 ? 49 : 0)} on this order!
            </p>
          )}

          {                                          }
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            ✅ Place Order — ₹{grandTotal}
          </button>

          {                 }
          <p className="secure-note">🔒 100% secure checkout • Free returns</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
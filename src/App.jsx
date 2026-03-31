// ============================================================
// App.jsx - Root component of MediShop
//
// This component is the "brain" of the app.
// It manages:
//   - Which page is currently shown (home / cart / checkout)
//   - The cart state (items, quantities)
//   - The last added category (for smart suggestions)
//
// All other components are "dumb" - they just receive props
// and display things. App.jsx handles all the logic.
// ============================================================

import { useState } from "react";

// Import all page/section components
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Suggestions from "./components/Suggestions";

// Import data files
import { products, suggestions, mockUser } from "./data/products";

// Import the single CSS file
import "./styles.css";

function App() {
  // ── Page State ──────────────────────────────────────────────
  // Tracks which page to show: "home", "cart", or "checkout"
  const [currentPage, setCurrentPage] = useState("home");

  // ── Cart State ──────────────────────────────────────────────
  // cart is an array of product objects + a "quantity" field
  // Example: [{ id: 1, name: "Paracetamol", price: 45, quantity: 2 }]
  const [cart, setCart] = useState([]);

  // ── Smart Suggestion State ──────────────────────────────────
  // Stores the category of the last product added to cart
  // Used by the Suggestions component to show a relevant tip
  const [lastAddedCategory, setLastAddedCategory] = useState(null);

  // ── Add to Cart ─────────────────────────────────────────────
  // Called when user clicks "Add to Cart" on a product card
  function addToCart(product) {
    setCart((prevCart) => {
      // Check if product already exists in cart
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // If exists, just increase its quantity by 1
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new, add it to cart with quantity: 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Update the suggestion based on this product's category
    setLastAddedCategory(product.category);
  }

  // ── Increase Quantity ───────────────────────────────────────
  // Called when user clicks "+" in the cart
  function increaseQty(productId) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // ── Decrease Quantity ───────────────────────────────────────
  // Called when user clicks "−" in the cart
  // Removes item if quantity would go below 1
  function decreaseQty(productId) {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // remove if quantity = 0
    );
  }

  // ── Remove Item ─────────────────────────────────────────────
  // Called when user clicks the trash icon in cart
  function removeItem(productId) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }

  // ── Order Placed ────────────────────────────────────────────
  // Called from Checkout after user places order
  // Clears the cart and resets suggestions
  function handleOrderPlaced() {
    setCart([]);
    setLastAddedCategory(null);
  }

  // ── Total cart item count ───────────────────────────────────
  // Used in Navbar to show the badge number
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ── Render ──────────────────────────────────────────────────
  return (
    <div className="app">
      {/* Navbar is always visible at top */}
      <Navbar
        cartCount={totalCartItems}
        currentPage={currentPage}
        setPage={setCurrentPage}
      />

      {/* Main content area */}
      <main className="main-content">

        {/* ── HOME PAGE ── */}
        {currentPage === "home" && (
          <>
            {/* Hero banner */}
            <div className="hero">
              <div className="hero-text">
                <h1>💊 Your Trusted Online Pharmacy</h1>
                <p>Order medicines from home. Fast, safe, and affordable.</p>
              </div>
              <div className="hero-badges">
                <span>✅ Genuine Medicines</span>
                <span>🚚 Fast Delivery</span>
                <span>🔒 Secure Checkout</span>
              </div>
            </div>

            {/* Smart Suggestion Banner - shows after adding an item */}
            <Suggestions
              lastAddedCategory={lastAddedCategory}
              suggestions={suggestions}
              products={products}
              onAddToCart={addToCart}
            />

            {/* Product grid */}
            <ProductList
              products={products}
              onAddToCart={addToCart}
              cart={cart}
            />
          </>
        )}

        {/* ── CART PAGE ── */}
        {currentPage === "cart" && (
          <Cart
            cart={cart}
            onIncrease={increaseQty}
            onDecrease={decreaseQty}
            onRemove={removeItem}
            onCheckout={() => setCurrentPage("checkout")}
            setPage={setCurrentPage}
          />
        )}

        {/* ── CHECKOUT PAGE ── */}
        {currentPage === "checkout" && (
          <Checkout
            cart={cart}
            mockUser={mockUser}
            onOrderPlaced={handleOrderPlaced}
            setPage={setCurrentPage}
          />
        )}
      </main>

      {/* Simple footer */}
      <footer className="footer">
        <p>© 2025 MediShop · Built for Web Programming Course · React + Vite</p>
      </footer>
    </div>
  );
}

export default App;

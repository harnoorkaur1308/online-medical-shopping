// ============================================================
// Navbar.jsx - Top navigation bar
// Props:
//   cartCount → number of items in cart (shown as badge)
//   currentPage → which page is active (to highlight nav)
//   setPage → function to switch pages
// ============================================================

function Navbar({ cartCount, currentPage, setPage }) {
  return (
    <nav className="navbar">
      {/* Brand / Logo section */}
      <div className="navbar-brand" onClick={() => setPage("home")}>
        <span className="brand-icon">💊</span>
        <span className="brand-name">MediShop</span>
        <span className="brand-tagline">Your Health, Delivered</span>
      </div>

      {/* Navigation links */}
      <div className="navbar-links">
        {/* Home button - highlights when on home page */}
        <button
          className={`nav-btn ${currentPage === "home" ? "active" : ""}`}
          onClick={() => setPage("home")}
        >
          🏠 Home
        </button>

        {/* Cart button - shows item count as badge */}
        <button
          className={`nav-btn cart-btn ${currentPage === "cart" ? "active" : ""}`}
          onClick={() => setPage("cart")}
        >
          🛒 Cart
          {/* Only show badge if cart has items */}
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

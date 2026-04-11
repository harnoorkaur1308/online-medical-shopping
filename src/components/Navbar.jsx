
function Navbar({ cartCount, currentPage, setPage }) {
  return (
    <nav className="navbar">
      {                          }
      <div className="navbar-brand" onClick={() => setPage("home")}>
        <span className="brand-icon">💊</span>
        <span className="brand-name">MediShop</span>
        <span className="brand-tagline">Your Health, Delivered</span>
      </div>

      {                      }
      <div className="navbar-links">
        {                                                }
        <button
          className={`nav-btn ${currentPage === "home" ? "active" : ""}`}
          onClick={() => setPage("home")}
        >
          🏠 Home
        </button>

        {                                             }
        <button
          className={`nav-btn cart-btn ${currentPage === "cart" ? "active" : ""}`}
          onClick={() => setPage("cart")}
        >
          🛒 Cart
          {                                       }
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
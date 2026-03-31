// ============================================================
// ProductList.jsx - Displays all medicines in a grid
// Props:
//   products    → array of product objects from products.js
//   onAddToCart → function called when user clicks "Add to Cart"
//   cart        → current cart (to show if item already added)
// ============================================================

function ProductList({ products, onAddToCart, cart }) {
  // Helper: check how many of a product are already in cart
  // This lets us show quantity or "Added" state on the button
  function getCartQty(productId) {
    const item = cart.find((c) => c.id === productId);
    return item ? item.quantity : 0; // return 0 if not in cart
  }

  return (
    <div className="product-section">
      {/* Section heading */}
      <div className="section-header">
        <h2>🏥 Available Medicines</h2>
        <p className="section-sub">Trusted medicines, delivered to your door</p>
      </div>

      {/* Product grid - CSS grid handles the columns */}
      <div className="product-grid">
        {products.map((product) => {
          const qty = getCartQty(product.id); // how many in cart

          return (
            <div className="product-card" key={product.id}>
              {/* Product image (emoji as placeholder) */}
              <div className="product-emoji">{product.emoji}</div>

              {/* Product info */}
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <span className="product-category">{product.category}</span>
              </div>

              {/* Price and Add to Cart */}
              <div className="product-footer">
                <span className="product-price">₹{product.price}</span>

                <button
                  className={`add-btn ${qty > 0 ? "added" : ""}`}
                  onClick={() => onAddToCart(product)}
                >
                  {/* Show quantity if already added, else show + Add */}
                  {qty > 0 ? `✓ Added (${qty})` : "+ Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;

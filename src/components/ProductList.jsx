
function ProductList({ products, onAddToCart, cart }) {
  function getCartQty(productId) {
    const item = cart.find((c) => c.id === productId);
    return item ? item.quantity : 0; 
  }

  return (
    <div className="product-section">
      {                     }
      <div className="section-header">
        <h2>🏥 Available Medicines</h2>
        <p className="section-sub">Trusted medicines, delivered to your door</p>
      </div>

      {                                                 }
      <div className="product-grid">
        {products.map((product) => {
          const qty = getCartQty(product.id); 

          return (
            <div className="product-card" key={product.id}>
              {                                          }
              <div className="product-emoji">{product.emoji}</div>

              {                  }
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <span className="product-category">{product.category}</span>
              </div>

              {                           }
              <div className="product-footer">
                <span className="product-price">₹{product.price}</span>

                <button
                  className={`add-btn ${qty > 0 ? "added" : ""}`}
                  onClick={() => onAddToCart(product)}
                >
                  {                                                     }
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
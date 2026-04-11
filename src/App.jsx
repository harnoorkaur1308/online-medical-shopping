
import { useState } from "react";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Suggestions from "./components/Suggestions";

import { products, suggestions, mockUser } from "./data/products";

import "./styles.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const [cart, setCart] = useState([]);

  const [lastAddedCategory, setLastAddedCategory] = useState(null);

  function addToCart(product) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    setLastAddedCategory(product.category);
  }

  function increaseQty(productId) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQty(productId) {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) 
    );
  }

  function removeItem(productId) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }

  function handleOrderPlaced() {
    setCart([]);
    setLastAddedCategory(null);
  }

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      {                                     }
      <Navbar
        cartCount={totalCartItems}
        currentPage={currentPage}
        setPage={setCurrentPage}
      />

      {                       }
      <main className="main-content">

        {                     }
        {currentPage === "home" && (
          <>
            {                 }
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

            {                                                          }
            <Suggestions
              lastAddedCategory={lastAddedCategory}
              suggestions={suggestions}
              products={products}
              onAddToCart={addToCart}
            />

            {                  }
            <ProductList
              products={products}
              onAddToCart={addToCart}
              cart={cart}
            />
          </>
        )}

        {                     }
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

        {                         }
        {currentPage === "checkout" && (
          <Checkout
            cart={cart}
            mockUser={mockUser}
            onOrderPlaced={handleOrderPlaced}
            setPage={setCurrentPage}
          />
        )}
      </main>

      {                   }
      <footer className="footer">
        <p>© 2025 MediShop · Built for Web Programming Course · React + Vite</p>
      </footer>
    </div>
  );
}

export default App;
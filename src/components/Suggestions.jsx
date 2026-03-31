// ============================================================
// Suggestions.jsx - Smart Medicine Suggestion Feature
// This component shows a suggestion based on what category
// of product was most recently added to the cart.
//
// Props:
//   lastAddedCategory → category string (e.g., "fever", "cough")
//   suggestions       → the suggestions map from products.js
//   products          → full product list
//   onAddToCart       → function to add suggested item to cart
// ============================================================

function Suggestions({ lastAddedCategory, suggestions, products, onAddToCart }) {
  // If nothing has been added yet, don't show anything
  if (!lastAddedCategory) return null;

  // Look up the suggestion for the added category
  const suggestion = suggestions[lastAddedCategory];

  // If no suggestion exists for this category, hide the component
  if (!suggestion) return null;

  // Find the actual product object that we want to suggest
  const suggestedProduct = products.find((p) => p.id === suggestion.suggestedId);

  // If product not found (shouldn't happen), don't render
  if (!suggestedProduct) return null;

  return (
    <div className="suggestion-banner">
      {/* Suggestion message from the suggestions map */}
      <p className="suggestion-message">{suggestion.message}</p>

      {/* The suggested product card */}
      <div className="suggestion-card">
        <span className="suggestion-emoji">{suggestedProduct.emoji}</span>
        <div className="suggestion-info">
          <strong>{suggestedProduct.name}</strong>
          <span>₹{suggestedProduct.price}</span>
        </div>

        {/* One-click button to add suggested item */}
        <button
          className="suggestion-add-btn"
          onClick={() => onAddToCart(suggestedProduct)}
        >
          + Add
        </button>
      </div>
    </div>
  );
}

export default Suggestions;

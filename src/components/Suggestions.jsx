
function Suggestions({ lastAddedCategory, suggestions, products, onAddToCart }) {
  if (!lastAddedCategory) return null;

  const suggestion = suggestions[lastAddedCategory];

  if (!suggestion) return null;

  const suggestedProduct = products.find((p) => p.id === suggestion.suggestedId);

  if (!suggestedProduct) return null;

  return (
    <div className="suggestion-banner">
      {                                                 }
      <p className="suggestion-message">{suggestion.message}</p>

      {                                }
      <div className="suggestion-card">
        <span className="suggestion-emoji">{suggestedProduct.emoji}</span>
        <div className="suggestion-info">
          <strong>{suggestedProduct.name}</strong>
          <span>₹{suggestedProduct.price}</span>
        </div>

        {                                            }
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
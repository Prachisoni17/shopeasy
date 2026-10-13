
import { useReducer } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Wireless Headphones", price: 1499, emoji: "🎧", category: "Electronics", description: "Clear sound and comfortable fit" },
  { id: 2, name: "Smart Watch", price: 2499, emoji: "⌚", category: "Electronics", description: "Your everyday smart companion" },
  { id: 3, name: "Casual Backpack", price: 899, emoji: "🎒", category: "Accessories", description: "Stylish and spacious" },
  { id: 4, name: "Running Shoes", price: 1999, emoji: "👟", category: "Fashion", description: "Lightweight everyday comfort" },
  { id: 5, name: "Classic Sunglasses", price: 699, emoji: "🕶️", category: "Accessories", description: "A timeless everyday style" },
  { id: 6, name: "Coffee Mug", price: 299, emoji: "☕", category: "Home", description: "Make every coffee break better" },
];

const initialState = [];

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, { ...action.payload, quantity: 1 }];
    }

    case "INCREASE":
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE":
      return state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const formatPrice = (price) =>
    `₹${price.toLocaleString("en-IN")}`;

  return (
    <div className="app">
      <header className="header" id="home">
        <a href="#home" className="logo">
          <span className="logo-icon">S</span> ShopEasy
        </a>

        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#cart">My Cart</a>
        </nav>

        <a href="#cart" className="cart-badge">
          🛒 <span>{totalItems}</span>
        </a>
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">YOUR EVERYDAY SHOPPING DESTINATION</p>
          <h1>Great products.<br /><span>Better prices.</span></h1>
          <p className="hero-text">
            Discover products you love, add them to your cart,
            and enjoy a simple shopping experience.
          </p>
          <a href="#products" className="primary-button">
            Explore Products →
          </a>
        </div>

        <div className="hero-art">
          <span>🛍️</span>
          <div className="floating-card">✨ Happy shopping!</div>
        </div>
      </section>

      <main>
        <section className="products-section" id="products">
          <div className="section-heading">
            <div>
              <p className="eyebrow">HANDPICKED FOR YOU</p>
              <h2>Our Products</h2>
              <p>Find your next favourite item.</p>
            </div>
            <span className="product-count">{products.length} products</span>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <span className="product-emoji">{product.emoji}</span>
                  <span className="category-tag">{product.category}</span>
                </div>

                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>

                  <div className="product-bottom">
                    <strong>{formatPrice(product.price)}</strong>
                    <button
                      className="add-button"
                      onClick={() =>
                        dispatch({ type: "ADD_ITEM", payload: product })
                      }
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cart-section" id="cart">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR SELECTED ITEMS</p>
              <h2>Your Shopping Cart</h2>
              <p>{totalItems} item{totalItems !== 1 ? "s" : ""} in your cart</p>
            </div>

            {cart.length > 0 && (
              <button
                className="clear-button"
                onClick={() => dispatch({ type: "CLEAR_CART" })}
              >
                Clear Cart
              </button>
            )}
          </div>

          <div className="cart-layout">
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <span className="empty-cart-icon">🛒</span>
                  <h3>Your cart is empty</h3>
                  <p>Add some products to get started!</p>
                  <a href="#products" className="primary-button">
                    Start Shopping
                  </a>
                </div>
              ) : (
                cart.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <div className="cart-item-image">{item.emoji}</div>

                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p>{formatPrice(item.price)} each</p>

                      <div className="quantity-control">
                        <button
                          aria-label={`Decrease ${item.name}`}
                          onClick={() =>
                            dispatch({ type: "DECREASE", payload: item.id })
                          }
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          aria-label={`Increase ${item.name}`}
                          onClick={() =>
                            dispatch({ type: "INCREASE", payload: item.id })
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-actions">
                      <strong>
                        {formatPrice(item.price * item.quantity)}
                      </strong>
                      <button
                        className="remove-button"
                        onClick={() =>
                          dispatch({ type: "REMOVE_ITEM", payload: item.id })
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>

            <aside className="order-summary">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Total items</span><span>{totalItems}</span>
              </div>
              <div className="summary-row">
                <span>Subtotal</span><span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className="free-delivery">
                  {totalPrice === 0 ? "—" : "FREE"}
                </span>
              </div>

              <div className="summary-divider" />

              <div className="summary-row total-row">
                <strong>Total</strong><strong>{formatPrice(totalPrice)}</strong>
              </div>

              <button
                className="checkout-button"
                disabled={cart.length === 0}
                onClick={() =>
                  window.alert("Thank you for shopping with ShopEasy! This is a demo checkout.")
                }
              >
                Proceed to Checkout →
              </button>

              <p className="secure-note">🔒 Secure and easy shopping</p>
            </aside>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="logo">
          <span className="logo-icon">S</span> ShopEasy
        </a>
        <p>Made with React and useReducer.</p>
        <p>© 2026 ShopEasy. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

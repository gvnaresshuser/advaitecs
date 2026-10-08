import React, { useReducer } from "react";
import "./App.css";
import "./Mystyles.css";

// PRODUCTS
const products = [
  { id: 1, name: "Laptop", price: 75000 },
  { id: 2, name: "Wireless Mouse", price: 1200 },
  { id: 3, name: "Keyboard", price: 2500 },
];

// INITIAL STATE
const initialState = { cart: [] };

// REDUCER
const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    /*  case "remove":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      }; */
    case "remove":
      return {
        ...state,
        cart: state.cart.filter((_, index) => index !== action.payload),
      };
    //filter() keeps elements for which the condition is true.
    //OR - filter() removes elements for which the condition is false.
    //filter() gives us two values - array.filter((item, index) => ...)
    //I know the first parameter is available, but I'm intentionally not using it.
    //underscore means - I receive this value, but I don't need to use it.

    case "clear":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

// APP
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const total = state.cart.reduce((sum, item) => sum + item.price, 0);
  /*
  reduce() processes each array element and combines them into a single final value. 
  In our shopping cart example, we use it to calculate the total price.
  */

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div>
          <h1>ShopEasy</h1>
          <p>Simple Shopping Application</p>
        </div>
        <div className="cart-badge">🛒 {state.cart.length}</div>
      </header>

      {/* MAIN */}
      <main className="container">
        {/* PRODUCTS */}
        <section className="products">
          <h2>Products</h2>
          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-icon">🛍️</div>
                <h3>{product.name}</h3>
                <p className="price">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
                <button
                  onClick={() => dispatch({ type: "add", payload: product })}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CART */}
        <section className="cart">
          <div className="cart-header">
            <h2>Your Cart</h2>
            {state.cart.length > 0 && (
              <button
                className="clear-btn"
                onClick={() => dispatch({ type: "clear" })}
              >
                Clear Cart
              </button>
            )}
          </div>

          {state.cart.length === 0 ? (
            <div className="empty-cart">
              <div>🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some products to get started.</p>
            </div>
          ) : (
            <>
              {/* CART ITEMS */}
              <div className="cart-items">
                {state.cart.map((item, index) => (
                  <div className="cart-item" key={`${item.id}-${index}`}>
                    <div>
                      <h3>{item.name}</h3>
                      <p>₹{item.price.toLocaleString("en-IN")}</p>
                    </div>
                    {/*   <button
                      className="remove-btn"
                      onClick={() =>
                        dispatch({ type: "remove", payload: item.id })
                      }
                    >
                      Remove
                    </button> */}
                    <button
                      className="remove-btn"
                      onClick={() =>
                        dispatch({ type: "remove", payload: index })
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="total">
                <span>Total</span>
                <strong>₹{total.toLocaleString("en-IN")}</strong>
              </div>

              {/* CHECKOUT */}
              <button className="checkout-btn">Proceed to Checkout</button>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
/*
The actual data/information that you want to send along with the action.

reduce() processes each array element and combines them into a single final value. 
In our shopping cart example, we use it to calculate the total price.

filter() keeps elements for which the condition is true.
*/

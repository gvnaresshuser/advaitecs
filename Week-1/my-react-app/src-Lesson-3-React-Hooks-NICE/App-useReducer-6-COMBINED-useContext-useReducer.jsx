import React, { createContext, useContext, useReducer } from "react";

import "./Mystyles1.css";

// =====================================================
// PRODUCTS
// =====================================================

const products = [
  { id: 1, name: "Laptop", price: 75000 },
  { id: 2, name: "Wireless Mouse", price: 1200 },
  { id: 3, name: "Keyboard", price: 2500 },
];

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  cart: [],
};

// =====================================================
// REDUCER
// =====================================================

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case "remove":
      return {
        ...state,
        cart: state.cart.filter((_, index) => index !== action.payload),
      };
    //filter() keeps elements for which the condition is true.

    case "clear":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

// =====================================================
// CREATE CONTEXT
// =====================================================

const CartContext = createContext(null);

// =====================================================
// HEADER COMPONENT
// =====================================================

function Header() {
  const { state } = useContext(CartContext);

  return (
    <header className="header">
      <div>
        <h1>ShopEasy</h1>
        <p>useReducer + useContext</p>
      </div>

      <div className="cart-badge">🛒 {state.cart.length}</div>
    </header>
  );
}

// =====================================================
// PRODUCTS COMPONENT
// =====================================================

function Products() {
  const { dispatch } = useContext(CartContext);

  return (
    <section className="products">
      <h2>Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-icon">🛍️</div>

            <h3>{product.name}</h3>

            <p className="price">₹{product.price.toLocaleString("en-IN")}</p>

            <button
              onClick={() =>
                dispatch({
                  type: "add",
                  payload: product,
                })
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

// =====================================================
// CART COMPONENT
// =====================================================

function Cart() {
  const { state, dispatch } = useContext(CartContext);

  // Calculate total
  const total = state.cart.reduce((sum, item) => sum + item.price, 0);

  return (
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

      {/* EMPTY CART */}

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

                <button
                  className="remove-btn"
                  onClick={() =>
                    dispatch({
                      type: "remove",
                      //payload: item.id,
                      payload: index,
                    })
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
  );
}

// =====================================================
// APP
// =====================================================

function App() {
  // useReducer manages the state
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="app">
      {/* 
        Context Provider shares state and dispatch
        with Header, Products and Cart
      */}

      <CartContext.Provider value={{ state, dispatch }}>
        <Header />

        <main className="container">
          <Products />

          <Cart />
        </main>
      </CartContext.Provider>
    </div>
  );
}

export default App;
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
//filter() keeps elements for which the condition is true.
/* 
  case "remove":
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    }; 
*/
/*
const words = ["spray", "elite", "exuberant", "destruction", "present"];
const result = words.filter((word) => word.length > 6);
console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]
*/

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchProductInventory } from "../features/productInventorySlice";

import "./productInventory.css";

export default function ProductInventory() {
  const dispatch = useDispatch();

  const { list, loading, error } = useSelector(
    (state) => state.productInventory,
  );

  // Fetch when component loads
  useEffect(() => {
    dispatch(fetchProductInventory());
  }, [dispatch]);

  // Refresh button
  const handleRefresh = () => {
    dispatch(fetchProductInventory());
  };

  return (
    <div>
      {/* Header */}

      <div className="product-inventory-header">
        <h2 className="title">Products & Inventory</h2>

        <button
          onClick={handleRefresh}
          className="refresh-btn"
          disabled={loading}
          title="Refresh product inventory"
        >
          ↻
        </button>
      </div>

      {/* Loading */}

      {loading && (
        <p className="status-message">Loading products and inventory...</p>
      )}

      {/* Error */}

      {error && <p className="error-message">{error}</p>}

      {/* Table */}

      {!loading && !error && (
        <table className="product-inventory-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {list.map((item) => (
              <tr key={item.product_id}>
                <td>{item.product_id}</td>

                <td>
                  <strong>{item.product_name}</strong>
                </td>

                <td>₹{item.price}</td>

                <td>{item.quantity}</td>

                <td>
                  {Number(item.quantity) > 0 ? (
                    <span className="in-stock">In Stock</span>
                  ) : (
                    <span className="out-of-stock">Out of Stock</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Empty */}

      {!loading && !error && list.length === 0 && (
        <p className="status-message">No products found.</p>
      )}
    </div>
  );
}

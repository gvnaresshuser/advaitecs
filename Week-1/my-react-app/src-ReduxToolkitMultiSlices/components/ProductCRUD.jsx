// src/components/ProductCRUD.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../features/productsSlice';
import './product.css'; // Import the CSS file

export default function ProductCRUD() {
    const [form, setForm] = useState({ name: '', price: '' });
    const [editId, setEditId] = useState(null);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.list);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        editId
            ? dispatch(updateProduct({ id: editId, name: form.name, price: form.price }))
            : dispatch(addProduct(form));
        setForm({ name: '', price: '' });
        setEditId(null);
    };

    return (
        <div className="product-container">
            <h2 className="title">Product Management</h2>

            <form onSubmit={handleSubmit} className="product-form">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-input"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="form-input"
                />
                <button type="submit" className="btn submit-btn">
                    {editId ? 'Update' : 'Add'}
                </button>
            </form>

            <ul className="product-list">
                {products.map((p) => (
                    <li key={p.id} className="product-item">
                        <span className="product-info">{p.name} - ₹{p.price}</span>
                        <div className="action-buttons">
                            <button
                                onClick={() => { setForm(p); setEditId(p.id); }}
                                className="btn edit-btn"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => dispatch(deleteProduct(p.id))}
                                className="btn delete-btn"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
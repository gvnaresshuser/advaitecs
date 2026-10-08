import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchInventory,
    addInventory,
    updateInventory,
    deleteInventory
} from '../features/inventorySlice';
import './inventory.css';

export default function InventoryCRUD() {
    const [form, setForm] = useState({ productId: '', quantity: '' });
    const [editId, setEditId] = useState(null);
    const dispatch = useDispatch();
    const inventory = useSelector((state) => state.inventory.list);

    useEffect(() => {
        dispatch(fetchInventory());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.productId || !form.quantity) return;

        const payload = {
            id: editId,
            productId: Number(form.productId),
            quantity: Number(form.quantity)
        };

        editId
            ? dispatch(updateInventory(payload))
            : dispatch(addInventory(payload));

        setForm({ productId: '', quantity: '' });
        setEditId(null);
    };

    const handleEdit = (inv) => {
        setForm({
            productId: inv.product_id.toString(), // map to camelCase for form
            quantity: inv.quantity.toString()
        });
        setEditId(inv.id);
    };

    return (
        <div className="inventory-container">
            <h2 className="title">Inventory Management</h2>

            <form onSubmit={handleSubmit} className="inventory-form">
                <input
                    type="text"
                    placeholder="Product ID"
                    value={form.productId}
                    onChange={(e) =>
                        setForm({ ...form, productId: e.target.value })
                    }
                    className="form-input"
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={form.quantity}
                    onChange={(e) =>
                        setForm({ ...form, quantity: e.target.value })
                    }
                    className="form-input"
                />
                <button type="submit" className="btn submit-btn">
                    {editId ? 'Update' : 'Add'}
                </button>
            </form>

            <ul className="inventory-list">
                {inventory.map((inv) => (
                    <li key={inv.id} className="inventory-item">
                        <span className="inventory-info">
                            Product ID: {inv.product_id} - Qty: {inv.quantity}
                        </span>
                        <div className="action-buttons">
                            <button
                                onClick={() => handleEdit(inv)}
                                className="btn edit-btn"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => dispatch(deleteInventory(inv.id))}
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

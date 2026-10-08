// src/components/UserCRUD.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, updateUser, deleteUser } from '../features/userSlice';
import './user.css'; // Import your CSS file

export default function UserCRUD() {
    const [form, setForm] = useState({ name: '', email: '' });
    const [editId, setEditId] = useState(null);
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        editId
            ? dispatch(updateUser({ id: editId, name: form.name, email: form.email }))
            : dispatch(addUser(form));
        setForm({ name: '', email: '' });
        setEditId(null);
    };

    return (
        <div className="user-container">
            <h2 className="title">User Management</h2>

            <form onSubmit={handleSubmit} className="user-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-input"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="form-input"
                />
                <button type="submit" className="btn submit-btn">
                    {editId ? 'Update' : 'Add'}
                </button>
            </form>

            <ul className="user-list">
                {users.map((u) => (
                    <li key={u.id} className="user-item">
                        <span className="user-info">{u.name} ({u.email})</span>
                        <div className="action-buttons">
                            <button
                                onClick={() => { setForm(u); setEditId(u.id); }}
                                className="btn edit-btn"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => dispatch(deleteUser(u.id))}
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

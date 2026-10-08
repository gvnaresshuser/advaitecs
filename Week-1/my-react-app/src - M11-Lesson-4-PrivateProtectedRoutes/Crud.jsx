import React, { useEffect, useState } from "react";
//import axios from "axios";

function Crud() {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [editId, setEditId] = useState(null); // Track ID for editing

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        //const response = await axios.get("http://localhost:5000/users");
        const response = await fetch("http://localhost:5000/users");
        setUsers(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            // If edit mode is active, update user
            await axios.put(`http://localhost:5000/users/${editId}`, formData);
            setEditId(null);
        } else {
            // Otherwise, create a new user
            await axios.post("http://localhost:5000/users", formData);
        }
        setFormData({ name: "", email: "", phone: "" }); // Reset form
        fetchUsers();
    };

    const handleEdit = (user) => {
        setFormData({ name: user.name, email: user.email, phone: user.phone });
        setEditId(user.id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/users/${id}`);
        fetchUsers();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-5">User Management</h2>

            {/* Form Section */}
            <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg rounded-lg p-8 w-full max-w-md"
            >
                <h2 className="text-white text-2xl font-bold text-center mb-6">
                    {editId ? "Update User" : "User Registration"}
                </h2>

                <div className="w-full max-w-md flex flex-col items-center">
                    <div className="mb-4 w-72">
                        <input
                            type="text"
                            style={{ width: "290px" }}
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="w-full h-12 p-3 text-lg border border-transparent rounded-lg focus:outline-none bg-white shadow-md focus:ring-2 focus:ring-pink-400 appearance-none"
                        />
                    </div>
                    <div className="mb-4 w-72">
                        <input
                            type="email"
                            style={{ width: "290px" }}
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full h-12 p-3 text-lg border border-transparent rounded-lg focus:outline-none bg-white shadow-md focus:ring-2 focus:ring-green-400 appearance-none"
                        />
                    </div>
                    <div className="mb-4 w-72">
                        <input
                            type="text"
                            style={{ width: "290px" }}
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                            className="w-full h-12 p-3 text-lg border border-transparent rounded-lg focus:outline-none bg-white shadow-md focus:ring-2 focus:ring-yellow-400 appearance-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className={`w-72 h-12 text-white text-lg rounded-lg font-semibold transition duration-300 shadow-lg ${editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-pink-500 hover:bg-pink-600"
                        }`}
                >
                    {editId ? "Update User" : "Add User"}
                </button>
            </form>

            {/* User List Section */}
            <h3 className="text-2xl font-semibold text-gray-700 mt-10 mb-4">Users List</h3>
            <div className="w-full max-w-3xl">
                <ul className="bg-white shadow-lg rounded-lg p-4">
                    {users.length === 0 ? (
                        <p className="text-gray-500 text-center">No users found.</p>
                    ) : (
                        users.map((user) => (
                            <li
                                key={user.id}
                                className={`flex justify-between items-center p-4 mb-2 rounded-lg border ${editId === user.id ? "bg-yellow-100 border-yellow-500" : "bg-gray-50"
                                    }`}
                            >
                                <span className="text-gray-700">
                                    <strong>{user.name}</strong> - {user.email} - {user.phone}
                                </span>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Crud;

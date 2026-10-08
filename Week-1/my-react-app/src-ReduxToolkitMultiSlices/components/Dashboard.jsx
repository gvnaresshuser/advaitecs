import React from 'react';
import { useSelector } from 'react-redux';

function Dashboard() {
    const { users } = useSelector((state) => state.user);
    const { products } = useSelector((state) => state.products);
    const { items } = useSelector((state) => state.inventory);

    return (
        <div>
            <h2>Users</h2>
            <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>

            <h2>Products</h2>
            <ul>{products.map((p) => <li key={p.id}>{p.name}</li>)}</ul>

            <h2>Inventory</h2>
            <ul>{items.map((i) => <li key={i.id}>{i.productId} - Qty: {i.quantity}</li>)}</ul>
        </div>
    );
}

export default Dashboard;

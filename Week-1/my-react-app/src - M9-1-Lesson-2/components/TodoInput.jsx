import React, { useState } from 'react';

function TodoInput({ onAddTodo }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onAddTodo(input.trim());
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="todo-input-form">
            <input
                type="text"
                placeholder="Add a new task"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="todo-input"
            />
            <button type="submit" className="add-button">Add</button>
        </form>
    );
}

export default TodoInput;

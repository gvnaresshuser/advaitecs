import React, { useState } from 'react';

function TodoItem({ todo, onDelete, onToggle, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleEdit = () => {
        if (isEditing && editText.trim()) {
            onUpdate(todo.id, editText.trim());
        }
        setIsEditing(!isEditing);
    };

    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            {isEditing ? (
                <input
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                />
            ) : (
                <span>{todo.text}</span>
            )}
            <div className="buttons">
                <button onClick={handleEdit} className="edit-button">
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button onClick={() => onDelete(todo.id)} className="delete-button">
                    ❌
                </button>
            </div>
        </li>
    );
}

export default TodoItem;

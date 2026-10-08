import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onDeleteTodo, onToggleComplete, onUpdateTodo }) {
    if (todos.length === 0) {
        return <p className="no-tasks">No tasks yet.</p>;
    }

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={onDeleteTodo}
                    onToggle={onToggleComplete}
                    onUpdate={onUpdateTodo}
                />
            ))}
        </ul>
    );
}

export default TodoList;

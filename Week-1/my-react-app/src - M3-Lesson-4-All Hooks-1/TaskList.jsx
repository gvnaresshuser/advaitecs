import React from "react";
import { useTasks } from "./TaskContext";

export default function TaskList() {
    const { tasks, dispatch } = useTasks();

    if (tasks.length === 0) {
        return <p style={styles.empty}>No tasks yet. Add one above ⬆️</p>;
    }

    return (
        <ul style={styles.list}>
            {tasks.map(task => (
                <li key={task.id} style={styles.item}>
                    <span
                        style={{
                            ...styles.text,
                            textDecoration: task.completed ? "line-through" : "none",
                            color: task.completed ? "#2ecc71" : "#333"
                        }}
                    >
                        {task.text}
                    </span>
                    <div>
                        <button
                            style={{
                                ...styles.btn,
                                background: task.completed ? "#f39c12" : "#2ecc71"
                            }}
                            onClick={() =>
                                dispatch({ type: "TOGGLE_TASK", payload: task.id })
                            }
                        >
                            {task.completed ? "Undo" : "Complete"}
                        </button>
                        <button
                            style={{ ...styles.btn, background: "#e74c3c" }}
                            onClick={() =>
                                dispatch({ type: "DELETE_TASK", payload: task.id })
                            }
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}

const styles = {
    list: {
        listStyle: "none",
        padding: 0,
        margin: 0
    },
    item: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#fafafa"
    },
    text: {
        fontSize: "15px",
        flex: 1,
        textAlign: "left"
    },
    btn: {
        marginLeft: "6px",
        border: "none",
        borderRadius: "6px",
        padding: "6px 10px",
        color: "#fff",
        cursor: "pointer",
        fontSize: "13px"
    },
    empty: {
        color: "#888",
        fontStyle: "italic"
    }
};

import React, { useState } from "react";
import { useTasks } from "./TaskContext";

export default function TaskForm() {
    const [text, setText] = useState("");
    const { dispatch } = useTasks();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() === "") return;
        dispatch({ type: "ADD_TASK", payload: text });
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter task..."
                style={styles.input}
            />
            <button type="submit" style={styles.addBtn}>➕ Add</button>
        </form>
    );
}

const styles = {
    form: {
        display: "flex",
        marginBottom: "1.5rem"
    },
    input: {
        flex: 1,
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "14px"
    },
    addBtn: {
        marginLeft: "8px",
        background: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "10px 15px",
        cursor: "pointer",
        transition: "0.3s"
    }
};

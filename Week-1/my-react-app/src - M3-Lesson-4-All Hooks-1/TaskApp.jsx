import React from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useTasks } from "./TaskContext";

export default function TaskApp() {
    const { tasks } = useTasks();
    const completedCount = tasks.filter(t => t.completed).length;

    return (
        <div style={styles.card}>
            <h2 style={styles.title}>📝 Task Manager</h2>
            <p style={styles.subtitle}>
                Total: <b>{tasks.length}</b> | Completed: <b>{completedCount}</b>
            </p>
            <TaskForm />
            <TaskList />
        </div>
    );
}

const styles = {
    card: {
        background: "#fff",
        border:'1px solid navy',
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        width: "100%",
        maxWidth: "420px",
        textAlign: "center"
    },
    title: {
        marginBottom: "0.5rem",
        color: "#333"
    },
    subtitle: {
        marginBottom: "1.5rem",
        color: "#666"
    }
};

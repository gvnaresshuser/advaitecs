import React from "react";
import { TaskProvider } from "./TaskContext";
import TaskApp from "./TaskApp";
import "./App.css";

export default function App() {
    return (
        <TaskProvider>
            <div>
                <TaskApp />
            </div>
        </TaskProvider>
    );
}



import React, { createContext, useReducer, useContext } from "react";

// 1. Create Context
const TaskContext = createContext();

// 2. Reducer
function taskReducer(state, action) {
    switch (action.type) {
        case "ADD_TASK":
            return [
                ...state,
                { id: Date.now(), text: action.payload, completed: false }
            ];
        case "TOGGLE_TASK":
            return state.map(task =>
                task.id === action.payload
                    ? { ...task, completed: !task.completed }
                    : task
            );
        case "DELETE_TASK":
            return state.filter(task => task.id !== action.payload);
        default:
            return state;
    }
}

// 3. Provider
export function TaskProvider({ children }) {
    const [tasks, dispatch] = useReducer(taskReducer, []);
    return (
        <TaskContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}

// 4. Custom Hook
export function useTasks() {
    return useContext(TaskContext);
}

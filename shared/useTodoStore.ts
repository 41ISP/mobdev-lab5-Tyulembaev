import ITodo from "@/Interfaces/ITodo";
import { create } from "zustand";

interface TodoState {
    todos : ITodo[],
    addTodo : (todo : ITodo) => void,
    deleteTodo : (id : string) => void,
    changeStatus : (id : string) => void
}

const useTodoStore = create<TodoState>()((set) => ({
    todos : [],
    addTodo : (todo) => set((state) => ({todos : [...state.todos, todo]})),
    deleteTodo : (id : string) => set((state) => ({todos: [...state.todos.filter(x => x.id != id)]})),
    changeStatus: (id : string) => set((state) => ({todos: [...state.todos.map(t => t.id === id ? {...t, isCompleted : !t.isCompleted} : t)]}))
}));

export default useTodoStore
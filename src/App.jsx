import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { datadummy } from "./data/datadummy";
import TodoList from "./components/TodoList";
import TodoDetail from "./components/TodoDetail";

export default function App() {
  const [todos, setTodos] = useState(datadummy);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  const addTodo = (data) => {
    const newId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    setTodos([...todos, { ...data, id: newId }]);
    showToast("Todo berhasil ditambahkan");
  };

  const updateTodo = (id, data) => {
    setTodos(todos.map((t) => (t.id === id ? { ...data, id } : t)));
    showToast("Todo berhasil diperbarui");
  };

  const deleteTodo = (id) => {
    if (!window.confirm("Yakin ingin menghapus todo ini?")) return;
    setTodos(todos.filter((t) => t.id !== id));
    showToast("Todo berhasil dihapus");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route
          path="/"
          element={<TodoList todos={todos} onAdd={addTodo} onDelete={deleteTodo} />}
        />
        <Route
          path="/todo/:id"
          element={<TodoDetail todos={todos} onUpdate={updateTodo} />}
        />
      </Routes>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-emerald-800 px-5 py-3 text-sm font-medium text-white shadow-xl">
          ✓ {toast}
        </div>
      )}
    </div>
  );
}
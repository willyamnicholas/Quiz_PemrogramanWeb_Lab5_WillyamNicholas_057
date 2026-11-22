import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TodoForm from "./TodoFrom";

export default function TodoDetail({ todos, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);


  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <p>Todo tidak ditemukan.</p>
        <button
          onClick={() => navigate("/")}
          className="rounded bg-red-600 px-3 py-1.5 text-xs text-white"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="grid w-full max-w-2xl grid-cols-1 gap-6 rounded-lg border border-gray-200 p-6 shadow-sm sm:grid-cols-2">
        <div>
          <h3 className="font-bold">Judul</h3>
          <p className="mb-3 text-sm">{todo.title}</p>
          <h3 className="font-bold">Deskripsi</h3>
          <div className="h-24 overflow-auto rounded border border-gray-200 p-2 text-sm">
            {todo.description || "-"}
          </div>
        </div>

        <div>
          <h3 className="font-bold">Status</h3>
          <p className="mb-3 text-sm">{todo.status}</p>
          <h3 className="font-bold">Prioritas</h3>
          <p className="mb-3 text-sm">{todo.priority}</p>
          <h3 className="font-bold">Deadline</h3>
          <p className="mb-3 text-sm">{todo.deadline}</p>

          <div className="flex gap-2">
            <button
              onClick={() => navigate("/")}
              className="rounded bg-red-600 px-3 py-1.5 text-xs text-white hover:bg-red-700"
            >
              Kembali
            </button>
            <button
              onClick={() => setShowEdit(true)}
              className="rounded bg-blue-600 px-3 py-1.5 text-xs text-white hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {showEdit && (
        <TodoForm
          heading="Update Todo"
          submitLabel="Update"
          initialData={todo}
          onClose={() => setShowEdit(false)}
          onSubmit={(data) => {
            onUpdate(todo.id, data);
            setShowEdit(false);
          }}
        />
      )}
    </div>
  );
}
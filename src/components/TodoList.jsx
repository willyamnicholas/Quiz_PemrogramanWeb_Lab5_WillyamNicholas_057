import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoForm from "./TodoFrom";
import { EyeIcon, TrashIcon, CheckIcon, PlusIcon } from "./Icon";
import { StatusBadge, PriorityBadge } from "./Badge";

export default function TodoList({ todos, onAdd, onDelete }) {
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between rounded-3xl bg-white/80 p-5 shadow-lg ring-1 ring-emerald-100 backdrop-blur">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-900 text-white shadow">
            <CheckIcon className="h-7 w-7" />
          </div>
          <div className="h-12 w-px bg-emerald-900" />
          <div>
            <h1 className="text-4xl font-extrabold text-emerald-950">Todo List</h1>
            <p className="text-sm text-gray-500">Kerjain tugasmu ni, nanti makin numpuk :b</p>
          </div>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 rounded-xl bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-800"
        >
          <PlusIcon /> Tambah Todo
        </button>
      </div>

      <div className="rounded-3xl bg-white/80 p-3 shadow-lg ring-1 ring-emerald-100 backdrop-blur">
        <table className="w-full table-fixed border-separate border-spacing-y-2 text-left text-sm">
          <thead>
            <tr className="text-white">
              <th className="w-1/3 bg-emerald-900 px-5 py-4 font-semibold first:rounded-l-2xl">Judul</th>
              <th className="bg-emerald-900 px-4 py-4 font-semibold">Status</th>
              <th className="bg-emerald-900 px-4 py-4 font-semibold">Prioritas</th>
              <th className="bg-emerald-900 px-4 py-4 font-semibold">Deadline</th>
              <th className="bg-emerald-900 px-4 py-4 text-center font-semibold last:rounded-r-2xl">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              const overdue = todo.deadline < today && todo.status !== "done";
              const cell = "bg-emerald-50/60 px-4 py-3 group-hover:bg-emerald-100/70";
              return (
                <tr key={todo.id} className="group">
                  <td className={`${cell} rounded-l-2xl px-5`}>
                    <div className="truncate border-l-4 border-emerald-800 pl-3 font-medium text-gray-800">
                      {todo.title}
                    </div>
                  </td>
                  <td className={cell}><StatusBadge status={todo.status} /></td>
                  <td className={cell}><PriorityBadge priority={todo.priority} /></td>
                  <td className={`${cell} ${overdue ? "font-semibold text-red-600" : "text-gray-700"}`}>
                    {todo.deadline}
                    {overdue && <span className="ml-1 text-xs">(lewat)</span>}
                  </td>
                  <td className={`${cell} rounded-r-2xl`}>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => navigate(`/todo/${todo.id}`)}
                        className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                        title="Lihat detail"
                      >
                        <EyeIcon />
                      </button>
                      <button
                        onClick={() => onDelete(todo.id)}
                        className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                        title="Hapus"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {todos.length === 0 && (
          <p className="py-12 text-center text-sm text-gray-500">
            Belum ada todo. Klik "Tambah Todo" untuk mulai.
          </p>
        )}
      </div>

      {showAdd && (
        <TodoForm
          heading="Tambah Todo"
          submitLabel="Tambah"
          onClose={() => setShowAdd(false)}
          onSubmit={(data) => {
            onAdd(data);
            setShowAdd(false);
          }}
        />
      )}
    </div>
  );
}
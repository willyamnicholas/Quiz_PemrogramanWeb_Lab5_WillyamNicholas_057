import { useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  status: "to-do",
  priority: "low",
  deadline: "",
};

const inputClass =
  "w-full rounded border border-blue-200 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400";

export default function TodoForm({
  heading,
  submitLabel,
  initialData = emptyForm,
  onSubmit,
  onClose,
}) {
  const [form, setForm] = useState(initialData);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.deadline) {
      setError("Judul dan deadline wajib diisi.");
      return;
    }
    onSubmit(form);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-center font-bold">{heading}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-bold">Judul</label>
            <input name="title" value={form.title} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold">Deskripsi</label>
            <textarea
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-bold">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                <option value="to-do">to-do</option>
                <option value="in progress">in progress</option>
                <option value="done">done</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-sm font-bold">Prioritas</label>
              <select name="priority" value={form.priority} onChange={handleChange} className={inputClass}>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-bold">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded bg-red-600 py-2 text-sm text-white hover:bg-red-700"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 rounded bg-blue-500 py-2 text-sm text-white hover:bg-blue-600"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
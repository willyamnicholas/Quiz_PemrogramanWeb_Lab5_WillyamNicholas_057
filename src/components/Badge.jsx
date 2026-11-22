export function StatusBadge({ status }) {
  const styles = {
    "to-do": { box: "bg-gray-100 text-gray-700", dot: "bg-gray-400" },
    "in progress": { box: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
    done: { box: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  };
  const s = styles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-semibold ${s.box}`}>
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const styles = {
    low: "bg-sky-100 text-sky-700",
    medium: "bg-orange-100 text-orange-700",
    high: "bg-red-100 text-red-700",
  };
  return (
    <span className={`inline-block rounded px-2.5 py-1 text-xs font-semibold ${styles[priority]}`}>
      {priority}
    </span>
  );
}
import { Pencil, Trash2 } from "lucide-react";

/** Edit/Delete icon buttons — use inside a column's render for row actions */
export function RowActions({
  onEdit,
  onDelete,
  isDeleting,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      {onEdit && (
        <div className="group relative">
          <button
            onClick={onEdit}
            aria-label="Edit"
            className="rounded-md border border-gray-700 p-1.5 text-gray-400 transition-colors hover:border-sky-500/50 hover:text-sky-400"
          >
            <Pencil size={14} />
          </button>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-950 px-2 py-1 text-xs text-gray-200 opacity-0 shadow-md transition-opacity group-hover:opacity-100">
            Edit
          </span>
        </div>
      )}

      {onDelete && (
        <div className="group relative">
          <button
            onClick={onDelete}
            disabled={isDeleting}
            aria-label="Delete"
            className="rounded-md border border-gray-700 p-1.5 text-gray-400 transition-colors hover:border-red-500/50 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Trash2 size={14} />
          </button>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-950 px-2 py-1 text-xs text-gray-200 opacity-0 shadow-md transition-opacity group-hover:opacity-100">
            {isDeleting ? "Deleting..." : "Delete"}
          </span>
        </div>
      )}
    </div>
  );
}
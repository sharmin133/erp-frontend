import { Pencil, Trash2 } from "lucide-react";

interface RowActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

export function RowActions({
  onEdit,
  onDelete,
  isDeleting = false,
}: RowActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {onEdit && (
        <div className="group relative">
          <button
            type="button"
            onClick={onEdit}
            aria-label="Edit"
            className="rounded-md border border-gray-200 p-1.5 text-gray-500 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <Pencil size={14} />
          </button>

          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 shadow transition-opacity group-hover:opacity-100">
            Edit
          </span>
        </div>
      )}

      {onDelete && (
        <div className="group relative">
          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            aria-label="Delete"
            className="rounded-md border border-gray-200 p-1.5 text-gray-500 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={14} />
          </button>

          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 shadow transition-opacity group-hover:opacity-100">
            {isDeleting ? "Deleting..." : "Delete"}
          </span>
        </div>
      )}
    </div>
  );
}

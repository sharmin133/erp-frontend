import type { ReactNode } from "react";
import { Inbox, Pencil, Trash2 } from "lucide-react";

export interface Column<T> {
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  rowKey: (row: T) => string;
}

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

/**
 * Fully generic, reusable table component.
 * Any module (Products, Customers, Sales) passes its own columns + data.
 */
export function DataTable<T>({
  columns,
  data,
  isLoading,
  emptyMessage = "No records found",
  rowKey,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800 text-sm">
          <thead className="bg-gray-800/50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.header}
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col.header} className="px-4 py-3.5">
                      <div className="h-3.5 w-3/4 animate-pulse rounded bg-gray-800" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-14">
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <Inbox size={28} className="text-gray-600" />
                    <p className="text-sm">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={rowKey(row)}
                  className={`transition-colors hover:bg-gray-800/60 ${
                    i % 2 === 1 ? "bg-gray-800/20" : ""
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.header}
                      className={`whitespace-nowrap px-4 py-3.5 text-gray-200 ${col.className || ""}`}
                    >
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
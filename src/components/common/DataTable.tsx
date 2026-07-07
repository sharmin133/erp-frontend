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

/** Reusable row action buttons */
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

/** Generic reusable table */
export function DataTable<T>({
  columns,
  data,
  isLoading,
  emptyMessage = "No records found",
  rowKey,
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.header}
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col.header} className="px-4 py-3.5">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-14">
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <Inbox size={30} className="text-gray-400" />
                    <p className="text-sm">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={rowKey(row)}
                  className={`transition-colors hover:bg-emerald-50 ${
                    index % 2 === 1 ? "bg-gray-50" : ""
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.header}
                      className={`whitespace-nowrap px-4 py-3.5 text-gray-700 ${
                        col.className ?? ""
                      }`}
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

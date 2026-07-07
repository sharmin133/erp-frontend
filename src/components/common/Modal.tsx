import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-3">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-emerald-700"
          >
            <X size={20} />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

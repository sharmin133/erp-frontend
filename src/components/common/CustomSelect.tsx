import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  disabled?: boolean;
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className = "",
  triggerClassName = "",
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  const updateCoords = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    });
  };

  useLayoutEffect(() => {
    if (isOpen) updateCoords();
  }, [isOpen]);

  // close on outside click 
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(target) &&
        listRef.current &&
        !listRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // reposition on scroll/resize instead of leaving the dropdown stranded
  useEffect(() => {
    if (!isOpen) return;
    const handle = () => updateCoords();
    window.addEventListener("scroll", handle, true);
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle, true);
      window.removeEventListener("resize", handle);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <button
        type="button"
        ref={triggerRef}
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm text-gray-900 transition-colors focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 ${triggerClassName}`}
      >
        <span className={selected ? "" : "text-gray-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={listRef}
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              width: coords.width,
            }}
            className="z-1000 max-h-60 overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg shadow-gray-900/10"
          >
            {options.length === 0 && (
              <p className="px-3 py-2 text-sm text-gray-400">No options</p>
            )}

            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  type="button"
                  key={opt.value}
                  disabled={opt.disabled}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                    isSelected
                      ? "bg-emerald-50 font-medium text-emerald-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                  {isSelected && (
                    <Check size={14} className="text-emerald-700" />
                  )}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
    </div>
  );
}
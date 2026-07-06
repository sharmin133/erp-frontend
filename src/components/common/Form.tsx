import type { ReactNode, SyntheticEvent } from "react";
import { Button } from "./Button";

export type FieldType = "text" | "email" | "password" | "number" | "select" | "file" | "textarea";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[]; // for type = "select"
  accept?: string; // for type = "file", e.g. "image/*"
  min?: number;    // for type = "number"
}

interface FormProps {
  fields: FormField[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  onSubmit: () => void;
  submitLabel: string;
  isLoading?: boolean;
  error?: string | null;
  footer?: ReactNode;
}

export const Form = ({
  fields, values, onChange, onSubmit, submitLabel, isLoading, error, footer,
}: FormProps) => {
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const baseInputClasses =
    "w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded-md border border-red-800 bg-red-950 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      {fields.map((field) => (
        <div key={field.name}>
          <label className="mb-1 block text-sm font-medium text-gray-300">
            {field.label}
            {field.required && <span className="text-sky-400"> *</span>}
          </label>

          {field.type === "select" ? (
            <select
              required={field.required}
              value={values[field.name] ?? ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              className={baseInputClasses}
            >
              <option value="">Select {field.label.toLowerCase()}</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea
              required={field.required}
              placeholder={field.placeholder}
              value={values[field.name] ?? ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              className={`${baseInputClasses} min-h-20`}
            />
          ) : field.type === "file" ? (
            <input
              type="file"
              required={field.required}
              accept={field.accept}
              onChange={(e) => onChange(field.name, e.target.files?.[0] ?? null)}
              className="w-full text-sm text-gray-300 file:mr-3 file:rounded-md file:border-0 file:bg-sky-500 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-sky-600"
            />
          ) : (
            <input
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              min={field.min}
              value={values[field.name] ?? ""}
              onChange={(e) =>
                onChange(field.name, field.type === "number" ? Number(e.target.value) : e.target.value)
              }
              className={baseInputClasses}
            />
          )}
        </div>
      ))}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Please wait..." : submitLabel}
      </Button>

      {footer}
    </form>
  );
};
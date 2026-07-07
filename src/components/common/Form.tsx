import type { ReactNode, SyntheticEvent } from "react";
import { Button } from "./Button";

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "select"
  | "file"
  | "textarea";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  accept?: string;
  min?: number;
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
  fields,
  values,
  onChange,
  onSubmit,
  submitLabel,
  isLoading,
  error,
  footer,
}: FormProps) => {
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const baseInputClasses =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {fields.map((field) => (
        <div key={field.name}>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-emerald-700"> *</span>}
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
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
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
              onChange={(e) =>
                onChange(field.name, e.target.files?.[0] ?? null)
              }
              className="w-full text-sm text-gray-600 file:mr-3 file:rounded-md file:border-0 file:bg-emerald-700 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-emerald-800"
            />
          ) : (
            <input
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              min={field.min}
              value={values[field.name] ?? ""}
              onChange={(e) =>
                onChange(
                  field.name,
                  field.type === "number"
                    ? Number(e.target.value)
                    : e.target.value,
                )
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

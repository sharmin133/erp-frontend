import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

/** Reusable search input */
export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
}: Props) => {
  return (
    <div className="relative w-full max-w-xs">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
      />
    </div>
  );
};

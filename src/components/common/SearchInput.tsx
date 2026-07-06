import { Search } from "lucide-react";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

/** Reusable debounced-friendly search box */
export const SearchInput = ({ value, onChange, placeholder = "Search..." }: Props) => (
  <div className="relative w-full max-w-xs">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-md border border-gray-700 bg-gray-900 py-2 pl-9 pr-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
    />
  </div>
);
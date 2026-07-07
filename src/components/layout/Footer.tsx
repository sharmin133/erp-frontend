import { Link } from "react-router";

const links = [
  { label: "Product", href: "/product" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-bold transition-colors hover:text-emerald-700"
        >
          <span className="text-emerald-700">ERP</span>
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-emerald-700"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} ERP. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
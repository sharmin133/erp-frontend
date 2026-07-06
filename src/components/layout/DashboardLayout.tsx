import { useState } from "react";
import { Outlet, Link } from "react-router";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="mx-auto flex min-h-screen max-w-[1920px] bg-gray-950">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-4 py-3 lg:hidden">
          <Link to="/" className="text-lg font-bold text-white">
            <span className="text-sky-400">ERP</span>
          </Link>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-md p-1.5 text-gray-300 transition hover:bg-gray-800 hover:text-white"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
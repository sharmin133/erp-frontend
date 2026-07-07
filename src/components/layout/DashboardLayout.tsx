import { useState } from "react";
import { Outlet, Link } from "react-router";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { useRealtimeSync } from "../../features/dashboard/useRealtimeSync";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Connects the socket once and wires up dashboard
  useRealtimeSync();

  return (
    <div className="mx-auto flex min-h-screen max-w-[1920px] bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile Header */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm lg:hidden">
          <Link
            to="/"
            className="text-lg font-bold transition-colors hover:text-emerald-700"
          >
            <span className="text-emerald-700">ERP</span>
          </Link>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-emerald-700"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
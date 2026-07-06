import { Link, NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  X,
} from "lucide-react";
import { useAppSelector } from "../../app/hooks";
import { useLogout } from "../../features/auth/useAuth";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/dashboard/products", label: "Products", icon: Package },
  { to: "/dashboard/sales/create", label: "Create Sale", icon: ShoppingCart },
];

const roleBadgeStyle: Record<string, string> = {
  admin: "bg-sky-500/10 text-sky-400 border-sky-500/30",
  manager: "bg-violet-500/10 text-violet-400 border-violet-500/30",
  employee: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Reusable left sidebar for the dashboard area */
export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { user } = useAppSelector((s) => s.auth);
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => navigate("/login"),
    });
  };

  const roleKey = (user?.role || "").toLowerCase();
  const badgeClass =
    roleBadgeStyle[roleKey] ??
    "bg-gray-700/30 text-gray-300 border-gray-600/40";

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 shrink-0 flex-col border-r border-gray-800 bg-gray-900 p-4 transition-transform duration-200 ease-in-out lg:static lg:z-auto lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between px-2">
          <Link
            to="/"
            onClick={onClose}
            className="text-lg font-bold text-white transition hover:text-sky-400"
          >
            <span className="text-sky-400">ERP</span>
          </Link>

          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-800 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* User + role badge */}
        {user && (
          <div className="mb-6 rounded-md border border-gray-800 bg-gray-800/50 px-3 py-2.5">
            <p className="truncate text-sm font-medium text-white">
              {user.name}
            </p>
            <span
              className={`mt-1.5 inline-block rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize ${badgeClass}`}
            >
              {user.role}
            </span>
          </div>
        )}

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-sky-500/10 font-medium text-sky-400"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
  onClick={handleLogout}
  disabled={isPending}
  className="
    flex items-center justify-center gap-2
    rounded-md
    border border-red-500/40
    bg-red-500/10
    px-3 py-2.5
    text-sm font-medium text-red-400
    transition-all duration-200
    hover:bg-red-500 hover:text-white hover:border-red-500
    active:scale-95
    disabled:cursor-not-allowed disabled:opacity-50
  "
> 
          <LogOut size={16} />
          {isPending ? "Signing out..." : "Sign out"}
        </button>
      </aside>
    </>
  );
}

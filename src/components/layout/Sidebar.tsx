import { Link, NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  X,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../app/hooks";
import { useLogout } from "../../features/auth/useAuth";

const baseNavItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/dashboard/products",
    label: "Products",
    icon: Package,
  },
  {
    to: "/dashboard/sales/create",
    label: "Create Sale",
    icon: ShoppingCart,
  },
];

const roleBadgeStyle: Record<string, string> = {
  admin: "bg-emerald-100 text-emerald-800 border-emerald-200",
  manager: "bg-emerald-50 text-emerald-700 border-emerald-200",
  employee: "bg-gray-100 text-gray-600 border-gray-200",
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { mutate: logout, isPending } = useLogout();

  const navItems = [
    ...baseNavItems,
    ...(user?.role === "admin"
      ? [
          {
            to: "/dashboard/users",
            label: "Users & Roles",
            icon: ShieldCheck,
          },
        ]
      : []),
  ];

  const badgeClass =
    roleBadgeStyle[user?.role?.toLowerCase() || ""] ?? roleBadgeStyle.employee;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Signed out successfully!");
        navigate("/login");
      },
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-gray-200 bg-white p-4 transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="mb-5 flex items-center justify-between">
          <Link to="/" onClick={onClose} className="text-lg font-bold">
            <span className="text-emerald-700">ERP</span>
          </Link>

          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* User */}
        {user && (
          <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-3">
            <p className="truncate text-sm font-semibold text-gray-900">
              {user.name}
            </p>

            <span
              className={`mt-2 inline-flex rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${badgeClass}`}
            >
              {user.role}
            </span>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-emerald-50 font-medium text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-emerald-700"
                }`
              }
            >
              <Icon size={17} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={isPending}
          className="mt-5 flex items-center justify-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-500 transition hover:border-red-500 hover:bg-red-500 hover:text-white disabled:opacity-50"
        >
          <LogOut size={16} />
          {isPending ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </>
  );
}

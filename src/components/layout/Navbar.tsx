import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { useAppSelector } from "../../app/hooks";
import { useLogout } from "../../features/auth/useAuth";

export default function Navbar() {
  const { user, isCheckingAuth } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useLogout();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = !!user && !isCheckingAuth;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-800 bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="text-xl font-bold">
          <span className="text-sky-400">ERP</span>
        </Link>

        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <div className="relative" ref={menuRef}>
              {/* Trigger */}
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800 px-2 py-1.5 pr-3 text-sm font-medium text-white transition hover:border-sky-400 sm:pr-4"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-xs font-semibold text-white">
                  {initials}
                </span>

                <span className="hidden max-w-30 truncate sm:block">
                  {user.name}
                </span>

                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg border border-gray-800 bg-gray-800 shadow-lg shadow-black/30">
                  {/* User info */}
                  <div className="border-b border-gray-700 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-white">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-gray-400">
                      {user.role}
                    </p>
                  </div>

                  {/* Dashboard link */}
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-200 transition hover:bg-gray-700 hover:text-sky-400"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>

                  {/* Sign out */}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      logout(undefined, {
                        onSuccess: () => navigate("/login"),
                      });
                    }}
                    disabled={isPending}
                    className="flex w-full items-center gap-2 rounded-b-lg px-4 py-2.5 text-left text-sm text-red-400 transition hover:bg-gray-700 disabled:opacity-50"
                  >
                    <LogOut size={16} />
                    {isPending ? "Signing out..." : "Sign out"}
                  </button>
                </div>
              )}
            </div>
          )}

          {!isCheckingAuth && !user && (
            <>
              <Link
                to="/login"
                className="rounded-md border border-sky-400 px-4 py-2 text-sm font-medium text-sky-400 transition hover:bg-sky-400 hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
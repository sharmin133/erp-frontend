import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../app/hooks";
import { useLogout } from "../../features/auth/useAuth";

export default function Navbar() {
  const { user, isCheckingAuth } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useLogout();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = !!user && !isCheckingAuth;

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
    <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="text-xl font-bold">
          <span className="text-emerald-700">ERP</span>
        </Link>

        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-2 py-1.5 pr-3 text-sm font-medium text-gray-800 transition hover:border-emerald-700 sm:pr-4"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700 text-xs font-semibold text-white">
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

              {isOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg border border-gray-200 bg-white shadow-lg shadow-black/5">
                  <div className="border-b border-gray-200 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user.role}
                    </p>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      logout(undefined, {
                        onSuccess: () => {
                          toast.success("Signed out successfully!");
                          navigate("/login");
                        },
                      });
                    }}
                    disabled={isPending}
                    className="flex w-full items-center gap-2 rounded-b-lg px-4 py-2.5 text-left text-sm text-red-500 transition hover:bg-red-50 disabled:opacity-50"
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
                className="rounded-md border border-emerald-700 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-700 hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
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

import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../app/hooks";
import type { UserRole } from "../../types";

interface Props {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { user, isCheckingAuth } = useAppSelector((s) => s.auth);

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Checking session...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
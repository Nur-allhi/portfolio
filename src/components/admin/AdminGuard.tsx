import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";

export function AdminGuard() {
  const { isLoggedIn } = useAdminAuth();
  if (!isLoggedIn) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}

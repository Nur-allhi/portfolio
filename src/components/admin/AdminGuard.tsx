import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";

export function AdminGuard() {
  const { isLoggedIn, loading } = useAdminAuth();
  if (loading) return <div style={{ display: "grid", placeItems: "center", minHeight: "60vh", color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: 13 }}>Checking auth…</div>;
  if (!isLoggedIn) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}

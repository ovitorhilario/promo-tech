import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/context/auth";

export function PrivateRoutes() {
  const auth = useAuth();

  if (!auth?.token) {
    return <Navigate to="/sign-in" />;
  }
  return <Outlet />;
}
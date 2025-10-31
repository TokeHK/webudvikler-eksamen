import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  adminOnly?: boolean;
  children?: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

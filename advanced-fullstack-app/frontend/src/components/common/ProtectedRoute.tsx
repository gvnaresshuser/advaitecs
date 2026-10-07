import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

function ProtectedRoute() {
  const user = useAuthStore((state) => state.user);
  const initialized = useAuthStore((state) => state.initialized);

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-sm text-slate-500">Checking session...</p>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;

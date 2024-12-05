import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // Створюємо свій хук для авторизації
import AuthenticatedLayout from "../AuthenticatedLayout/AuthenticatedLayout";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AuthenticatedLayout>
      <Outlet />
    </AuthenticatedLayout>
  );
};

export default ProtectedRoute;

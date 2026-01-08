import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  // Verificamos si existe la llave
  const token = localStorage.getItem("token");

  // Si NO hay token, redirigir al Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si SÍ hay token, dejamos pasar (renderiza las rutas hijas)
  return <Outlet />;
};
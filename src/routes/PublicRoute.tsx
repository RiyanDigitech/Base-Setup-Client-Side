// src/routes/PublicRoute.tsx
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />; // Redirect to dashboard if token exists
  }

  return <>{children}</>;
};

export default PublicRoute;

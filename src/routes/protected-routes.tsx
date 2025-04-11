import { Navigate, Outlet, useLocation } from "react-router-dom";
import tokenService from "@/services/token.service";
interface ProtectedRouteProps {
  roleAllowed: string[]; // Array of allowed roles
}

const AUTH_ROUTES = [
  "/admin/login",
  "/admin/forgot-password",
  // "/admin/change-password",
  "/admin/reset-password/:token",
];
const isRouteMatch = (pathname: string) => {
  return AUTH_ROUTES.some((route) => {
    if (route.includes(":")) {
      // Handle dynamic routes like "/admin/reset-password/:id"
      const baseRoute = route.split(":")[0]; // Extract base route "/admin/reset-password/"
      return pathname.startsWith(baseRoute);
    }
    return route === pathname; // Match static routes
  });
};
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roleAllowed }) => {
  const userRole = tokenService?.getUserRoleFromCookie();
  const { pathname } = useLocation();
  const accessToken = tokenService.getLocalAccessToken();
  // if (!accessToken && !isRouteMatch(pathname)) {
  //   return <Navigate to="/admin/login" />; // Redirect to login if not authenticated
  // }

  // if (accessToken && isRouteMatch(pathname)) {
  //   return <Navigate to="/" />;
  // }
  // if (accessToken && (!userRole || !roleAllowed.includes(userRole))) {
  //   return <Navigate to="/unauthorized" />;
  // }
  if (!accessToken && !isRouteMatch(pathname)) {
    return <Navigate to="/" />;
  }

  if (accessToken && isRouteMatch(pathname)) {
    return <Navigate to="/" />;
  }
  if (accessToken && (!userRole || !roleAllowed.includes(userRole))) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;

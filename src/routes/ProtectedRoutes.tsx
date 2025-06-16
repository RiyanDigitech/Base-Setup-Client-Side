import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;




// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const location = useLocation();
//   const isAuthenticated = !!localStorage.getItem("token");  
  
  
//   // if (!isAuthenticated) {
//   //   return <Navigate to="/admin/login" state={{ from: location }} replace />;
//   // }

//   const authRoutes = ["/admin/login"];
//   const isAuthRoute = authRoutes.some((route) => location.pathname.startsWith(route));

//   if (!isAuthenticated && !isAuthRoute) {
//     return <Navigate to="/admin/login" state={{ from: location }} replace />;
//   }

//   //  Agar already login hai aur login page pe wapis ja raha hai → home pe bhej do
//   if (isAuthenticated && isAuthRoute) {
//     return <Navigate to="/" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;


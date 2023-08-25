import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  return <Outlet />;
};

export const AuthOnlyRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/signin" />;
};

export const GuestOnlyRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/todo" /> : <Outlet />;
};

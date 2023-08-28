import { Navigate, Outlet } from "react-router-dom";
import { USER_AUTH_TOKEN, ROUTE_PATH } from "@/lib/constants";

export const PublicRoute = () => {
  return <Outlet />;
};

export const AuthOnlyRoute = () => {
  const token = localStorage.getItem(USER_AUTH_TOKEN);
  return token ? <Outlet /> : <Navigate to={ROUTE_PATH.SIGN_IN} />;
};

export const GuestOnlyRoute = () => {
  const token = localStorage.getItem(USER_AUTH_TOKEN);
  return token ? <Navigate to={ROUTE_PATH.TODO} /> : <Outlet />;
};

import { Navigate, Outlet } from "react-router-dom";
import { USER_AUTH_TOKEN, ROUTE_PATH } from "@/lib/constants";
import Layout from "@/features/Layout";

export const PublicRoute = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export const AuthOnlyRoute = () => {
  const token = localStorage.getItem(USER_AUTH_TOKEN);
  return token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to={ROUTE_PATH.SIGN_IN} />
  );
};

export const GuestOnlyRoute = () => {
  const token = localStorage.getItem(USER_AUTH_TOKEN);
  return token ? (
    <Navigate to={ROUTE_PATH.TODO} />
  ) : (
    <Layout>
      <Outlet />
    </Layout>
  );
};

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Todo, SignIn, SignUp, Error } from "@/pages";
import { PublicRoute, AuthOnlyRoute, GuestOnlyRoute } from "./Routes";

const routerObject = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [{ path: "/", element: <Home />, errorElement: <Error /> }],
  },
  {
    element: <AuthOnlyRoute />,
    children: [{ path: "/todo", element: <Todo />, errorElement: <Error /> }],
  },
  {
    element: <GuestOnlyRoute />,
    children: [
      { path: "/signin", element: <SignIn />, errorElement: <Error /> },
      { path: "/signup", element: <SignUp />, errorElement: <Error /> },
    ],
  },
]);

const Router = <RouterProvider router={routerObject} />;

export default Router;

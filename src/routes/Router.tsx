import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Todo, SignIn, SignUp, Error } from "@/pages";
import { ROUTE_PATH } from "@/lib/constants";
import { PublicRoute, AuthOnlyRoute, GuestOnlyRoute } from "./Routes";
import { todoLoader } from "./loader";

const routerObject = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: ROUTE_PATH.HOME, element: <Home />, errorElement: <Error /> },
    ],
  },
  {
    element: <AuthOnlyRoute />,
    children: [
      {
        path: ROUTE_PATH.TODO,
        element: <Todo />,
        errorElement: <Error />,
        loader: todoLoader,
      },
    ],
  },
  {
    element: <GuestOnlyRoute />,
    children: [
      {
        path: ROUTE_PATH.SIGN_IN,
        element: <SignIn />,
        errorElement: <Error />,
      },
      {
        path: ROUTE_PATH.SIGN_UP,
        element: <SignUp />,
        errorElement: <Error />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={routerObject} />;
};

export default Router;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainView from "../views/Main";
import AllGamesList from "../views/AllGamesList";
import LoginPage from "../views/Login";
import CreateAccount from "../views/CreateAccount";
import AuthTest from "../views/AuthTest";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainView />,
      children: [
        {
          path: "/",
          element: <AllGamesList />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/create_account",
          element: <CreateAccount />,
        },
        {
          path: "/:id",
          element: <AllGamesList />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

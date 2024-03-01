import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import MainView from "../views/Main";
import AllGamesList from "../views/AllGamesList";
import LoginPage from "../views/Login";
import CreateAccount from "../views/CreateAccount";
import GameDetails from "../views/GameDetails";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Router() {
  const { user } = useAuthContext();

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
          element: !user ? <LoginPage /> : <Navigate to="/" />,
        },
        {
          path: "/create_account",
          element: !user ? <CreateAccount /> : <Navigate to="/" />,
        },
        {
          path: "/user/:id",
          element: <AllGamesList />,
        },
        {
          path: "/game/:id",
          element: <GameDetails />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

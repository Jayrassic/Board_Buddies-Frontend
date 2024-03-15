import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import MainView from "../views/Main";
import LoginPage from "../views/Login";
import CreateAccount from "../views/CreateAccount";
import GameDetails from "../views/GameDetails";
import Error404 from "../views/404";
import { useAuthContext } from "../hooks/useAuthContext";
import AllGames from "../views/AllGames";
import UsersList from "../views/UsersGamesList";

export default function Router() {
  const { user } = useAuthContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainView />,
      errorElement: <Error404 />,
      children: [
        {
          children: [
            {
              path: "",
              element: <AllGames />,
            },
            {
              path: "login",
              element: !user ? <LoginPage /> : <Navigate to="/" />,
            },
            {
              path: "create_account",
              element: !user ? <CreateAccount /> : <Navigate to="/" />,
            },
            {
              path: "user/:id",
              element: <UsersList />,
            },
            {
              path: "game/:id",
              element: <GameDetails />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

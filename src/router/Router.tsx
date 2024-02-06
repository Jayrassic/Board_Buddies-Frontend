import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainView from "../views/Main";
import TestHome from "../views/TestHome";
import LoginPage from "../views/Login";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainView />,
      children: [
        {
          path: "/",
          element: <TestHome />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

import { createBrowserRouter } from "react-router";
import LoginPage from "../feature/auth/pages/LoginPage";
import RegisterPage from "../feature/auth/pages/RegisterPage";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path:"/",
    element:<h1>HEllo snitch</h1>
  }
]);

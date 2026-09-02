import { createBrowserRouter } from "react-router";
import LoginPage from "../feature/auth/pages/LoginPage";
import RegisterPage from "../feature/auth/pages/RegisterPage";
import CreateProductPage from "../feature/product/pages/CreateProductPage";

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
    path: "/",
    element: <h1>HEllo snitch</h1>
  },
  {
    path: "/products/create",
    element: <CreateProductPage />
  }
]);

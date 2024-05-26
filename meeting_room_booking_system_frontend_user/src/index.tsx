import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UpdatePassword } from "./update_password/UpdatePassword";
import { ErrorPage } from "./error/ErrorPage";
import { Login } from "./login/Login";
import { Register } from "./register/Register";

const routes = [
  {
    path: "/",
    element: <div>index</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "update_password",
    element: <UpdatePassword />,
  },
];
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);

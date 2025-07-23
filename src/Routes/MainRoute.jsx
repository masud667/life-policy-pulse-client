import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error";
import RootLayout from "../Layouts/RootLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

const mainRoute= createBrowserRouter([
{
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {},
    ],
  },
])
export default mainRoute;
import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Error from "../Pages/Error";
import AllPoliciesPage from "../Pages/AllPoliciesPage/AllPoliciesPage";
import axios from "axios";
import PolicyDetails from "../Pages/PolicyDetailsPage/PolicyDetails";
import QuotePage from "../Pages/QuotePage/QuotePage";
import PrivateRoute from "../Context/PrivateRoute";

const mainRoute= createBrowserRouter([
{
    path: "/",
    element: <RootLayout></RootLayout>,
     children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
{
  path: "/policies",
  element: <AllPoliciesPage />,
},
{
  path: "/policies/:id",
  element: <PolicyDetails />, 
},
{
  path: "/quote",
  element: (
    <PrivateRoute>
      <QuotePage />
    </PrivateRoute>
  )
},

{
path: "/*",
Component: Error ,
  },
])
export default mainRoute;
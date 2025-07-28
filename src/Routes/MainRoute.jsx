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
import ApplicationFormPage from "../Pages/ApplicationFormPage/ApplicationFormPage";
import BlogArticles from "../Pages/BlogArticles/BlogArticles";
import PolicyBriefPage from "../Pages/PolicyBriefPage/PolicyBriefPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import UserDashboard from "../Pages/Dashboard/UserDashboard/UserDashboard";
import AdminDashboard from "../Pages/Dashboard/Admin/AdminDashboard";
import AgentDashboard from "../Pages/Dashboard/AgentDashboard/AgentDashboard";
import ManageApplications from "../Pages/Dashboard/Admin/ManageApplications";

const mainRoute = createBrowserRouter([
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
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "user",
        element: <UserDashboard />,
      },
      {
        path: "admin",
        element: <AdminDashboard />,
        children: [
          {
            path: "manage-applications",
            element: <ManageApplications />,
          },
        ],
      },
      {
        path: "agent",
        element: <AgentDashboard />,
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
    ),
  },
  {
    path: "/apply",
    element: (
      <PrivateRoute>
        <ApplicationFormPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/blog",
    element: <BlogArticles />,
  },
  {
    path: "/blog/:id",
    element: <PolicyBriefPage />,
  },

  {
    path: "/*",
    Component: Error,
  },
]);
export default mainRoute;

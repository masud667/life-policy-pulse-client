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
import AdminDashboard from "../Pages/Dashboard/Admin/AdminDashboard";
import AgentDashboard from "../Pages/Dashboard/Agent/AgentDashboard";
import ManageApplications from "../Pages/Dashboard/Admin/ManageApplications";
import DashboardHome from "../Pages/Dashboard/Admin/DashboardHome";
import ManageUserPage from "../Pages/Dashboard/Admin/ManageUserPage";
import ManagePolicies from "../Pages/Dashboard/Admin/ManagePolicies";
import ManageTransactions from "../Pages/Dashboard/Admin/ManageTransactions";
import ManageBlogs from "../Pages/Dashboard/Agent/ManageBlogs";
import AgentHome from "../Pages/Dashboard/Agent/AgentHome";
import PolicyClearance from "../Pages/Dashboard/Agent/PolicyClearance";
import MyPolicies from "../Pages/Dashboard/Customer/MyPolicies";
import PaymentStatus from "../Pages/Dashboard/Customer/PaymentStatus";
import UserDashboard from "../Pages/Dashboard/Customer/UserDashboard";
import ProfilePage from "../Components/ProfilePage";
import ClaimRequestPage from "../Pages/Dashboard/Customer/ClaimRequestPage ";

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
      {
        path: "/profile",
        Component: ProfilePage,
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
        children: [
           {
            index: true,
            element: <MyPolicies/>,
          },
            {
            path: "payment-status",
            element: <PaymentStatus />,
          },
            {
            path: "claim-request",
            element: <ClaimRequestPage />,
          },
        ]
      },
      {
        path: "admin",
        element: <AdminDashboard />,
        children: [
          {
            index: true,
            element: <DashboardHome/>,
          },
          {
            path: "manage-applications",
            element: <ManageApplications />,
          },
          {
            path: "manage-users",
            element: <ManageUserPage />,
          },
          {
            path: "manage-policies",
            element: <ManagePolicies />,
          },
          // {
          //   path: "manage-transactions",
          //   element: <ManageTransactions />,
          // }
  
        ],
      },
      {
        path: "agent",
        element: <AgentHome></AgentHome>,
       children: [
        {
          index: true,
          element :  <AgentDashboard />,
        },
        {
        path: "manage-blogs",
        element: <ManageBlogs />,
      },
        {
        path: "policy-claims",
        element: <PolicyClearance />,
      },

        ]
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
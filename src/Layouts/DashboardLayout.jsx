
import { Navigate, Outlet, useLocation } from "react-router";
import useRole from "../Hooks/useRole";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import Loading from "../Components/Loading";

const DashboardLayout = () => {
  const { role, loading } = useRole();

  if (loading) return <Loading />;
if (!role ) return <Navigate to="/login" />;

const location = useLocation();
 if (location.pathname === "/dashboard") {
    if (role === "admin") return <Navigate to="/dashboard/admin" />;
    if (role === "agent") return <Navigate to="/dashboard/agent" />;
    return <Navigate to="/dashboard/user" replace />;
  }
  return (
    <div><Header></Header>
    <div className="flex">
      <Sidebar role={role} />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div></div>
  );
};

export default DashboardLayout;

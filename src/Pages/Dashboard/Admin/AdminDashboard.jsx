import React from "react";
import { Outlet } from "react-router";

const AdminDashboard = () => {
  return (
    <main className="flex-1 lg:ml-60 min-h-screen pt-20 overflow-y-auto  bg-base-50 px-6">
      <Outlet />
    </main>
  );
};

export default AdminDashboard;

import React from "react";
import { Outlet } from "react-router";

const UserDashboard = () => {
  return (
    <div className="flex-1 lg:ml-60 min-h-screen pt-20 overflow-y-auto  bg-base-50 px-6">
      <Outlet></Outlet>
    </div>
  );
};

export default UserDashboard;

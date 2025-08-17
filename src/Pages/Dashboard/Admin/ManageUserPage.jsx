import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaUserShield,
  FaUserAltSlash,
  FaTrash,
  FaSearch,
  FaUser,
  FaUsers,
  FaUserPlus,
  FaEllipsisV,
} from "react-icons/fa";
import Loading from "../../../Components/Loading";
import AuthSecureAxios from "../../../Hooks/AuthSecureAxios";
import { HiRefresh } from "react-icons/hi";

const ManageUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await AuthSecureAxios.get("/users");
      setUsers(res.data);
    } catch (error) {
      Swal.fire("Error", "Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const promoteToAgent = async (id) => {
    try {
      await AuthSecureAxios.patch(`/users/promote/${id}`);
      fetchUsers();
      Swal.fire("Success", "User promoted to Agent", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to promote user", "error");
    }
  };

  const demoteToUser = async (id) => {
    try {
      await AuthSecureAxios.patch(`/users/demote/${id}`);
      fetchUsers();
      Swal.fire("Success", "Agent demoted to user", "info");
    } catch (error) {
      Swal.fire("Error", "Failed to demote agent", "error");
    }
  };

  const deleteUser = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#ef4444",
      background: "#f9fafb",
    });

    if (confirm.isConfirmed) {
      try {
        await AuthSecureAxios.delete(`/users/${id}`);
        fetchUsers();
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete user", "error");
      }
    }
  };

  // Filter users based on search and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  // User statistics
  const userStats = {
    total: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    agents: users.filter((u) => u.role === "agent").length,
    regular: users.filter((u) => u.role === "user").length,
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen ">
      <div className="w-11/12 mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="flex flex-col mb-6 md:mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-gray-800 flex items-center">
                <FaUsers className="mr-2 md:mr-3 text-indigo-600" />
                User Management
              </h1>
              <p className="text-gray-600 text-sm md:text-base mt-1">
                Manage user accounts and roles
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-6 md:mb-8">
          <div className="bg-white rounded-lg md:rounded-xl shadow p-3 md:p-6 border-l-4 border-indigo-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-xs md:text-sm font-medium">
                  Total Users
                </p>
                <p className="text-lg md:text-2xl font-bold mt-1">
                  {userStats.total}
                </p>
              </div>
              <div className="p-2 md:p-3 bg-indigo-100 rounded-lg text-indigo-600">
                <FaUsers className="text-base md:text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg md:rounded-xl shadow p-3 md:p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-xs md:text-sm font-medium">
                  Admins
                </p>
                <p className="text-lg md:text-2xl font-bold mt-1">
                  {userStats.admins}
                </p>
              </div>
              <div className="p-2 md:p-3 bg-green-100 rounded-lg text-green-600">
                <FaUserShield className="text-base md:text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg md:rounded-xl shadow p-3 md:p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-xs md:text-sm font-medium">
                  Agents
                </p>
                <p className="text-lg md:text-2xl font-bold mt-1">
                  {userStats.agents}
                </p>
              </div>
              <div className="p-2 md:p-3 bg-blue-100 rounded-lg text-blue-600">
                <FaUserShield className="text-base md:text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg md:rounded-xl shadow p-3 md:p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-xs md:text-sm font-medium">
                  Regular Users
                </p>
                <p className="text-lg md:text-2xl font-bold mt-1">
                  {userStats.regular}
                </p>
              </div>
              <div className="p-2 md:p-3 bg-purple-100 rounded-lg text-purple-600">
                <FaUser className="text-base md:text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg md:rounded-xl shadow p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-transparent text-sm md:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-2.5 md:top-3 text-gray-400" />
            </div>

            <div className="flex gap-2">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 md:px-4 md:py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-transparent text-sm md:text-base flex-grow">
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="agent">Agent</option>
                <option value="user">User</option>
              </select>

              <button
                onClick={fetchUsers}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium flex items-center text-sm md:text-base">
                <HiRefresh className="md:mr-2" />
                <span className="hidden md:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Table - Hidden on Mobile */}
        <div className="hidden lg:block bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registered
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <div className="text-gray-500 text-lg">
                        No users found
                      </div>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setRoleFilter("all");
                        }}
                        className="mt-4 text-indigo-600 hover:text-indigo-800 flex items-center justify-center mx-auto">
                        Clear filters
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user, idx) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {idx + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-indigo-100 text-indigo-800 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                            {user.name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {user.name || "N/A"}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {user._id.substring(0, 8)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === "admin"
                              ? "bg-red-100 text-red-800"
                              : user.role === "agent"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.registrationDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {user.role === "user" && (
                            <button
                              onClick={() => promoteToAgent(user._id)}
                              className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-md transition flex items-center"
                              title="Promote to Agent">
                              <FaUserShield className="mr-1" />
                              <span className="hidden sm:inline">Promote</span>
                            </button>
                          )}

                          {user.role === "agent" && (
                            <button
                              onClick={() => demoteToUser(user._id)}
                              className="text-yellow-600 hover:text-yellow-900 bg-yellow-50 hover:bg-yellow-100 p-2 rounded-md transition flex items-center"
                              title="Demote to User">
                              <FaUserAltSlash className="mr-1" />
                              <span className="hidden sm:inline">Demote</span>
                            </button>
                          )}

                          <button
                            onClick={() => deleteUser(user._id)}
                            className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-md transition flex items-center"
                            title="Delete User">
                            <FaTrash className="mr-1" />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile User Cards - Hidden on Desktop */}
        <div className="lg:hidden">
          {filteredUsers.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-gray-500 text-lg">No users found</div>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setRoleFilter("all");
                }}
                className="mt-4 text-indigo-600 hover:text-indigo-800">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user._id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 text-indigo-800 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                        {user.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.name || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <button className="text-gray-500 hover:text-gray-700 p-1">
                        <FaEllipsisV />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between items-center">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-800"
                          : user.role === "agent"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}>
                      {user.role}
                    </span>

                    <div className="text-xs text-gray-500">
                      {new Date(user.registrationDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    {user.role === "user" && (
                      <button
                        onClick={() => promoteToAgent(user._id)}
                        className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 rounded-md text-sm flex items-center justify-center"
                        title="Promote to Agent">
                        <FaUserShield className="mr-1" />
                        Promote
                      </button>
                    )}

                    {user.role === "agent" && (
                      <button
                        onClick={() => demoteToUser(user._id)}
                        className="flex-1 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 py-2 rounded-md text-sm flex items-center justify-center"
                        title="Demote to User">
                        <FaUserAltSlash className="mr-1" />
                        Demote
                      </button>
                    )}

                    <button
                      onClick={() => deleteUser(user._id)}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 py-2 rounded-md text-sm flex items-center justify-center"
                      title="Delete User">
                      <FaTrash className="mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination - Responsive */}
        <div className="mt-6 md:mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm">
            <button className="px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50">
              Prev
            </button>
            <button className="px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-gray-500 bg-white border-t border-b border-gray-300 hover:bg-gray-50">
              1
            </button>
            <button className="px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUserPage;

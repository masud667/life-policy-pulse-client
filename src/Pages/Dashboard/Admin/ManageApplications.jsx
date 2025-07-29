import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { HiOutlineEye, HiX, HiUserAdd, HiCheck, HiOutlineSearch, HiOutlineRefresh } from "react-icons/hi";
import AuthSecureAxios from "../../../Hooks/AuthSecureAxios";
import ApplicationDetailsModal from "./ApplicationDetailsModal";

const ManageApplications = () => {
  const queryClient = useQueryClient();

  const [selectedApp, setSelectedApp] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [assignedAgents] = useState([
    { id: 1, name: "Sarah Johnson", email: "sarah.johnson@lifepolicy.com" },
    { id: 2, name: "Michael Chen", email: "michael.chen@lifepolicy.com" },
    { id: 3, name: "Emma Rodriguez", email: "emma.rodriguez@lifepolicy.com" },
    { id: 4, name: "David Williams", email: "david.williams@lifepolicy.com" },
  ]);

  // Fetch applications
  const { data: applications = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await AuthSecureAxios.get("/applications");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, status, agentEmail }) => {
      return await AuthSecureAxios.patch(`/applications/${id}`, {
        status,
        agentEmail,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
    },
  });

  const handleReject = (id) => {
  mutation.mutate({ id, status: "Rejected" });
};

  const handleAssignAgent = (id, agentEmail) => {
    mutation.mutate({ id, status: "Assigned", agentEmail });
  };

  const handleApprove = (id) => {
    mutation.mutate({ id, status: "Approved" });
  };

  // Filter applications based on search and status
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.policy?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  

  if (isError) return (
    <div className="text-center py-10">
      <div className="text-red-500 text-5xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold text-gray-700">Failed to load applications</h3>
      <button 
        onClick={() => refetch()}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center justify-center mx-auto"
      >
        <HiOutlineRefresh className="mr-2" /> Retry
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold text-white mb-2 md:mb-0">Manage Applications</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search applications..."
                className="pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <HiOutlineSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Assigned">Assigned</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 border-b">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-gray-500 text-sm">Total</div>
          <div className="text-2xl font-bold">{applications.length}</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-gray-500 text-sm">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">
            {applications.filter(a => a.status === "Pending").length}
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-gray-500 text-sm">Assigned</div>
          <div className="text-2xl font-bold text-blue-600">
            {applications.filter(a => a.status === "Assigned").length}
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-gray-500 text-sm">Approved</div>
          <div className="text-2xl font-bold text-green-600">
            {applications.filter(a => a.status === "Approved").length}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredApplications.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center">
                  <div className="text-gray-500 text-lg">No applications found</div>
                  <button 
                    onClick={() => { setSearchTerm(""); setStatusFilter("all"); }}
                    className="mt-2 text-indigo-600 hover:text-indigo-800 flex items-center justify-center mx-auto"
                  >
                    <HiOutlineRefresh className="mr-1" /> Clear filters
                  </button>
                </td>
              </tr>
            ) : (
              filteredApplications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 text-indigo-800 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                        {app.fullName?.charAt(0) || "U"}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{app.fullName}</div>
                        <div className="text-sm text-gray-500">{app.userEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900 font-medium">{app.policyName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      app.status === "Approved" ? "bg-green-100 text-green-800" :
                      app.status === "Rejected" ? "bg-red-100 text-red-800" :
                      app.status === "Assigned" ? "bg-blue-100 text-blue-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.agentEmail ? (
                      <span className="text-gray-700">{app.agentEmail}</span>
                    ) : (
                      <select
                        onChange={(e) => handleAssignAgent(app._id, e.target.value)}
                        defaultValue=""
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="" disabled>Select Agent</option>
                        {assignedAgents.map(agent => (
                          <option key={agent.id} value={agent.email}>
                            {agent.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                   
                        <button
                          onClick={() => handleApprove(app._id)}
                          className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 p-2 rounded-md transition"
                          title="Approve"
                        >
                          <HiCheck className="h-5 w-5" />
                        </button>
                     
                      
                      <button
                        onClick={() => handleReject(app._id)}
                        className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-md transition"
                        title="Reject"
                      >
                        <HiX className="h-5 w-5" />
                      </button>
                      
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-md transition"
                        title="View Details"
                      >
                        <HiOutlineEye className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredApplications.length}</span> of{' '}
              <span className="font-medium">{filteredApplications.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Application Details Modal */}
      <ApplicationDetailsModal 
        application={selectedApp} 
        onClose={() => setSelectedApp(null)} 
      />
    </div>
  );
};

export default ManageApplications;
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { Dialog } from "@headlessui/react";
import {
  FiUser,
  FiFileText,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiChevronDown,
  FiMapPin,
  FiHeart,
  FiCreditCard,
  FiAlertCircle,
} from "react-icons/fi";
import Loading from "../../../Components/Loading";
import AuthSecureAxios from "../../../Hooks/AuthSecureAxios";

const AgentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      // Updated endpoint to fetch agent-specific applications
      const res = await AuthSecureAxios.get(`/applications/agent/${user._id}`);
      setApplications(res.data || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Failed to load applications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchApplications();
    }
  }, [user]);

  const handleStatusChange = async (id, newStatus, policyId) => {
    try {
      setLoading(true);
      await AuthSecureAxios.patch(`/applications/${id}/status`, {
        status: newStatus,
        policyId,
      });

      if (newStatus === "Approved") {
        await AuthSecureAxios.patch(`/policies/${policyId}/purchase`);
      }

      // Refresh applications after status change
      await fetchApplications();
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (app) => {
    setSelectedApp(app);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedApp(null);
    setIsOpen(false);
  };

  // Filter applications by status
  const filteredApplications = applications.filter(
    (app) => statusFilter === "All" || app.status === statusFilter
  );

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-800",
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-4 w-11/12 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold  text-base-content">
            Assigned Customers
          </h2>
          <p className=" text-base-content mt-1">
            Manage customer applications and policies
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none py-2 pl-3 pr-10 border border-gray-300 rounded-lg  bg-base-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2  text-base-content pointer-events-none" />
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-3">
          <FiAlertCircle className="text-xl flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">{error}</p>
            <button
              onClick={fetchApplications}
              className="mt-2 text-red-800 underline hover:text-red-900">
              Retry
            </button>
          </div>
        </div>
      )}

      {loading && <Loading />}

      {!loading && !error && filteredApplications.length === 0 && (
        <div className=" bg-base-100 rounded-xl shadow-sm p-8 text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center bg-base-300 rounded-full mb-4">
            <FiFileText className="text-indigo-600 text-2xl" />
          </div>
          <h3 className="text-lg font-medium  text-base-content mb-1">
            No applications found
          </h3>
          <p className=" text-base-content max-w-md mx-auto">
            {statusFilter === "All"
              ? "You don't have any customer applications assigned to you yet."
              : `No applications with "${statusFilter}" status found.`}
          </p>
        </div>
      )}

      {!loading && !error && filteredApplications.length > 0 && (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto  bg-base-100 rounded-xl shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className=" bg-base-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium  text-base-content uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  text-base-content uppercase tracking-wider">
                    Policy
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  text-base-content uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium  text-base-content uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className=" bg-base-100 divide-y divide-gray-200">
                {filteredApplications.map((app) => (
                  <tr key={app._id} className="hover: bg-base-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 bg-base-300 rounded-full flex items-center justify-center">
                          <FiUser className="text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium  text-base-content">
                            {app.fullName || app.customerName}
                          </div>
                          <div className="text-sm  text-base-content">
                            {app.userEmail || app.customerEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm  text-base-content">
                      {app.policyName || app.policyTitle}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          handleStatusChange(
                            app._id,
                            e.target.value,
                            app.policyId
                          )
                        }
                        className={`text-sm font-medium ${
                          statusStyles[app.status]
                        } rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500`}>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => openModal(app)}
                        className="text-indigo-600 hover:text-indigo-600 flex items-center justify-center gap-1">
                        <FiEye className="h-4 w-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden grid grid-cols-1 gap-4 mt-4">
            {filteredApplications.map((app) => (
              <div
                key={app._id}
                className=" bg-base-100 rounded-xl shadow-sm p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-base-300 rounded-full flex items-center justify-center">
                      <FiUser className="text-indigo-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium  text-base-content">
                        {app.fullName || app.customerName}
                      </h3>
                      <p className="text-xs  text-base-content">
                        {app.userEmail || app.customerEmail}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      statusStyles[app.status]
                    } rounded-full px-2.5 py-1`}>
                    {app.status}
                  </span>
                </div>

                <div className="mt-4 pl-1">
                  <div className="flex items-center text-sm  text-base-content mb-2">
                    <FiFileText className="mr-2  text-base-content" />
                    <span>{app.policyName || app.policyTitle}</span>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(
                          app._id,
                          e.target.value,
                          app.policyId
                        )
                      }
                      className={`text-xs font-medium rounded-full px-3 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                        statusStyles[app.status]
                      }`}>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>

                    <button
                      onClick={() => openModal(app)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1">
                      <FiEye className="h-4 w-4" />
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl  bg-base-100 shadow-xl overflow-hidden">
            <div className="bg-indigo-600 p-5">
              <Dialog.Title className="text-xl font-bold  text-base-content">
                Customer Profile
              </Dialog.Title>
            </div>

            {selectedApp && (
              <div className="p-5 max-h-[70vh] overflow-y-auto space-y-4">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-base-300 rounded-full flex items-center justify-center">
                    <FiUser className="text-indigo-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold  text-base-content">
                      {selectedApp.fullName || selectedApp.customerName}
                    </h3>
                    <p className=" text-base-content">
                      {selectedApp.userEmail || selectedApp.customerEmail}
                    </p>
                    <span
                      className={`mt-2 inline-block text-sm font-medium rounded-full px-2.5 py-1 ${
                        statusStyles[selectedApp.status]
                      }`}>
                      {selectedApp.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <InfoItem
                    icon={FiFileText}
                    label="Policy"
                    value={selectedApp.policyName || selectedApp.policyTitle}
                  />
                  <InfoItem
                    icon={FiCreditCard}
                    label="NID Number"
                    value={selectedApp.nidNumber || "Not provided"}
                  />
                  <InfoItem
                    icon={FiMapPin}
                    label="Address"
                    value={selectedApp.address || "Not provided"}
                  />
                  {selectedApp.healthConditions?.length > 0 && (
                    <InfoItem
                      icon={FiHeart}
                      label="Health Conditions"
                      value={selectedApp.healthConditions.join(", ")}
                    />
                  )}
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      handleStatusChange(
                        selectedApp._id,
                        "Approved",
                        selectedApp.policyId
                      );
                      closeModal();
                    }}
                    className="flex-1 bg-green-500 hover:bg-green-600  text-base-content py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                    <FiCheckCircle className="h-5 w-5" />
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange(
                        selectedApp._id,
                        "Rejected",
                        selectedApp.policyId
                      );
                      closeModal();
                    }}
                    className="flex-1 bg-red-500 hover:bg-red-600  text-base-content py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                    <FiXCircle className="h-5 w-5" />
                    Reject
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 border border-gray-300 hover: bg-base-50 py-2 px-4 rounded-lg transition">
                    Close
                  </button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start">
    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
      <Icon className=" text-base-content" />
    </div>
    <div className="ml-3">
      <p className="text-sm  text-base-content">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default AgentDashboard;

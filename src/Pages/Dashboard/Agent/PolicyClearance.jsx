import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  FaEye,
  FaCheck,
  FaTimes,
  FaEdit,
  FaTrash,
  FaSync,
} from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading";
import AuthSecureAxios from "../../../Hooks/AuthSecureAxios";

const PolicyClearance = () => {
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  // Color palette
  const colors = {
    primary: "#4361ee",
    secondary: "#3f37c9",
    success: "#4cc9f0",
    warning: "#f72585",
    light: "#f8f9fa",
    dark: "#212529",
  };

  // Fetch all pending claims for the agent
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setLoading(true);
        const res = await AuthSecureAxios.get("/policies");
        setClaims(res.data.result);
        setError("");
      } catch (err) {
        setError("Failed to load claims");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  // Approve a claim
  const handleApprove = async (id) => {
    try {
      const res = await AuthSecureAxios.patch(`/policies/${id}`, {
        status: "Approved",
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Claim Approved!",
          icon: "success",
          confirmButtonColor: colors.primary,
        });
        setClaims((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: "Approved" } : c))
        );
        setSelectedClaim(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong",
        icon: "error",
        confirmButtonColor: colors.warning,
      });
    }
  };

  // Open claim details
  const openClaimDetails = (claim) => {
    setSelectedClaim(claim);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedClaim(null);
    setIsModalOpen(false);
  };

  // Refresh data
  const refreshData = async () => {
    try {
      setLoading(true);
      const res = await AuthSecureAxios.get("/policies");
      setClaims(res.data.result);
      setError("");
    } catch (err) {
      setError("Failed to refresh data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#e6f7ff] p-4 md:p-6">
      <div className="w-11/12 mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Policy Clearance
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and approve insurance claims
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button
              onClick={refreshData}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all">
              <FaSync className="text-blue-500" />
              <span className="text-gray-700 font-medium">Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Claims</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {claims.length}
              </h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending Approval</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {claims.filter((c) => c.status === "Pending").length}
              </h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Approved</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {claims.filter((c) => c.status === "Approved").length}
              </h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Average Amount</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                $
                {claims.reduce((acc, claim) => acc + claim.premium, 0) /
                  claims.length || 0}
              </h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                <span className="text-white font-bold">$</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 flex items-center gap-2">
              <FaTimes className="text-red-500" />
              <span>{error}</span>
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loading />
          </div>
        ) : claims.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <FaEye className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No Claims Found
              </h3>
              <p className="text-gray-600 mb-6">
                There are currently no claims pending clearance.
              </p>
              <button
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
                onClick={refreshData}>
                Refresh Data
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop/Tablet View */}
            <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Policy
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Premium
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {claims.map((claim) => (
                      <tr
                        key={claim._id}
                        className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-blue-600 font-bold">P</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {claim.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {claim._id.slice(-8)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-semibold">
                            ${claim.premium}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {claim.category}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {claim.durationOptions}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              claim.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                            {claim.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => openClaimDetails(claim)}
                              className="text-blue-600 hover:text-blue-900 flex items-center gap-1">
                              <FaEye />
                              <span>View</span>
                            </button>
                            <button
                              onClick={() => handleApprove(claim._id)}
                              className={`${
                                claim.status === "Approved"
                                  ? "text-green-600 hover:text-green-900"
                                  : "text-yellow-600 hover:text-yellow-900"
                              } flex items-center gap-1`}
                              disabled={claim.status === "Approved"}>
                              <FaCheck />
                              <span>
                                {claim.status === "Approved"
                                  ? "Approved"
                                  : "Approve"}
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden grid grid-cols-1 gap-4">
              {claims.map((claim) => (
                <div
                  key={claim._id}
                  className="bg-white rounded-xl shadow overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-900">{claim.title}</h3>
                      <p className="text-sm text-gray-500">
                        ID: {claim._id.slice(-8)}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                        claim.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                      {claim.status}
                    </span>
                  </div>

                  <div className="p-4 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Premium</p>
                      <p className="font-medium">${claim.premium}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="font-medium">{claim.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-medium">{claim.durationOptions}</p>
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-gray-50 flex justify-between">
                    <button
                      onClick={() => openClaimDetails(claim)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm">
                      <FaEye />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={() => handleApprove(claim._id)}
                      className={`${
                        claim.status === "Approved"
                          ? "text-green-600 hover:text-green-800"
                          : "text-yellow-600 hover:text-yellow-800"
                      } flex items-center gap-1 text-sm`}
                      disabled={claim.status === "Approved"}>
                      <FaCheck />
                      <span>Approve</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modal for Claim Details */}
        {isModalOpen && selectedClaim && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedClaim.title}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700">
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Policy ID</p>
                    <p className="font-medium">{selectedClaim._id.slice(-8)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span
                      className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                        selectedClaim.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                      {selectedClaim.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Premium</p>
                    <p className="font-medium">${selectedClaim.premium}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{selectedClaim.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">
                      {selectedClaim.durationOptions}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created At</p>
                    <p className="font-medium">
                      {selectedClaim.createdAt
                        ? new Date(selectedClaim.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm text-gray-500 mb-2">Description</p>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-line">
                    {selectedClaim.description || "No description available"}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-100 flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg bg-white border text-gray-700 hover:bg-gray-200">
                  Close
                </button>
                <button
                  onClick={() => handleApprove(selectedClaim._id)}
                  disabled={selectedClaim.status === "Approved"}
                  className={`px-4 py-2 rounded-lg text-white font-medium ${
                    selectedClaim.status === "Approved"
                      ? "bg-green-500 cursor-not-allowed opacity-60"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}>
                  {selectedClaim.status === "Approved"
                    ? "Already Approved"
                    : "Approve Claim"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicyClearance;

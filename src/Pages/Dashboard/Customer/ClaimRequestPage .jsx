import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext";
import AuthSecureAxios from "../../../Hooks/AuthSecureAxios";
import Loading from "../../../Components/Loading";

const ClaimRequestPage = () => {
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [reason, setReason] = useState("");
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Get approved policies
        const policiesRes = await AuthSecureAxios.get(`/policies`);
        setPolicies(policiesRes.data.result);

        const claimsRes = await AuthSecureAxios.get(
          `/claims/user/${user?.email}`
        );
        setClaims(claimsRes.data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load data", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPolicy || !reason || !file) {
      return Swal.fire("Error", "All fields are required", "error");
    }

    const formData = new FormData();
    formData.append("policyId", selectedPolicy._id);
    formData.append("email", user?.email);
    formData.append("reason", reason);
    formData.append("document", file);
    formData.append("status", "Pending");

    try {
      setIsLoading(true);
      await AuthSecureAxios.post("/claims", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Refresh claims data
      const claimsRes = await AuthSecureAxios.get(
        `/claims/user/${user?.email}`
      );
      setClaims(claimsRes.data);

      Swal.fire("Submitted", "Your claim has been submitted!", "success");
      setSelectedPolicy(null);
      setReason("");
      setFile(null);
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const getClaimForPolicy = (policyId) => {
    return claims.find((c) => c.policyId === policyId);
  };

  const handleViewClaim = (claim) => {
    setSelectedClaim(claim);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Claim Request Page
      </h2>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {policies?.map((policy) => {
              const claim = getClaimForPolicy(policy._id);
              return (
                <div key={policy._id} className="border rounded-lg p-4 shadow">
                  <h3 className="font-semibold text-lg">{policy.title}</h3>
                  <p className="text-sm  text-base-content">
                    Category: {policy.category}
                  </p>

                  {claim ? (
                    <div className="mt-3 flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          claim.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : claim.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                        {claim.status}
                      </span>

                      <button
                        onClick={() => handleViewClaim(claim)}
                        className="text-blue-600 hover:text-blue-800 text-sm">
                        {claim.status === "Approved"
                          ? "View Confirmation"
                          : "View Details"}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedPolicy(policy)}
                      className="mt-4 px-4 py-2 bg-blue-600  text-base-content rounded hover:bg-blue-700 text-sm w-full">
                      Claim Now
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Claim Form Modal */}
          {selectedPolicy && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
              <div className=" bg-base-100 rounded-xl p-6 w-full max-w-md">
                <h3 className="text-lg font-bold mb-4">
                  Submit Claim for: {selectedPolicy.title}
                </h3>
                <form onSubmit={handleClaimSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Reason
                    </label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                      className="w-full p-2 border rounded"
                      rows="3"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Upload Document (PDF, JPG, PNG)
                    </label>
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      onChange={(e) => setFile(e.target.files[0])}
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPolicy(null)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600  text-base-content rounded hover:bg-green-700"
                      disabled={isLoading}>
                      {isLoading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Claim Details Modal */}
          {selectedClaim && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
              <div className=" bg-base-100 rounded-xl p-6 w-full max-w-md">
                <h3 className="text-lg font-bold mb-4">Claim Details</h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm  text-base-content">Policy:</p>
                    <p className="font-medium">
                      {policies.find((p) => p._id === selectedClaim.policyId)
                        ?.title || "Unknown Policy"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm  text-base-content">Status:</p>
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        selectedClaim.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : selectedClaim.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                      {selectedClaim.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm  text-base-content">Reason:</p>
                    <p className="font-medium">{selectedClaim.reason}</p>
                  </div>

                  <div>
                    <p className="text-sm  text-base-content">Document:</p>
                    <a
                      href={selectedClaim.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline">
                      View Uploaded Document
                    </a>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedClaim(null)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClaimRequestPage;

import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const MyPolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [reviewModalPolicy, setReviewModalPolicy] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/my-policies").then((res) => {
      setPolicies(res.data);
    });
  }, []);

  const handleSubmitReview = async () => {
    if (!rating || !feedback) {
      return Swal.fire("Error", "Rating and feedback required!", "warning");
    }

    try {
      const review = {
        policyId: reviewModalPolicy._id,
        policyName: reviewModalPolicy.policyName,
        rating,
        feedback,
        date: new Date(),
      };

      await axios.post("http://localhost:5000/testimonials", review);
      Swal.fire("Success", "Review submitted!", "success");

      setReviewModalPolicy(null);
      setRating(0);
      setFeedback("");
    } catch (err) {
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  return (
    <div className="p-6">
      <motion.h2
        className="text-3xl font-bold mb-6 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        My Policies
      </motion.h2>

      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="table w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>#</th>
              <th>Policy</th>
              <th>Status</th>
              <th>Premium</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy, i) => (
              <tr key={policy._id}>
                <td>{i + 1}</td>
                <td>{policy.policyName}</td>
                <td>
                  <span
                    className={`badge ${
                      policy.status === "Approved"
                        ? "badge-success"
                        : policy.status === "Rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {policy.status}
                  </span>
                </td>
                <td>${policy.premium}/mo</td>
                <td className="flex gap-2">
                  {/* View Details */}
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => {
                      setSelectedPolicy(policy);
                      document.getElementById("view_modal").showModal();
                    }}
                  >
                    <FaEye className="text-info" />
                  </button>

                  {/* Give Review */}
                  {policy.status === "Approved" && (
                    <button
                      className="btn btn-xs btn-outline btn-warning"
                      onClick={() => {
                        setReviewModalPolicy(policy);
                        document.getElementById("review_modal").showModal();
                      }}
                    >
                      ⭐ Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      <dialog id="view_modal" className="modal">
        <div className="modal-box">
          {selectedPolicy && (
            <>
              <h3 className="font-bold text-xl mb-2">{selectedPolicy.policyName}</h3>
              <p><strong>Coverage:</strong> {selectedPolicy.coverageAmount}</p>
              <p><strong>Duration:</strong> {selectedPolicy.duration} Years</p>
              <p><strong>Premium:</strong> ${selectedPolicy.premium}/month</p>
            </>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Review Modal */}
      <dialog id="review_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">
            Review: {reviewModalPolicy?.policyName}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <FaStar
                key={num}
                onClick={() => setRating(num)}
                className={`cursor-pointer text-xl ${
                  rating >= num ? "text-yellow-400" : "text-gray-400"
                }`}
              />
            ))}
          </div>

          <textarea
            className="textarea textarea-bordered w-full mb-3"
            placeholder="Write your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>

          <div className="flex justify-between">
            <form method="dialog">
              <button className="btn btn-sm">Cancel</button>
            </form>
            <button
              className="btn btn-sm btn-success"
              onClick={handleSubmitReview}
            >
              Submit Review
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyPolicies;

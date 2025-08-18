// src/components/ReviewModal.js
import React, { useState } from "react";

const ReviewModal = ({ policy, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = () => {
    if (rating > 0 && feedback.trim() !== "") {
      onSubmit(rating, feedback);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className=" bg-base-100 rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold  text-base-content">
              Leave a Review
            </h2>
            <button
              onClick={onClose}
              className=" text-base-content hover: text-base-content">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-2  text-base-content">
            For: <span className="font-semibold">{policy.title}</span>
          </div>

          <div className="mt-6">
            <label className="block  text-base-content font-medium mb-2">
              How would you rate this policy?
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-3xl focus:outline-none">
                  <span
                    className={`${
                      star <= (hoverRating || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}>
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="block  text-base-content font-medium mb-2">
              Your Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your experience with this policy..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300  text-base-content rounded-lg hover: bg-base-50">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={rating === 0 || feedback.trim() === ""}
              className={`px-6 py-2 rounded-lg ${
                rating === 0 || feedback.trim() === ""
                  ? "bg-gray-300  text-base-content cursor-not-allowed"
                  : "bg-blue-600  text-base-content hover:bg-blue-700"
              }`}>
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;

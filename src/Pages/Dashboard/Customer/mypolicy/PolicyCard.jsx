import React from "react";

const PolicyCard = ({ policy, statusColor, onViewDetails, onReviewClick }) => {
  return (
    <div className=" bg-base-100 rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusColor}`}>
              {policy.status}
            </span>
            <h3 className="text-lg font-bold  text-base-content mt-2">
              {policy.title}
            </h3>
            <p className="text-sm  text-base-content mt-1">
              Category: {policy.category}
            </p>
          </div>
          <div className="bg-blue-50 p-2 rounded-lg">
            <div className="text-blue-800 font-bold">{policy.premium}</div>
            <div className="text-xs text-blue-600">Premium</div>
          </div>
        </div>

        <div className="mt-4 text-sm  text-base-content">
          <div className="flex items-center mb-1">
            <svg
              className="w-4 h-4 mr-2  text-base-content"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>Duration: {policy.durationOptions}</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2  text-base-content"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Coverage: {policy.coverageRange}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={onViewDetails}
            className="flex-1  bg-base-100 border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors">
            View Details
          </button>
          <button
            onClick={onReviewClick}
            disabled={policy.status !== "Approved" || policy.hasReview}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              policy.status !== "Approved" || policy.hasReview
                ? "bg-gray-100  text-base-content cursor-not-allowed"
                : "bg-blue-600  text-base-content hover:bg-blue-700"
            }`}>
            {policy.hasReview ? "Reviewed" : "Give Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyCard;

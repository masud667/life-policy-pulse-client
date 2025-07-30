import React, { useEffect, useState } from "react";
import TestimonialSection from "./mypolicy/TestimonialSection";
import ReviewModal from "./mypolicy/ReviewModal";
import PolicyDetailsModal from "./mypolicy/PolicyDetailsModal";
import PolicyCard from "./mypolicy/PolicyCard";
import axios from "axios";
import AuthSecureAxios from "../../../Hooks/AuthSecureAxios";

const MyPolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    AuthSecureAxios
      .get("/policies")
      .then((res) => {
        setPolicies(res.data.result);
      });
  }, []);
  const handleViewDetails = (policy) => {
    setSelectedPolicy(policy);
    setShowDetailsModal(true);
  };

  const handleReviewClick = (policy) => {
    setSelectedPolicy(policy);
    setShowReviewModal(true);
  };

  const handleSubmitReview = async (rating, feedback) => {
    if (selectedPolicy) {
      // Create new testimonial
      const newTestimonial = {
        policyId: selectedPolicy._id,
        policyName: selectedPolicy.title,
        rating,
        review: feedback,
        author: "You",
        date: new Date().toISOString().split("T")[0],
      };

      try {
        // POST to backend
        const res = await AuthSecureAxios.post(
          "/testimonials",
          newTestimonial
        );

        if (res.data.insertedId || res.data.acknowledged) {
          // Update policy as reviewed in frontend state
          const updatedPolicies = policies.map((policy) =>
            policy._id === selectedPolicy._id
              ? { ...policy, hasReview: true }
              : policy
          );
          setPolicies(updatedPolicies);

          // Update local UI
          setTestimonials([newTestimonial, ...testimonials]);
          setShowReviewModal(false);
        } else {
          throw new Error("Review not saved");
        }
      } catch (error) {
        console.error(error);
        alert("Failed to submit review. Please try again.");
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          My Insurance Policies
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Manage your insurance policies, view details, and submit reviews for
          your purchased policies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {policies.map((policy) => (
          <PolicyCard
            key={policy._id}
            policy={policy}
            statusColor={getStatusColor(policy.status)}
            onViewDetails={() => handleViewDetails(policy)}
            onReviewClick={() => handleReviewClick(policy)}
          />
        ))}
      </div>

      <TestimonialSection testimonials={testimonials} />

      {showDetailsModal && selectedPolicy && (
        <PolicyDetailsModal
          policy={selectedPolicy}
          onClose={() => setShowDetailsModal(false)}
        />
      )}

      {showReviewModal && selectedPolicy && (
        <ReviewModal
          policy={selectedPolicy}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
};

export default MyPolicies;

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext";
import Loading from "../../../Components/Loading";
import AuthSecureAxios from "../../../Hooks/AuthSecureAxios";

const PaymentStatus = () => {
  const { user } = useContext(AuthContext);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePolicy, setActivePolicy] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;
    AuthSecureAxios.get(`/approved-applications?email=${user.email}`)
      .then((res) => {
        setPolicies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return <Loading></Loading>;
  }

  if (loading) {
    return <Loading></Loading>;
  }
  const handlePay = (policyId) => {
    navigate(`/payment/${policyId}`);
  };

  const togglePolicyDetails = (policyId) => {
    setActivePolicy(activePolicy === policyId ? null : policyId);
  };

  // Stats for the summary cards
  const stats = {
    total: policies.length,
    paid: policies.filter((p) => p.paymentStatus === "Paid").length,
    due: policies.filter((p) => p.paymentStatus === "Due").length,
    totalAmount: policies.reduce((sum, policy) => sum + policy.premium, 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="w-11/12 mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Payment Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your insurance policy payments
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="btn btn-primary rounded-xl">
              <FaMoneyBillWave className="mr-2" /> Make Bulk Payment
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm font-medium">
              Total Policies
            </h3>
            <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-medium">Paid Policies</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.paid}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-red-500">
            <h3 className="text-gray-500 text-sm font-medium">Due Policies</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.due}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-purple-500">
            <h3 className="text-gray-500 text-sm font-medium">Total Premium</h3>
            <p className="text-3xl font-bold text-gray-800">
              ${stats.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Policy Cards */}
        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : policies.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <FaInfoCircle className="text-blue-500 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No policies found
              </h3>
              <p className="text-gray-600">
                You don't have any approved policies requiring payment at this
                time.
              </p>
            </div>
          ) : (
            policies.map((policy, index) => (
              <div
                key={policy._id}
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
                  activePolicy === policy._id ? "ring-2 ring-blue-500" : ""
                }`}>
                <div
                  className={`flex flex-col md:flex-row items-start md:items-center p-5 cursor-pointer ${
                    policy.paymentStatus === "Paid"
                      ? "bg-green-50"
                      : "bg-red-50"
                  }`}
                  onClick={() => togglePolicyDetails(policy._id)}>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-lg p-2 mr-4">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {policy.policyName}
                        </h3>
                        <p className="text-gray-600">
                          Policy ID: {policy._id.substring(0, 8)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <FaMoneyBillWave className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Premium</p>
                        <p className="font-semibold text-gray-800">
                          ${policy.premium}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-purple-100 p-2 rounded-lg mr-3">
                        <FaCalendarAlt className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Frequency</p>
                        <p className="font-semibold text-gray-800">
                          {policy.frequency}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div
                        className={
                          policy.paymentStatus === "Paid"
                            ? "bg-green-100 p-2 rounded-lg mr-3"
                            : "bg-red-100 p-2 rounded-lg mr-3"
                        }>
                        {policy.paymentStatus === "Paid" ? (
                          <FaCheckCircle className="text-green-600" />
                        ) : (
                          <FaTimesCircle className="text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p
                          className={
                            policy.paymentStatus === "Paid"
                              ? "font-semibold text-green-600"
                              : "font-semibold text-red-600"
                          }>
                          {policy.paymentStatus}
                        </p>
                      </div>
                    </div>

                    <div className="md:ml-4 w-full md:w-auto">
                      {policy.paymentStatus === "Due" ? (
                        <button
                          className="btn btn-primary w-full md:w-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePay(policy._id);
                          }}>
                          Pay Now
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline w-full md:w-auto"
                          disabled>
                          Payment Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expandable Details */}
                {activePolicy === policy._id && (
                  <div className="bg-gray-50 p-5 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-3">
                          Policy Details
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex justify-between text-sm">
                            <span className="text-gray-500">Start Date:</span>
                            <span className="text-gray-800">Jan 15, 2023</span>
                          </li>
                          <li className="flex justify-between text-sm">
                            <span className="text-gray-500">End Date:</span>
                            <span className="text-gray-800">Jan 15, 2024</span>
                          </li>
                          <li className="flex justify-between text-sm">
                            <span className="text-gray-500">Coverage:</span>
                            <span className="text-gray-800">$500,000</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-700 mb-3">
                          Payment History
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <div>
                              <div className="font-medium">Payment #1</div>
                              <div className="text-gray-500 text-xs">
                                Jan 15, 2023
                              </div>
                            </div>
                            <div className="flex items-center">
                              <FaCheckCircle className="text-green-500 mr-1" />
                              <span className="text-green-600">Paid</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <div>
                              <div className="font-medium">Payment #2</div>
                              <div className="text-gray-500 text-xs">
                                Due: Feb 15, 2023
                              </div>
                            </div>
                            {policy.paymentStatus === "Due" ? (
                              <div className="flex items-center">
                                <FaTimesCircle className="text-red-500 mr-1" />
                                <span className="text-red-600">Pending</span>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <FaCheckCircle className="text-green-500 mr-1" />
                                <span className="text-green-600">Paid</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-700 mb-3">
                          Actions
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <button className="btn btn-outline btn-sm">
                            View Policy Documents
                          </button>
                          <button className="btn btn-outline btn-sm">
                            Download Invoice
                          </button>
                          <button className="btn btn-outline btn-sm">
                            Contact Support
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Payment Tips */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-8">
          <div className="flex items-start">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FaInfoCircle className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Payment Information
              </h3>
              <p className="text-gray-600">
                Payments are processed securely. Please ensure payments are made
                by the due date to avoid policy cancellation. For any
                payment-related questions, contact our support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;

import { useParams, useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCheckCircle,
  FaChartLine,
  FaHeartbeat,
  FaShieldAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  FiArrowRight,
  FiArrowLeft,
  FiDollarSign,
  FiClock,
} from "react-icons/fi";
import { motion } from "framer-motion";
import Loading from "../../Components/Loading";
import AuthSecureAxios from "../../Hooks/AuthSecureAxios";

const PolicyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        setIsLoading(true);
        const res = await AuthSecureAxios.get(`/policies/${id}`);
        setPolicy(res.data);
      } catch (error) {
        console.error("Error fetching policy:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolicy();
  }, [id]);

  const handleGetQuote = () => {
    navigate(`/quote`);
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (!policy) {
    return (
      <div className="flex flex-col items-center justify-center  bg-base-100 p-6">
        <div className=" bg-base-100 rounded-2xl shadow-lg p-8 max-w-md text-center">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShieldAlt className="text-3xl text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold  text-base-content mb-4">
            Policy Not Found
          </h2>
          <p className=" text-base-content mb-6">
            The policy you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/policies"
            className="bg-gradient-to-r from-blue-600 to-purple-600  text-base-content py-3 px-6 rounded-lg font-medium inline-flex items-center hover:opacity-90 transition-opacity">
            <FiArrowLeft className="mr-2" />
            Browse Policies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="  bg-base-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700  text-base-content py-16 px-6">
        <div className="w-11/12 mx-auto">
          <Link
            to="/policies"
            className="inline-flex items-center text-blue-200 hover: text-base-content mb-6">
            <FiArrowLeft className="mr-2" />
            Back to Policies
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="flex-1">
              <div className=" bg-base-100/20 px-4 py-1 rounded-full inline-flex items-center mb-4">
                <span className="text-sm font-medium">{policy.category}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {policy.title}
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl">
                {policy.shortDetails}
              </p>
            </div>

            <div className=" bg-base-100/10 rounded-xl p-4 flex items-center">
              <div className="text-center">
                <div className="text-blue-200 text-sm">Starting from</div>
                <div className="text-2xl font-bold">{policy.premium}</div>
                <div className="text-blue-200 text-sm">per month</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-11/12 mx-auto py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Policy Details */}
          <div className="w-11/12 mx-auto">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8">
              <button
                className={`py-3 px-2 font-medium text-lg ${
                  activeTab === "overview"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : " text-base-content hover: text-base-content"
                }`}
                onClick={() => setActiveTab("overview")}>
                Overview
              </button>
              <button
                className={`py-3 px-2 font-medium text-lg ${
                  activeTab === "benefits"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : " text-base-content hover: text-base-content"
                }`}
                onClick={() => setActiveTab("benefits")}>
                Benefits
              </button>
              <button
                className={`py-3 px-2 font-medium text-lg ${
                  activeTab === "eligibility"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : " text-base-content hover: text-base-content"
                }`}
                onClick={() => setActiveTab("eligibility")}>
                Eligibility
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className=" bg-base-100 rounded-2xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold  text-base-content mb-4">
                  Policy Overview
                </h2>
                <div className="prose prose-blue max-w-none">
                  <p className=" text-base-content mb-6">
                    {policy.description ||
                      "This comprehensive life insurance policy provides financial security for you and your loved ones. With flexible terms and competitive premiums, it's designed to fit your unique needs and budget."}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 p-5 rounded-xl">
                      <div className="flex items-center mb-3">
                        <FiClock className="text-blue-600 mr-2 text-xl" />
                        <h3 className="font-bold text-lg">Term Length</h3>
                      </div>
                      <p className=" text-base-content">
                        {policy.term || "15, 20, or 30 years"}
                      </p>
                    </div>

                    <div className="bg-purple-50 p-5 rounded-xl">
                      <div className="flex items-center mb-3">
                        <FiDollarSign className="text-purple-600 mr-2 text-xl" />
                        <h3 className="font-bold text-lg">Coverage Options</h3>
                      </div>
                      <p className=" text-base-content">
                        $100,000 to $5,000,000
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-4  text-base-content">
                    Premium Calculation
                  </h3>
                  <p className=" text-base-content mb-6">
                    {policy.premiumLogic ||
                      "Your premium is calculated based on several factors including your age, health status, coverage amount, and term length. We offer competitive rates that ensure you get the best value for your protection needs."}
                  </p>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                    <h3 className="font-bold text-lg text-blue-800 mb-3">
                      How Premiums Are Calculated
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        {
                          name: "Age",
                          icon: <FaCalendarAlt className="text-blue-600" />,
                        },
                        {
                          name: "Coverage Amount",
                          icon: <FiDollarSign className="text-purple-600" />,
                        },
                        {
                          name: "Health Status",
                          icon: <FaHeartbeat className="text-green-600" />,
                        },
                        {
                          name: "Term Length",
                          icon: <FiClock className="text-indigo-600" />,
                        },
                      ].map((factor, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-8 h-8 flex items-center justify-center mr-3">
                            {factor.icon}
                          </div>
                          <span className=" text-base-content">
                            {factor.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "benefits" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className=" bg-base-100 rounded-2xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold  text-base-content mb-4">
                  Policy Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {policy.benefits?.map((benefit, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                        <FaCheckCircle className="text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-bold  text-base-content mb-1">
                          {benefit.split(":")[0] || benefit}
                        </h3>
                        <p className=" text-base-content">
                          {benefit.includes(":")
                            ? benefit.split(":")[1]
                            : "This benefit provides valuable protection for you and your family."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-blue-800 mb-3">
                    Additional Advantages
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className=" bg-base-300 p-1 rounded-full mr-3 mt-1">
                        <FaShieldAlt className="text-blue-600 text-sm" />
                      </div>
                      <span className=" text-base-content">
                        Flexible payment options including monthly, quarterly,
                        or annually
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className=" bg-base-200 p-1 rounded-full mr-3 mt-1">
                        <FaChartLine className="text-purple-600 text-sm" />
                      </div>
                      <span className=" text-base-content">
                        Option to increase coverage without additional medical
                        exams
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                        <FaHeartbeat className="text-green-600 text-sm" />
                      </div>
                      <span className=" text-base-content">
                        Access to wellness programs and health resources
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === "eligibility" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className=" bg-base-100 rounded-2xl shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold  text-base-content mb-4">
                  Eligibility Requirements
                </h2>
                <div className="space-y-6">
                  {policy.eligibility?.map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className=" bg-base-300 p-2 rounded-lg mr-4">
                        <FaCheckCircle className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold  text-base-content mb-1">
                          {item.split(":")[0] || item}
                        </h3>
                        <p className=" text-base-content">
                          {item.includes(":")
                            ? item.split(":")[1]
                            : "This requirement ensures the policy is appropriate for your needs."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-blue-800 mb-3">
                    Common Eligibility Questions
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium  text-base-content mb-2">
                        Can I apply if I have pre-existing conditions?
                      </h4>
                      <p className=" text-base-content">
                        Yes, many pre-existing conditions are covered. Premiums
                        may vary based on your specific health situation.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium  text-base-content mb-2">
                        Is there an age limit for this policy?
                      </h4>
                      <p className=" text-base-content">
                        Applicants must be between 18 and 65 years old to apply
                        for this policy.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium  text-base-content mb-2">
                        What if I'm a smoker?
                      </h4>
                      <p className=" text-base-content">
                        Smokers are eligible but will pay slightly higher
                        premiums. We offer special programs to help you quit.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-center">
              <h3 className="text-2xl font-bold  text-base-content mb-4">
                Ready to Get Covered?
              </h3>
              <p className="text-blue-100 max-w-2xl mx-auto mb-6">
                Get your personalized quote in minutes and start protecting what
                matters most.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGetQuote}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500  text-base-content hover:from-yellow-500 hover:to-yellow-600 font-bold px-8 py-4 rounded-lg shadow-lg inline-flex items-center">
                Get Your Quote Now
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    ease: "easeInOut",
                  }}
                  className="ml-2 inline-block">
                  <FiArrowRight className="text-xl" />
                </motion.span>
              </motion.button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-6">
              {/* Policy Summary */}
              <div className=" bg-base-100 rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex justify-center mb-6">
                  <img className="rounded-xl" src={policy.image} alt="" />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className=" text-base-content">Policy Category</span>
                    <span className="font-medium">{policy.category}</span>
                  </div>

                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className=" text-base-content">Starting Premium</span>
                    <span className="font-medium">{policy.premium}</span>
                  </div>

                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className=" text-base-content">Term Options</span>
                    <span className="font-medium">
                      {policy.term || "15, 20, 30 years"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className=" text-base-content">Popularity</span>
                    <div className="flex items-center">
                      <div className="w-24  bg-base-200 rounded-full h-2.5 mr-2">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: "85%" }}></div>
                      </div>
                      <span className="font-medium">85%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className=" bg-base-100 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-bold text-lg  text-base-content mb-4">
                  Why Choose This Policy?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className=" bg-base-300 p-1 rounded-full mr-3 mt-1">
                      <FaShieldAlt className="text-blue-600 text-sm" />
                    </div>
                    <span className=" text-base-content">
                      Comprehensive coverage at competitive rates
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className=" bg-base-200 p-1 rounded-full mr-3 mt-1">
                      <FaChartLine className="text-purple-600 text-sm" />
                    </div>
                    <span className=" text-base-content">
                      Flexible payment options to fit your budget
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                      <FaHeartbeat className="text-green-600 text-sm" />
                    </div>
                    <span className=" text-base-content">
                      Quick approval process with minimal paperwork
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-base-300 p-1 rounded-full mr-3 mt-1">
                      <FaCalendarAlt className="text-indigo-600 text-sm" />
                    </div>
                    <span className=" text-base-content">
                      Option to convert to permanent coverage later
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;

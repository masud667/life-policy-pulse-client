import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import Header from "../../Components/Header";

const QuotePage = () => {
  const [quoteData, setQuoteData] = useState({
    age: "",
    gender: "",
    coverage: "",
    duration: "",
    smoker: "no",
  });
  const [estimatedPremium, setEstimatedPremium] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuoteData((prev) => ({ ...prev, [name]: value }));
  };

  const calculatePremium = () => {
    const age = parseInt(quoteData.age);
    const coverage = parseInt(quoteData.coverage);
    const duration = parseInt(quoteData.duration);
    let baseRate = 0.0006;

    if (quoteData.smoker === "yes") baseRate += 0.0003;
    if (quoteData.gender === "male") baseRate += 0.0001;
    if (age > 50) baseRate += 0.0002;
    if (age < 25) baseRate += 0.0001;

    const monthly = Math.round(coverage * baseRate);
    const yearly = monthly * 12;

    return { monthly, yearly };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    
    // Simulate calculation delay for animation
    setTimeout(() => {
      const result = calculatePremium();
      setEstimatedPremium(result);
      setIsCalculating(false);
    }, 1200);
  };

  const handleApply = () => {
    navigate("/apply"); 
  };

  return (
 <div>
    <Header></Header>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Personalized Life Insurance Quote
          </motion.h1>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Get an instant estimate of your life insurance premium. Our algorithm considers your unique profile to provide the most accurate quote.
          </motion.p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <motion.div 
            className="lg:w-1/2 bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <h2 className="text-xl font-bold text-white">Personal Information</h2>
              <p className="text-blue-100 text-sm">All information is kept secure and confidential</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-5">
                {/* Age Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Age <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="age"
                      value={quoteData.age}
                      onChange={handleChange}
                      placeholder="e.g. 35"
                      min="18"
                      max="100"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                      years
                    </div>
                  </div>
                </div>
                
                {/* Gender Field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setQuoteData(prev => ({ ...prev, gender: "male" }))}
                      className={`py-3 px-4 rounded-lg text-center font-medium border ${
                        quoteData.gender === "male"
                          ? "bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuoteData(prev => ({ ...prev, gender: "female" }))}
                      className={`py-3 px-4 rounded-lg text-center font-medium border ${
                        quoteData.gender === "female"
                          ? "bg-purple-50 border-purple-500 text-purple-600"
                          : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>
                
                {/* Coverage Amount */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Coverage Amount <span className="text-red-500">*</span>
                    <span className="text-sm font-normal text-gray-500 ml-2">(in BDT)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="coverage"
                      value={quoteData.coverage}
                      onChange={handleChange}
                      placeholder="e.g. 2,000,000"
                      min="100000"
                      max="100000000"
                      step="100000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                      ৳
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {[1000000, 2000000, 5000000, 10000000].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setQuoteData(prev => ({ ...prev, coverage: amount }))}
                        className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
                      >
                        {new Intl.NumberFormat().format(amount)} ৳
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Duration */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Policy Duration <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="duration"
                      value={quoteData.duration}
                      onChange={handleChange}
                      placeholder="e.g. 20"
                      min="5"
                      max="40"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                      years
                    </div>
                  </div>
                </div>
                
                {/* Smoker */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Do you smoke? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setQuoteData(prev => ({ ...prev, smoker: "no" }))}
                      className={`py-3 px-4 rounded-lg text-center font-medium border ${
                        quoteData.smoker === "no"
                          ? "bg-green-50 border-green-500 text-green-600"
                          : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Non-Smoker
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuoteData(prev => ({ ...prev, smoker: "yes" }))}
                      className={`py-3 px-4 rounded-lg text-center font-medium border ${
                        quoteData.smoker === "yes"
                          ? "bg-red-50 border-red-500 text-red-600"
                          : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Smoker
                    </button>
                  </div>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isCalculating}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all ${
                    isCalculating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                  }`}
                >
                  {isCalculating ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Calculating...
                    </div>
                  ) : (
                    "Get Your Quote"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
          
          {/* Results Section */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-xl p-8 h-full text-white">
              <div className="flex items-center mb-6">
                <div className="bg-white/20 p-3 rounded-xl mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Your Quote Results</h2>
              </div>
              
              {estimatedPremium ? (
                <div className="space-y-6">
                  <div className="bg-white/10 rounded-2xl p-6 text-center">
                    <p className="text-blue-100 mb-2">Estimated Monthly Premium</p>
                    <div className="text-4xl font-bold mb-1">৳{estimatedPremium.monthly}</div>
                    <p className="text-blue-200">That's just ৳{(estimatedPremium.monthly / 30).toFixed(0)} per day</p>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-6">
                    <h3 className="font-bold text-xl mb-4">Premium Breakdown</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-blue-100">Monthly Premium</span>
                        <span className="font-medium">৳{estimatedPremium.monthly}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-100">Yearly Premium</span>
                        <span className="font-medium">৳{estimatedPremium.yearly}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-100">Total for {quoteData.duration} years</span>
                        <span className="font-medium">৳{estimatedPremium.yearly * parseInt(quoteData.duration)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-6">
                    <h3 className="font-bold text-xl mb-4">Policy Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-blue-100">Coverage Amount</span>
                        <span className="font-medium">৳{new Intl.NumberFormat().format(quoteData.coverage)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-100">Policy Duration</span>
                        <span className="font-medium">{quoteData.duration} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-100">Smoker Status</span>
                        <span className="font-medium">{quoteData.smoker === "yes" ? "Smoker" : "Non-Smoker"}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleApply}
                    className="w-full py-4 px-6 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold rounded-xl shadow-lg transition-all"
                  >
                    Apply for Policy
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-white/10 rounded-full p-4 inline-block mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Your Quote Awaits</h3>
                  <p className="text-blue-200 max-w-md mx-auto">
                    Complete the form to see your personalized life insurance premium estimate. It only takes 60 seconds!
                  </p>
                </div>
              )}
            </div>
            
            {/* Additional Info */}
            {estimatedPremium && (
              <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4">Why choose LifePolicyPulse?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-600">Instant approval for most applicants</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-600">No medical exam required for coverage up to ৳5,000,000</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-600">Money-back guarantee within 30 days</span>
                  </li>
                </ul>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How accurate is this quote?",
                answer: "Our quote estimates are 95% accurate based on industry standards. Your final premium may vary slightly after medical underwriting."
              },
              {
                question: "What factors affect my premium?",
                answer: "Premiums are based on age, gender, health, coverage amount, policy term, and lifestyle factors like smoking."
              },
              {
                question: "Can I change my coverage later?",
                answer: "Yes, you can increase your coverage during annual reviews or after qualifying life events like marriage or having a child."
              },
              {
                question: "How long does approval take?",
                answer: "Most applicants receive approval within 24-48 hours. Some cases requiring additional medical information may take 5-7 business days."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              >
                <h4 className="font-bold text-lg text-gray-800 mb-2">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div></div>
  );
};

export default QuotePage;
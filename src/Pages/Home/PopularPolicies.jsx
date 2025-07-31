import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiArrowRight, FiStar, FiShield, FiClock, FiDollarSign } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Loading from '../../Components/Loading';

const PopularPolicies = () => {
  const [popularPolicies, setPopularPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularPolicies = async () => {
      try {
        const response = await axios.get('https://life-policy-pulse-server.vercel.app/policies');
        setPopularPolicies(response.data.result);
        setLoading(false);
      } catch (err) {
        setError('Failed to load popular policies');
        setLoading(false);
        console.error(err);
      }
    };

    fetchPopularPolicies();
  }, []);

  if (loading) {
    return (
     <Loading></Loading>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            Most Popular Policies
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the insurance plans our customers trust the most. These top-rated policies offer the perfect balance of coverage and value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularPolicies.slice(0, 6).map((policy, index) => (
            <motion.div
              key={policy._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                    <FiStar className="mr-1" /> Popular
                  </div>
                </div>
                
                <div className="h-48 overflow-hidden">
                  {policy.image ? (
                    <img 
                      src={policy.image} 
                      alt={policy.title} 
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-full h-full flex items-center justify-center">
                      <FiShield className="text-blue-500 text-5xl" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{policy.title}</h3>
                  <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                    #{index + 1}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-6">{policy.shortDetails}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <FiDollarSign className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Coverage</div>
                      <div className="font-bold text-gray-800">{policy.coverageRange}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-lg mr-3">
                      <FiClock className="text-purple-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Term</div>
                      <div className="font-bold text-gray-800">{policy.term}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
                  <div>
                    <div className="text-xs text-gray-500">Starting from</div>
                    <div className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {policy.premium || "Custom Pricing"}
                    </div>
                  </div>
                  
                  <motion.a
                    href={`/policies/${policy._id}`}
                    className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="mr-2">View Details</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <FiArrowRight />
                    </motion.span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a 
            href="/policies" 
            className="inline-flex items-center text-lg font-medium text-blue-600 hover:text-purple-700 transition-colors"
          >
            View All Insurance Policies
            <FiArrowRight className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PopularPolicies;
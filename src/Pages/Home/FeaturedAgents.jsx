import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiStar,
  FiMessageSquare,
  FiPhone,
  FiMail,
  FiAward,
} from "react-icons/fi";
import { motion } from "framer-motion";

const FeaturedAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAgent, setActiveAgent] = useState(null);

  useEffect(() => {
    axios
      .get("https://life-policy-pulse-server.vercel.app/agents/featured")
      .then((res) => {
        setAgents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch agents:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );

  return (
    <section className="py-16 px-4  bg-base-100">
      <div className="w-11/12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Meet Our Expert Agents
          </h2>
          <p className="text-lg  text-base-content max-w-2xl mx-auto">
            Connect with our top-performing insurance professionals dedicated to
            finding the perfect policy for your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <motion.div
              key={agent._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={` bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all duration-300 hover:shadow-2xl ${
                activeAgent === agent._id ? "ring-2 ring-purple-500" : ""
              }`}
              onClick={() => setActiveAgent(agent._id)}>
              <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500  text-base-content text-xs font-bold px-3 py-1 rounded-full flex items-center">
                    <FiStar className="mr-1" /> Top Agent
                  </div>
                </div>

                <div className="relative h-64 overflow-hidden">
                  {agent.image ? (
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-full h-full flex items-center justify-center">
                      <div className=" bg-base-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h3 className="text-xl font-bold  text-base-content">
                      {agent.name}
                    </h3>
                    <p className="text-blue-100 text-sm flex items-center">
                      <FiAward className="mr-2" />
                      Experience: {agent.experience || "3+ years"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider  text-base-content mb-1">
                      Specialties
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {agent.specialties?.map((specialty, i) => (
                        <span
                          key={i}
                          className=" bg-base-300 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                      {(!agent.specialties ||
                        agent.specialties.length === 0) && (
                        <span className="bg-base-300 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                          Life Insurance
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        98%
                      </div>
                      <div className="text-xs  text-base-content">
                        Satisfaction
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6 pt-6 border-t border-gray-100">
                  <div className="flex space-x-3">
                    <a
                      href={`tel:${agent.phone || "+1234567890"}`}
                      className=" bg-base-200 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition"
                      title="Call">
                      <FiPhone />
                    </a>
                    <a
                      href={`mailto:${agent.email || "agent@example.com"}`}
                      className=" bg-base-200 text-purple-600 p-2 rounded-full hover:bg-purple-200 transition"
                      title="Email">
                      <FiMail />
                    </a>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600  text-base-content font-medium px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center">
                    <FiMessageSquare className="mr-2" />
                    Contact
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {agents.length === 0 && !loading && (
          <div className="text-center py-12  bg-base-100 rounded-xl shadow-sm max-w-2xl mx-auto">
            <div className="text-5xl mb-4">👤</div>
            <h3 className="text-xl font-semibold  text-base-content mb-2">
              No Featured Agents Available
            </h3>
            <p className=" text-base-content max-w-md mx-auto">
              Our top agents are currently helping other clients. Please check
              back soon!
            </p>
          </div>
        )}

        <div className="text-center mt-16">
          <motion.a
            href="/agents"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600  text-base-content px-8 py-4 rounded-full text-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            View All Agents
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAgents;

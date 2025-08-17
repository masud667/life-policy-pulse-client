import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiUser,
  FiBookOpen,
} from "react-icons/fi";
import { motion } from "framer-motion";
import Loading from "../../Components/Loading";

const LatestBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(
          "https://life-policy-pulse-server.vercel.app/blogs"
        );
        setBlogs(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load blog articles. Please try again later.");
        setLoading(false);
        console.error("Error fetching blogs:", err);
      }
    };

    // Simulate API delay for demonstration
    const timer = setTimeout(() => {
      fetchBlogs();
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-red-500 text-lg mb-6 max-w-md mx-auto">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="py-16  bg-gradient-to-b from-white to-indigo-50">
      <div className="w-11/12 mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Latest Insights & Articles
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest insurance insights, tips, and industry
            news to make informed decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.slice(0, 4).map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              {/* Blog image */}
              <div className="relative h-48 overflow-hidden">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                ) : (
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-full h-full flex items-center justify-center">
                    <FiBookOpen className="text-blue-500 text-5xl" />
                  </div>
                )}

                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {blog.category || "Insurance"}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center mr-4">
                    <FiCalendar className="mr-1 text-blue-500" />
                    <span>{formatDate(blog.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="mr-1 text-purple-500" />
                    <span>{blog.readTime || "5 min read"}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">
                  {blog.details}
                </p>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      {blog.author || "Admin"}
                    </span>
                  </div>

                  <motion.a
                    href={`/blog/${blog._id}`}
                    className="flex items-center text-blue-600 hover:text-purple-700 font-medium group"
                    whileHover={{ x: 5 }}>
                    Read more
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}>
          <a
            href="/blog"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
            Explore All Articles
            <FiArrowRight className="ml-3" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default LatestBlogs;

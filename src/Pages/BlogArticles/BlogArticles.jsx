import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEye, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import Header from "../../Components/Header";

const BlogArticles = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://life-policy-pulse-server.vercel.app/blogs")
      .then((res) => setBlogs(res.data));
  }, []);

  const handleReadMore = async (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);

    await axios.patch(
      `https://life-policy-pulse-server.vercel.app/blogs/${blog._id}`,
      {
        visits: blog.visits + 1,
      }
    );

    setBlogs((prev) =>
      prev.map((b) => (b._id === blog._id ? { ...b, visits: b.visits + 1 } : b))
    );
  };

  return (
    <div>
      <Header></Header>
      <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-indigo-25 to-violet-50">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
          Policy Insights
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100 transition-all duration-300 hover:shadow-2xl hover:border-indigo-200">
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  New
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded">
                    Policy Analysis
                  </span>
                  <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                  <span className="text-xs text-indigo-500">
                    {new Date(blog.date).toLocaleDateString()}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-indigo-900">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {blog.details.slice(0, 120)}...
                </p>

                <div className="flex items-center justify-between pt-3">
                  <div className="flex items-center gap-2">
                    <FaUserCircle className="text-indigo-500 text-lg" />
                    <span className="font-medium text-indigo-700">
                      {blog.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-indigo-500">
                    <FaEye />
                    <span className="text-xs font-medium">{blog.visits}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleReadMore(blog)}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5">
                  Read Analysis <FaArrowRight className="text-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="relative z-50">
          <div
            className="fixed inset-0 bg-indigo-900/80 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-2xl mx-auto rounded-2xl bg-white shadow-2xl overflow-hidden border border-indigo-100">
              {selectedBlog && (
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <Dialog.Title className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {selectedBlog.title}
                    </Dialog.Title>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-indigo-400 hover:text-indigo-700">
                      ✕
                    </button>
                  </div>

                  <div className="my-4 h-1 w-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>

                  <img
                    src={selectedBlog.image}
                    className="w-full h-64 object-cover rounded-xl my-6 border border-indigo-100"
                  />

                  <p className="text-gray-700 mb-6">
                    {selectedBlog.fullDetails}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-indigo-100">
                    <div className="flex items-center gap-2">
                      <FaUserCircle className="text-indigo-500" />
                      <span className="font-medium text-indigo-700">
                        {selectedBlog.author}
                      </span>
                    </div>
                    <Link
                      to={`/blog/${selectedBlog._id}`}
                      className="flex items-center gap-1 text-indigo-600 font-semibold hover:text-purple-700 transition-colors">
                      Full Policy Brief{" "}
                      <FaArrowRight className="text-xs mt-0.5" />
                    </Link>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default BlogArticles;

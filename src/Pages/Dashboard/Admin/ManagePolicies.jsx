import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import Loading from "../../../Components/Loading";
import AuthSecureAxios from "../../../Hooks/AuthSecureAxios";
import { HiRefresh } from "react-icons/hi";

const ManagePolicies = () => {
  const [policies, setPolicies] = useState([]);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      const res = await AuthSecureAxios.get(
        `/policies?page=${currentPage}&limit=${itemsPerPage}`
      );
      setPolicies(res.data.result);
      setTotal(res.data.total);
    } catch (error) {
      Swal.fire("Error", "Failed to load policies", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, [currentPage]);

  const openModal = (policy = null) => {
    setEditingPolicy(policy);
    setIsModalOpen(true);
    if (policy) {
      // Set default values in form
      Object.keys(policy).forEach((key) => {
        if (policy[key]) setValue(key, policy[key]);
      });
    } else {
      reset();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPolicy(null);
    reset();
  };
  const totalPages = Math.ceil(total / itemsPerPage);
  const onSubmit = async (data) => {
    try {
      // Remove _id if present in form data
      const { _id, ...payload } = data;

      if (editingPolicy) {
        await AuthSecureAxios.patch(`/policies/${editingPolicy._id}`, payload);
        Swal.fire("Updated!", "Policy updated successfully", "success");
      } else {
        await AuthSecureAxios.post("/policies", payload);
        Swal.fire("Added!", "Policy added successfully", "success");
      }

      closeModal();
      fetchPolicies();
    } catch (error) {
      console.error(error.response?.data || error.message);
      Swal.fire("Error", "Failed to save policy", "error");
    }
  };

  const deletePolicy = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete this policy?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#ef4444",
      cancelButtonText: "Cancel",
      background: "#f9fafb",
    });

    if (confirm.isConfirmed) {
      try {
        await AuthSecureAxios.delete(`/policies/${id}`);
        fetchPolicies();
        Swal.fire("Deleted!", "Policy has been deleted", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete policy", "error");
      }
    }
  };

  // Filter policies based on search and category
  const filteredPolicies = policies?.filter((policy) => {
    const matchesSearch =
      policy.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || policy.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = [...new Set(policies?.map((policy) => policy.category))];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-base-100 px-5">
      <div className="">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold  text-base-content">
              Insurance Policy Management
            </h1>
            <p className=" text-base-content mt-1 text-sm md:text-base">
              Manage and customize insurance policies
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="mt-4 md:mt-0 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700  text-white rounded-lg font-medium flex items-center justify-center transition text-sm md:text-base">
            <FaPlus className="mr-2" /> Add New Policy
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-6 md:mb-8">
          <div className=" bg-base-100 rounded-lg md:rounded-xl shadow p-3 md:p-6 border-l-4 border-indigo-500">
            <div className="flex justify-between items-center">
              <div>
                <p className=" text-base-content text-xs md:text-sm font-medium">
                  Total Policies
                </p>
                <p className="text-lg md:text-2xl font-bold mt-1">{total}</p>
              </div>
              <div className="p-2 md:p-3 bg-base-300 rounded-lg text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className=" bg-base-100 rounded-lg md:rounded-xl shadow p-3 md:p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-center">
              <div>
                <p className=" text-base-content text-xs md:text-sm font-medium">
                  Term Life Policies
                </p>
                <p className="text-lg md:text-2xl font-bold mt-1">
                  {policies?.filter((p) => p.category === "Term Life").length}
                </p>
              </div>
              <div className="p-2 md:p-3 bg-base-300 rounded-lg text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className=" bg-base-100 rounded-lg md:rounded-xl shadow p-3 md:p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <p className=" text-base-content text-xs md:text-sm font-medium">
                  Life Policies
                </p>
                <p className="text-lg md:text-2xl font-bold mt-1">
                  {policies.filter((p) => p.category === "Life").length}
                </p>
              </div>
              <div className="p-2 md:p-3  bg-base-300 rounded-lg text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className=" bg-base-100 rounded-lg md:rounded-xl shadow p-3 md:p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-center">
              <div>
                <p className=" text-base-content text-xs md:text-sm font-medium">
                  Senior Policies
                </p>
                <p className="text-lg md:text-2xl font-bold mt-1">
                  {policies.filter((p) => p.category === "Senior").length}
                </p>
              </div>
              <div className="p-2 md:p-3  bg-base-200 rounded-lg text-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className=" bg-base-100 rounded-lg md:rounded-xl shadow p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search policies..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-transparent text-sm md:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-2.5 md:top-3  text-base-content" />
            </div>

            <div className="flex gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 md:px-4 md:py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-transparent text-sm md:text-base flex-grow">
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <button
                onClick={fetchPolicies}
                className="px-3 py-2  hover: bg-base-200 rounded-lg font-medium flex items-center text-sm md:text-base">
                <HiRefresh className="md:mr-2" />
                <span className="hidden md:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block  bg-base-100 rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className=" bg-base-50">
                <tr>
                  <th className="px-2 py-3 text-left text-xs font-medium  text-base-content uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium  text-base-content uppercase tracking-wider">
                    Policy
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  text-base-content uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  text-base-content uppercase tracking-wider">
                    Age Range
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  text-base-content uppercase tracking-wider">
                    Coverage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  text-base-content uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  text-base-content uppercase tracking-wider">
                    Premium
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  text-base-content uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className=" bg-base-100 divide-y divide-gray-200">
                {filteredPolicies.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center">
                      <div className=" text-base-content text-lg">
                        No policies found
                      </div>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setCategoryFilter("all");
                        }}
                        className="mt-4 text-indigo-600 hover:text-indigo-800 flex items-center justify-center mx-auto">
                        Clear filters
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredPolicies.map((policy, idx) => (
                    <tr
                      key={policy._id}
                      className="hover: bg-base-50 transition">
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium  text-base-content">
                        {idx + 1}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-base-300 text-indigo-800 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                            {policy.title?.charAt(0) || "P"}
                          </div>
                          <div>
                            <div className="font-medium  text-base-content">
                              {policy.title}
                            </div>
                            <div className="text-sm  text-base-content">
                              ID: {policy._id.substring(0, 8)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm  text-base-content">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            policy.category === "Health"
                              ? "bg-green-100 text-green-800"
                              : policy.category === "Life"
                              ? " bg-base-300 text-blue-800"
                              : " bg-base-200 text-purple-800"
                          }`}>
                          {policy.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm  text-base-content">
                        {policy.minAge} - {policy.maxAge} yrs
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm  text-base-content">
                        ${policy.coverageRange}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm  text-base-content">
                        {policy.durationOptions} yrs
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm  text-base-content">
                        ${policy.basePremiumRate}/mo
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openModal(policy)}
                            className="text-indigo-600 hover:text-indigo-600 bg-base-300 hover:bg-base-200 p-2 rounded-md transition flex items-center"
                            title="Edit Policy">
                            <FaEdit className="mr-1" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => deletePolicy(policy._id)}
                            className="text-red-600 hover:text-red-900 bg-base-300 hover:bg-base-200 p-2 rounded-md transition flex items-center"
                            title="Delete Policy">
                            <FaTrash className="mr-1" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Policy Cards */}
        <div className="md:hidden">
          {filteredPolicies.length === 0 ? (
            <div className=" bg-base-100 rounded-lg shadow p-6 text-center">
              <div className=" text-base-content text-lg">
                No policies found
              </div>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                }}
                className="mt-4 text-indigo-600 hover:text-indigo-800">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPolicies.map((policy) => (
                <div
                  key={policy._id}
                  className=" bg-base-100 rounded-lg shadow p-4 border border-purple-300">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="bg-base-300 text-indigo-800 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                        {policy.title?.charAt(0) || "P"}
                      </div>
                      <div>
                        <div className="font-medium  text-base-content">
                          {policy.title}
                        </div>
                        <div className="text-sm  text-base-content">
                          ID: {policy._id.substring(0, 8)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs  text-base-content">Category</p>
                      <span
                        className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                          policy.category === "Health"
                            ? "bg-green-100 text-green-800"
                            : policy.category === "Life"
                            ? " bg-base-300 text-blue-800"
                            : " bg-base-200 text-purple-800"
                        }`}>
                        {policy.category}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs  text-base-content">Age Range</p>
                      <p className="text-sm">
                        {policy.minAge} - {policy.maxAge} yrs
                      </p>
                    </div>

                    <div>
                      <p className="text-xs  text-base-content">Coverage</p>
                      <p className="text-sm">${policy.coverageRange}</p>
                    </div>

                    <div>
                      <p className="text-xs  text-base-content">Duration</p>
                      <p className="text-sm">{policy.durationOptions} yrs</p>
                    </div>

                    <div>
                      <p className="text-xs  text-base-content">Premium</p>
                      <p className="text-sm">${policy.basePremiumRate}/mo</p>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => openModal(policy)}
                      className="flex-1 bg-base-300 hover:bg-base-200 text-indigo-600 py-2 rounded-md text-sm flex items-center justify-center"
                      title="Edit Policy">
                      <FaEdit className="mr-1" />
                      Edit
                    </button>

                    <button
                      onClick={() => deletePolicy(policy._id)}
                      className="flex-1 bg-base-300 hover:bg-base-200 text-red-600 py-2 rounded-md text-sm flex items-center justify-center"
                      title="Delete Policy">
                      <FaTrash className="mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === number + 1
                  ? "bg-blue-600  text-base-content"
                  : " bg-base-200  text-base-content"
              }`}>
              {number + 1}
            </button>
          ))}
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className=" bg-base-100 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold  text-base-content">
                    {editingPolicy ? "Edit Policy" : "Create New Policy"}
                  </h3>
                  <button
                    onClick={closeModal}
                    className=" text-base-content hover: text-base-content">
                    <FaTimes />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium  text-base-content mb-1">
                      Policy Title
                    </label>
                    <input
                      {...register("title", { required: "Title is required" })}
                      placeholder="Policy Title"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.title ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-indigo-300 focus:border-transparent`}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium  text-base-content mb-1">
                        Category
                      </label>
                      <select
                        {...register("category", {
                          required: "Category is required",
                        })}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.category ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-indigo-300 focus:border-transparent`}>
                        <option value="">Select Category</option>
                        <option value="Health">Health Insurance</option>
                        <option value="Life">Life Insurance</option>
                        <option value="Property">Property Insurance</option>
                        <option value="Auto">Auto Insurance</option>
                        <option value="Travel">Travel Insurance</option>
                      </select>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.category.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium  text-base-content mb-1">
                        Image URL
                      </label>
                      <input
                        {...register("image")}
                        placeholder="Image URL"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium  text-base-content mb-1">
                      Description
                    </label>
                    <textarea
                      {...register("description", {
                        required: "Description is required",
                      })}
                      placeholder="Policy description"
                      rows="3"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.description
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:ring-2 focus:ring-indigo-300 focus:border-transparent`}></textarea>
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium  text-base-content mb-1">
                        Minimum Age
                      </label>
                      <input
                        type="number"
                        {...register("minAge", {
                          required: "Minimum age is required",
                          min: { value: 0, message: "Age must be positive" },
                        })}
                        placeholder="Minimum Age"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.minAge ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-indigo-300 focus:border-transparent`}
                      />
                      {errors.minAge && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.minAge.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium  text-base-content mb-1">
                        Maximum Age
                      </label>
                      <input
                        type="number"
                        {...register("maxAge", {
                          required: "Maximum age is required",
                          min: { value: 0, message: "Age must be positive" },
                        })}
                        placeholder="Maximum Age"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.maxAge ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-indigo-300 focus:border-transparent`}
                      />
                      {errors.maxAge && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.maxAge.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium  text-base-content mb-1">
                        Coverage Range ($)
                      </label>
                      <input
                        {...register("coverageRange", {
                          required: "Coverage range is required",
                        })}
                        placeholder="Coverage Range"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.coverageRange
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:ring-2 focus:ring-indigo-300 focus:border-transparent`}
                      />
                      {errors.coverageRange && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.coverageRange.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium  text-base-content mb-1">
                        Duration Options (years)
                      </label>
                      <input
                        {...register("durationOptions", {
                          required: "Duration options are required",
                        })}
                        placeholder="Duration Options"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.durationOptions
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:ring-2 focus:ring-indigo-300 focus:border-transparent`}
                      />
                      {errors.durationOptions && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.durationOptions.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium  text-base-content mb-1">
                      Base Premium Rate ($/month)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("basePremiumRate", {
                        required: "Premium rate is required",
                        min: {
                          value: 0.01,
                          message: "Premium must be greater than 0",
                        },
                      })}
                      placeholder="Base Premium Rate"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.basePremiumRate
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:ring-2 focus:ring-indigo-300 focus:border-transparent`}
                    />
                    {errors.basePremiumRate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.basePremiumRate.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-5 py-2.5 bg-gray-100 hover: bg-base-200 rounded-lg font-medium">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700  text-base-content rounded-lg font-medium">
                      {editingPolicy ? "Update Policy" : "Create Policy"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePolicies;

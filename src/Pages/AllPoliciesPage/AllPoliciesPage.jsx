import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { FiSearch, FiFilter, FiArrowRight } from "react-icons/fi";
import axios from "axios";
import Header from "../../Components/Header";
import Loading from "../../Components/Loading";

const AllPoliciesPage = () => {
  const [policies, setPolicies] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://life-policy-pulse-server.vercel.app/policies?page=${currentPage}&limit=${itemsPerPage}`
      )
      .then((res) => {
        setPolicies(res.data.result);
        setTotal(res.data.total);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching policies:", error);
        setLoading(false);
      });
  }, [currentPage]);

  const categories = useMemo(() => {
    const unique = new Set(policies.map((p) => p.category));
    return Array.from(unique);
  }, [policies]);

  const handleFilter = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredPolicies = policies.filter((item) => {
    const matchCategory =
      selectedCategory === "all" || item?.category === selectedCategory;
    const matchSearch = item?.title
      ?.toLowerCase()
      .includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(total / itemsPerPage);

  if (loading) return <Loading />;

  return (
    <div>
      <Header />
      <div className="bg-base-100  py-32 ">
        <div className="w-11/12 mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              All Life Insurance Policies
            </h1>
            <p className=" text-base-content mt-2">
              Choose the best plan tailored for you
            </p>
          </div>

          {/* Search & Filter */}
          <div className=" bg-base-100 rounded-xl shadow p-6 flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <FiSearch className="absolute top-3 left-3  text-base-content" />
              <input
                type="text"
                placeholder="Search policy..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <FiFilter className="text-purple-600" />
              <select
                value={selectedCategory}
                onChange={handleFilter}
                className="px-3 py-2 border border-gray-300 rounded-lg">
                <option value="all">All Categories</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 mb-4">
            <span className=" bg-base-300 text-blue-800 px-3 py-1 rounded">
              Total: {total}
            </span>
            <span className=" bg-base-200 text-purple-600 px-3 py-1 rounded">
              Categories: {categories.length || 0}
            </span>
          </div>

          {/* Policy Cards */}
          {filteredPolicies.length === 0 ? (
            <div className=" bg-base-100 p-10 rounded-xl shadow text-center">
              <p className=" text-base-content mb-4">
                No matching policies found.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                }}
                className="bg-blue-600  text-base-content px-6 py-2 rounded-lg">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPolicies.map((policy) => (
                <div
                  key={policy?._id}
                  className=" bg-base-100 p-6 rounded-xl shadow hover:shadow-md transition border-1 border-purple-200">
                  <img
                    src={policy?.image}
                    alt={policy?.title}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <h2 className="text-xl font-semibold">{policy?.title}</h2>
                  <p className="text-sm  text-base-content mb-2">
                    {policy?.shortDetails}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-purple-600">
                      {policy?.premium || "Custom Pricing"}
                    </span>
                    <Link
                      to={`/policies/${policy._id}`}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 btn rounded p-2  text-base-content hover:bg-gradient-to-l flex items-center gap-1">
                      View Details <FiArrowRight />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

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
        </div>
      </div>
    </div>
  );
};

export default AllPoliciesPage;

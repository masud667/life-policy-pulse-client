import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FiSearch,
  FiCalendar,
  FiDollarSign,
  FiEye,
  FiDownload,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
} from "react-icons/fi";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import AuthSecureAxios from "../../../Hooks/AuthSecureAxios";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const statusColors = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
};

const ManageTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    AuthSecureAxios.get("/transactions").then((res) => {
      setTransactions(res.data);
      setTotalIncome(
        res.data.reduce((sum, t) => sum + (t.amount || 0), 0) / 100
      );
      setLoading(false);
    });
  }, []);

  // Filter transactions based on status and search
  const filteredTransactions = transactions.filter((t) => {
    const matchesStatus = filter === "all" || t.status.toLowerCase() === filter;
    const matchesSearch =
      t.email.includes(search) ||
      t.policyName.toLowerCase().includes(search.toLowerCase()) ||
      t.transactionId.includes(search);
    return matchesStatus && matchesSearch;
  });

  const chartData = {
    labels: filteredTransactions.map((t) =>
      new Date(t.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Earnings ($)",
        data: filteredTransactions.map((t) => t.amount / 100),
        backgroundColor: "#4f46e5",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Earnings Overview",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return "$" + value;
          },
        },
      },
    },
  };

  return (
    <div className="p-4 md:p-6 w-11/12 mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Transaction Management
          </h2>
          <p className="text-gray-600 mt-1">View and analyze payment history</p>
        </div>

        <div className="flex-shrink-0">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
            <FiDownload className="text-lg" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats and Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Statistic Card */}
        <div className="bg-white rounded-xl shadow-sm p-5 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <FiDollarSign className="text-2xl text-indigo-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Income</p>
              <p className="text-2xl font-bold text-gray-800">
                ${totalIncome.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Filter Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:col-span-3">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {/* Status Filter Dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <FiFilter className="h-5 w-5 text-gray-500" />
                  <span>Filter</span>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setFilter("all")}
                            className={`${
                              active ? "bg-gray-100" : ""
                            } block w-full text-left px-4 py-2 text-sm ${
                              filter === "all"
                                ? "text-indigo-600 font-medium"
                                : "text-gray-700"
                            }`}>
                            All Statuses
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setFilter("completed")}
                            className={`${
                              active ? "bg-gray-100" : ""
                            } block w-full text-left px-4 py-2 text-sm ${
                              filter === "completed"
                                ? "text-indigo-600 font-medium"
                                : "text-gray-700"
                            }`}>
                            Completed
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setFilter("pending")}
                            className={`${
                              active ? "bg-gray-100" : ""
                            } block w-full text-left px-4 py-2 text-sm ${
                              filter === "pending"
                                ? "text-indigo-600 font-medium"
                                : "text-gray-700"
                            }`}>
                            Pending
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setFilter("failed")}
                            className={`${
                              active ? "bg-gray-100" : ""
                            } block w-full text-left px-4 py-2 text-sm ${
                              filter === "failed"
                                ? "text-indigo-600 font-medium"
                                : "text-gray-700"
                            }`}>
                            Failed
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              {/* Date Filter Button */}
              <button className="flex items-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <FiCalendar className="h-5 w-5 text-gray-500" />
                <span className="hidden sm:inline">Date Filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="h-72 md:h-96">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Policy
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((t) => (
                <tr
                  key={t.transactionId}
                  className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="hidden md:inline text-sm font-medium text-gray-900">
                      #{t.transactionId}
                    </span>
                    <span className="md:hidden text-sm font-medium text-gray-900">
                      #{t.transactionId.slice(0, 8)}...
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {t.email}
                    </div>
                    <div className="text-sm text-gray-500 hidden md:block">
                      User ID: {t.userId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 max-w-[160px] truncate">
                      {t.policyName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      ${(t.amount / 100).toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="hidden md:block text-sm text-gray-900">
                      {new Date(t.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="md:hidden text-sm text-gray-900">
                      {new Date(t.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[t.status.toLowerCase()] ||
                        "bg-gray-100 text-gray-800"
                      }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button className="hidden md:inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none transition">
                      <FiEye className="mr-1.5 h-4 w-4" />
                      Details
                    </button>
                    <button className="md:hidden text-indigo-600 hover:text-indigo-900">
                      <FiEye className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 border-t">
          <div className="text-sm text-gray-600">
            Showing {filteredTransactions.length} of {transactions.length}{" "}
            transactions
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              disabled>
              <FiChevronLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
              <span className="hidden sm:inline">Next</span>
              <FiChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTransactions;

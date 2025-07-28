import React, { useState, useEffect } from 'react';
import { 
  HiUsers, 
  HiDocumentText, 
  HiClock, 
  HiCheckCircle, 
  HiCurrencyDollar,
  HiChartBar,
  HiArrowUp,
  HiArrowDown,
  HiRefresh
} from 'react-icons/hi';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const DashboardHome = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);
  const [timeFilter, setTimeFilter] = useState('month');

  // Simulate data fetching
  useEffect(() => {
    const fetchData = () => {
      // Simulate API call delay
      setTimeout(() => {
        setMetrics({
          totalUsers: 1245,
          newUsers: 42,
          totalApplications: 356,
          pendingApplications: 28,
          approvedApplications: 298,
          rejectedApplications: 30,
          revenue: 12450,
          revenueChange: 12.5,
          userGrowth: 8.3,
          applicationTrends: [45, 52, 48, 65, 72, 60, 78, 85, 80, 92, 88, 95],
          statusDistribution: [298, 28, 30],
          recentActivity: [
            { id: 1, user: 'Sarah Johnson', action: 'submitted application', time: '10 mins ago' },
            { id: 2, user: 'Michael Chen', action: 'approved policy', time: '25 mins ago' },
            { id: 3, user: 'David Williams', action: 'updated profile', time: '1 hour ago' },
            { id: 4, user: 'Emma Rodriguez', action: 'requested support', time: '2 hours ago' },
            { id: 5, user: 'Alex Thompson', action: 'completed payment', time: '3 hours ago' },
          ]
        });
        setLoading(false);
      }, 800);
    };

    fetchData();
  }, []);

  // Chart data for application trends
  const applicationTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Applications',
        data: metrics?.applicationTrends || [],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      }
    ]
  };

  // Chart data for application status distribution
  const statusDistributionData = {
    labels: ['Approved', 'Pending', 'Rejected'],
    datasets: [
      {
        data: metrics?.statusDistribution || [],
        backgroundColor: [
          'rgba(72, 187, 120, 0.8)',
          'rgba(251, 189, 35, 0.8)',
          'rgba(240, 101, 72, 0.8)'
        ],
        borderColor: [
          'rgba(72, 187, 120, 1)',
          'rgba(251, 189, 35, 1)',
          'rgba(240, 101, 72, 1)'
        ],
        borderWidth: 1,
      }
    ]
  };

  // Options for bar chart
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Application Trends',
      },
    },
  };

  // Options for pie chart
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Application Status Distribution',
      },
    },
  };

  // Metric card component
  const MetricCard = ({ title, value, icon, change, changeType }) => (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
          {icon}
        </div>
      </div>
      {change !== undefined && (
        <div className={`mt-4 flex items-center text-sm font-medium ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
          {changeType === 'positive' ? <HiArrowUp className="mr-1" /> : <HiArrowDown className="mr-1" />}
          {change}%
        </div>
      )}
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-indigo-200 mt-1">Welcome back! Here's what's happening today.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select 
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="bg-indigo-700 border-0 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
                </select>
              </div>
              <button className="bg-white text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition">
                <HiRefresh className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            title="Total Users" 
            value={metrics.totalUsers} 
            icon={<HiUsers className="h-6 w-6" />} 
            change={metrics.userGrowth} 
            changeType="positive" 
          />
          <MetricCard 
            title="Total Applications" 
            value={metrics.totalApplications} 
            icon={<HiDocumentText className="h-6 w-6" />} 
          />
          <MetricCard 
            title="Pending Applications" 
            value={metrics.pendingApplications} 
            icon={<HiClock className="h-6 w-6" />} 
          />
          <MetricCard 
            title="Revenue" 
            value={`$${metrics.revenue.toLocaleString()}`} 
            icon={<HiCurrencyDollar className="h-6 w-6" />} 
            change={metrics.revenueChange} 
            changeType="positive" 
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="h-80">
              <Bar data={applicationTrendsData} options={barOptions} />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="h-80">
              <Pie data={statusDistributionData} options={pieOptions} />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <ul className="divide-y divide-gray-200">
            {metrics.recentActivity.map((activity) => (
              <li key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition">
                <div className="flex items-center">
                  <div className="bg-indigo-100 rounded-full p-3 text-indigo-600 mr-4">
                    <HiCheckCircle className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.user}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {activity.action}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {activity.time}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-6 py-4 bg-gray-50 text-center">
            <button className="text-indigo-600 hover:text-indigo-800 font-medium">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
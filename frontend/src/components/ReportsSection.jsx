import React, { useState } from "react";
import {
  Users,
  File,
  Upload,
  Settings,
  BarChart,
  Activity,
  UserCheck,
  ChevronRight,
  Search,
  Bell,
  User,
  Download,
  Filter,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample data for charts
const monthlyData = [
  { name: "Jan", documents: 120, scans: 240, matches: 100 },
  { name: "Feb", documents: 150, scans: 290, matches: 130 },
  { name: "Mar", documents: 180, scans: 350, matches: 160 },
  { name: "Apr", documents: 250, scans: 450, matches: 220 },
  { name: "May", documents: 300, scans: 520, matches: 280 },
  { name: "Jun", documents: 290, scans: 500, matches: 260 },
];

const userActivityData = [
  { name: "Downloads", value: 35 },
  { name: "Uploads", value: 45 },
  { name: "Scans", value: 20 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const documentTypeData = [
  { name: "PDF", count: 1245 },
  { name: "DOCX", count: 876 },
  { name: "TXT", count: 432 },
  { name: "XLS", count: 378 },
];

// If activeTab is "reports", render this component
const ReportsSection = () => {
  const [timeRange, setTimeRange] = useState("6m");
  const [reportType, setReportType] = useState("all");

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                className={`px-3 py-1.5 text-sm ${timeRange === "1m" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
                onClick={() => setTimeRange("1m")}
              >
                1M
              </button>
              <button
                className={`px-3 py-1.5 text-sm ${timeRange === "3m" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
                onClick={() => setTimeRange("3m")}
              >
                3M
              </button>
              <button
                className={`px-3 py-1.5 text-sm ${timeRange === "6m" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
                onClick={() => setTimeRange("6m")}
              >
                6M
              </button>
              <button
                className={`px-3 py-1.5 text-sm ${timeRange === "1y" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
                onClick={() => setTimeRange("1y")}
              >
                1Y
              </button>
            </div>
            <button className="flex items-center text-gray-700 border rounded-lg px-3 py-1.5 text-sm hover:bg-gray-50">
              <Calendar size={16} className="mr-1" />
              Custom Range
            </button>
            <button className="flex items-center text-gray-700 border rounded-lg px-3 py-1.5 text-sm hover:bg-gray-50">
              <Download size={16} className="mr-1" />
              Export
            </button>
          </div>
        </div>

        {/* Report type selector */}
        <div className="flex overflow-x-auto pb-2 mb-2">
          <button
            onClick={() => setReportType("all")}
            className={`mr-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              reportType === "all"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Reports
          </button>
          <button
            onClick={() => setReportType("usage")}
            className={`mr-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              reportType === "usage"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Usage Analytics
          </button>
          <button
            onClick={() => setReportType("documents")}
            className={`mr-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              reportType === "documents"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Document Analytics
          </button>
          <button
            onClick={() => setReportType("users")}
            className={`mr-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              reportType === "users"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            User Activity
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Trends Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Activity Trends</h3>
            <div className="flex space-x-2">
              <button className="text-sm text-gray-500 hover:text-gray-700">
                <Filter size={16} />
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="documents"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="scans" stroke="#82ca9d" />
                <Line type="monotone" dataKey="matches" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Document Types Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Document Types</h3>
            <div className="flex space-x-2">
              <button className="text-sm text-gray-500 hover:text-gray-700">
                <Filter size={16} />
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={documentTypeData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Activity Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">User Activity Distribution</h3>
            <div className="flex space-x-2">
              <button className="text-sm text-gray-500 hover:text-gray-700">
                <Filter size={16} />
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userActivityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userActivityData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Match Success Rate */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Match Success Rate</h3>
            <div className="flex space-x-2">
              <button className="text-sm text-gray-500 hover:text-gray-700">
                <Filter size={16} />
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-64">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4CAF50"
                  strokeWidth="3"
                  strokeDasharray="85, 100"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-3xl font-bold">85%</div>
                <div className="text-xs text-gray-500">Success Rate</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 w-full max-w-xs">
              <div className="text-center">
                <div className="text-xl font-semibold">3,245</div>
                <div className="text-xs text-gray-500">Successful Matches</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold">572</div>
                <div className="text-xs text-gray-500">Failed Matches</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold">Available Reports</h3>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search reports..."
              className="mr-2 px-3 py-1 text-sm border rounded-lg"
            />
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              New Report
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Report Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Generated
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Monthly Usage Summary
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      System
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    April 1, 2025
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      View
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Download
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      Share
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Document Processing Analytics
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Document
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    April 3, 2025
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      View
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Download
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      Share
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      User Engagement Report
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      User
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    April 4, 2025
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      View
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Download
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      Share
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Quarterly Performance Summary
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Executive
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    March 31, 2025
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      View
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Download
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      Share
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
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
  CreditCard,
} from "lucide-react";
import axios from "axios";
import ReportsSection from "../components/ReportsSection";
import useAuthStore from "../store/authStore.js";

const AdminPanel = () => {
  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const { getAnalytics, user, fetchUser } = useAuthStore();

  const getUserDocuments = async () => {
    try {
      setLoading(true);
      await getAnalytics();
      const res = await axios.get("http://localhost:3000/api/v1/document");
      const formattedDocuments = res.data.documents.map((doc) => ({
        id: doc._id,
        name: doc.originalName,
        uploadDate: new Date(doc.uploadDate).toLocaleDateString(),
        user: doc.userId?.name || "Unknown",
        fileType: doc.originalName.split(".").pop().toUpperCase(),
        size: doc.size ? `${(doc.size / 1024).toFixed(1)} KB` : "N/A",
      }));
      setDocuments(formattedDocuments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDocuments();
  }, []);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getAnalytics();
        const data = res?.data;

        if (data) {
          setStats({
            documents: data.stats.totalScans,
            users: data.stats.totalUsers,
            matchRate: Math.floor(
              (data.stats.todayScans / data.stats.totalScans) * 100 || 0,
            ),
            scansMade: data.stats.totalScans,
          });

          setTopUsers(data.topUsers || []);
        }
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      }
    };

    if (activeTab === "dashboard") {
      fetchAnalytics();
      console.log(topUsers);
    }
  }, [activeTab]);

  // Mock data - in a real app, this would come from API calls
  const [stats, setStats] = useState({
    documents: 0,
    users: 0,
    matchRate: 0,
    scansMade: 0,
  });

  const [topUsers, setTopUsers] = useState([]);

  const recentActivity = [
    {
      id: 1,
      user: "Michael Cooper",
      avatar: "/api/placeholder/40/40",
      action: "Uploaded 'Q4 Financial Report.pdf'",
      time: "2h ago",
    },
    {
      id: 2,
      user: "Sarah Wilson",
      avatar: "/api/placeholder/40/40",
      action: "Downloaded 'Project Proposal.docx'",
      time: "4h ago",
    },
    {
      id: 3,
      user: "David Brown",
      avatar: "/api/placeholder/40/40",
      action: "Matched 3 documents with 'Marketing Strategy'",
      time: "6h ago",
    },
  ];

  // Sidebar navigation options
  const sidebarOptions =
    user.role == "admin"
      ? [
          { id: "dashboard", label: "Dashboard", icon: BarChart },
          { id: "users", label: "Manage Users", icon: Users },
          { id: "credits", label: "Credit Requests", icon: CreditCard },
          { id: "reports", label: "View Reports", icon: BarChart },
          { id: "settings", label: "Settings", icon: Settings },
        ]
      : [
          { id: "dashboard", label: "Dashboard", icon: BarChart },
          { id: "settings", label: "Settings", icon: Settings },
        ];

  // Function to get all pending credit requests
  const getAllPendingRequests = async () => {
    await fetchUser();
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/credit/admin/pending",
      );
      if (res.data) {
        setPendingRequests(res.data.requests);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "credits") {
      getAllPendingRequests();
    }
  }, [activeTab]);

  const handleCreditAction = async (requestId, action) => {
    try {
      const toastId = toast.loading(
        `${action === "approved" ? "Approving" : "Rejecting"} request...`,
      );
      await axios.post("http://localhost:3000/api/v1/credit/admin/process", {
        requestId,
        status: action,
      });

      toast.success(
        `Request ${action === "approved" ? "approved" : "rejected"} successfully`,
        { id: toastId },
      );
      getAllPendingRequests();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while processing the request.");
    }
  };

  const getInitials = (fullName) => {
    if (!fullName) return "";
    const nameParts = fullName.trim().split(" ");
    return nameParts.map((part) => part[0]?.toUpperCase() || "").join("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b border-gray-200">
          <Link to="/">
            <h1 className="text-xl font-bold text-blue-600">
              DocScanner {user.role == "admin" ? "Admin" : ""}
            </h1>
          </Link>
        </div>

        <div className="p-4 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-600 mb-3">
            Quick Actions
          </h2>
          <nav>
            {sidebarOptions.map((option) => (
              <button
                key={option.id}
                className={`flex items-center w-full px-2 py-2 mt-1 text-sm rounded-lg ${
                  activeTab === option.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(option.id)}
              >
                <option.icon size={18} className="mr-2" />
                {option.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-end px-6 py-3">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell size={20} className="text-gray-600" />
              </button>
              <div className="flex items-center">
                <span className="ml-2 font-semibold">{user.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                      <File size={20} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Total Documents</p>
                      <h3 className="text-2xl font-bold">{stats.documents}</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                      <UserCheck size={20} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Total Users</p>
                      <h3 className="text-2xl font-bold">{stats.users}</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                      <Activity size={20} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Match Rate</p>
                      <h3 className="text-2xl font-bold">{stats.matchRate}%</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
                      <BarChart size={20} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Scans Made</p>
                      <h3 className="text-2xl font-bold">{stats.scansMade}</h3>
                    </div>
                  </div>
                </div>
              </div>

              {user.role == "admin" && (
                <>
                  {/* Recent Documents */}
                  <div className="bg-white rounded-lg shadow mb-6">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold">
                        Recent Documents
                      </h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Document
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Upload Date
                            </th>
                          </tr>
                        </thead>
                        {loading ? (
                          <tbody className="bg-white divide-y divide-gray-200 animate-pulse">
                            {[...Array(5)].map((_, idx) => (
                              <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="h-5 w-5 bg-gray-300 rounded mr-2"></div>
                                    <div className="h-4 w-32 bg-gray-300 rounded"></div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="h-5 w-16 bg-gray-300 rounded-full inline-block"></span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        ) : (
                          <tbody className="bg-white divide-y divide-gray-200">
                            {documents.slice(0, 5).map((doc) => (
                              <tr key={doc.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <File className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2" />
                                    <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                      {doc.name}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {doc.user}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {doc.fileType}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {doc.uploadDate}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        )}
                      </table>
                    </div>
                    {documents.length > 5 && (
                      <div className="p-4 border-t border-gray-200 text-right">
                        <button
                          onClick={() => setActiveTab("reports")}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View all documents →
                        </button>
                      </div>
                    )}
                  </div>
                  {/* Top Users */}
                  <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold">Top Users</h2>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              User
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Credits
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Total Scans
                            </th>
                          </tr>
                        </thead>
                        {loading ? (
                          <tbody className="bg-white divide-y divide-gray-200 animate-pulse">
                            {[...Array(5)].map((_, idx) => (
                              <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-gray-300 rounded-full"></div>
                                    <div className="ml-4">
                                      <div className="h-4 w-32 bg-gray-300 rounded mb-1"></div>
                                      <div className="h-3 w-24 bg-gray-200 rounded"></div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <div className="h-4 w-12 bg-gray-300 rounded"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <div className="h-4 w-12 bg-gray-300 rounded"></div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        ) : (
                          <tbody className="bg-white divide-y divide-gray-200">
                            {topUsers.map((user) => (
                              <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                      {getInitials(user.user)}
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-md font-medium text-gray-900">
                                        {user.user}
                                      </div>
                                      <div className="text-md text-gray-500 font-bold">
                                        {user.email}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-md font-semibold text-blue-500">
                                  {user.credits}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-md font-semibold text-red-500">
                                  {user.totalScans}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {activeTab === "users" && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Manage Users</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Add New User
                </button>
              </div>
              <div className="p-4">
                <div className="flex mb-4">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 flex-1"
                  />
                  <button className="ml-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                    Filter
                  </button>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[...topUsers].map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10  flex items-center justify-center">
                              {getInitials(user.email)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.user}
                              </div>
                              <div className="text-sm text-gray-500">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.role || "User"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.status === "Inactive"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {user.status || "Active"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">4</span> of{" "}
                    <span className="font-medium">4</span> users
                  </p>
                </div>
                <div className="flex-1 flex justify-end">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Credit Requests Tab */}
          {activeTab === "credits" && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  Pending Credit Requests
                </h2>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={getAllPendingRequests}
                >
                  Refresh
                </button>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-gray-500">Loading requests...</p>
                  </div>
                ) : pendingRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No pending credit requests found.
                    </p>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          User
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Request Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pendingRequests.map((request) => (
                        <tr key={request._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {getInitials(request.userId?.name)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {request.userId?.name || "User"}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {request.userId?.email || "No email"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(request.requestDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {request.requestedCredits}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {request.reason || "No description"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              className="flex items-center gap-2 bg-green-100 text-green-800 hover:bg-green-200 transition-all duration-200 px-4 py-1.5 rounded-full font-semibold shadow-sm"
                              onClick={() =>
                                handleCreditAction(request._id, "approved")
                              }
                            >
                              <CheckCircle size={16} />
                              Approve
                            </button>

                            <button
                              className="flex items-center gap-2 bg-red-100 text-red-800 hover:bg-red-200 transition-all duration-200 px-4 py-1.5 rounded-full font-semibold shadow-sm"
                              onClick={() =>
                                handleCreditAction(request._id, "rejected")
                              }
                            >
                              <XCircle size={16} />
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {activeTab === "reports" && <ReportsSection />}

          {activeTab === "settings" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium mb-2">System Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Document Storage</p>
                        <p className="text-sm text-gray-600">
                          Configure storage settings
                        </p>
                      </div>
                      <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                        Configure
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">API Configuration</p>
                        <p className="text-sm text-gray-600">
                          Manage API settings and keys
                        </p>
                      </div>
                      <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-md font-medium mb-2">
                    Security Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Authentication</p>
                        <p className="text-sm text-gray-600">
                          Configure login and authentication
                        </p>
                      </div>
                      <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                        Configure
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">User Permissions</p>
                        <p className="text-sm text-gray-600">
                          Manage role-based access
                        </p>
                      </div>
                      <button className="px-3 py-1 border rounded-md hover:bg-gray-50">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-md font-medium mb-2">
                    Notification Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">
                          Configure email alerts
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="email-toggle"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label
                          htmlFor="email-toggle"
                          className="ml-2 text-gray-700"
                        >
                          Enabled
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">System Alerts</p>
                        <p className="text-sm text-gray-600">
                          Configure system alerts
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="alerts-toggle"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label
                          htmlFor="alerts-toggle"
                          className="ml-2 text-gray-700"
                        >
                          Enabled
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

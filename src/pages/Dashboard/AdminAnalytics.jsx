import React, { useEffect, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
} from "recharts";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../Hooks/AxiousSecure";
import { motion } from "framer-motion";
import AOS from "aos";
import {
  Calendar,
  DollarSign,
  Users,
  Activity,
  TrendingUp,
  MapPin,
  UserCheck,
  CreditCard,
  Clock,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#6366f1",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

const StatCard = ({ icon: Icon, title, value, color, subValue, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div
          className={`p-3 rounded-lg ${color
            .replace("text", "bg")
            .replace("-500", "-100")}`}
        >
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
        </div>
      </div>
      {trend && (
        <div
          className={`text-sm font-semibold ${
            trend > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          <TrendingUp className="w-4 h-4 inline mr-1" />
          {trend > 0 ? "+" : ""}
          {trend}%
        </div>
      )}
    </div>
  </div>
);

const AdminAnalytics = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const { register, watch } = useForm();
  const filterDate = watch("filterDate");
  const filterMonth = watch("filterMonth");

  // Fetch all camps
  const { data: camps = [], isLoading: campsLoading } = useQuery({
    queryKey: ["admin-camps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/camps");
      return res.data.result || [];
    },
  });

  // Fetch all registered participants
  const { data: allRegistrations = [], isLoading: registrationsLoading } =
    useQuery({
      queryKey: ["admin-all-registrations"],
      queryFn: async () => {
        const res = await axiosSecure.get("/all-registered-participant");
        return res.data;
      },
    });

  // Fetch all users
  const { data: allUsers = [], isLoading: usersLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users"); // You'll need this endpoint
      return res.data;
    },
  });

  const isLoading = campsLoading || registrationsLoading || usersLoading;

  // Filter registrations based on date filters
  const filteredRegistrations = useMemo(() => {
    let filtered = allRegistrations;

    if (filterDate) {
      filtered = filtered.filter((r) =>
        new Date(r.registeredAt).toISOString().startsWith(filterDate)
      );
    }

    if (filterMonth) {
      filtered = filtered.filter((r) =>
        new Date(r.registeredAt).toISOString().startsWith(filterMonth)
      );
    }

    return filtered;
  }, [allRegistrations, filterDate, filterMonth]);

  // Calculate key metrics
  const metrics = useMemo(() => {
    const totalCamps = camps.length;
    const totalUsers = allUsers.filter((user) => user.role !== "admin").length;
    const totalRegistrations = filteredRegistrations.length;
    const paidRegistrations = filteredRegistrations.filter(
      (r) => r.paymentStatus === "paid"
    );
    const confirmedRegistrations = filteredRegistrations.filter(
      (r) => r.confirmationStatus === "confirmed"
    );

    const totalRevenue = paidRegistrations.reduce(
      (sum, r) => sum + (r.campFees || 0),
      0
    );
    const averageCampFees =
      totalCamps > 0
        ? camps.reduce((sum, c) => sum + c.campFees, 0) / totalCamps
        : 0;

    return {
      totalCamps,
      totalUsers,
      totalRegistrations,
      paidRegistrations: paidRegistrations.length,
      confirmedRegistrations: confirmedRegistrations.length,
      totalRevenue,
      averageCampFees,
      conversionRate:
        totalRegistrations > 0
          ? ((paidRegistrations.length / totalRegistrations) * 100).toFixed(1)
          : 0,
    };
  }, [camps, allUsers, filteredRegistrations]);

  // Camp performance data
  const campPerformance = useMemo(() => {
    const campMap = {};
    filteredRegistrations.forEach((r) => {
      if (!campMap[r.campName]) {
        campMap[r.campName] = {
          name: r.campName,
          registrations: 0,
          revenue: 0,
          confirmed: 0,
          paid: 0,
        };
      }
      campMap[r.campName].registrations += 1;
      campMap[r.campName].revenue += r.campFees || 0;
      if (r.confirmationStatus === "confirmed")
        campMap[r.campName].confirmed += 1;
      if (r.paymentStatus === "paid") campMap[r.campName].paid += 1;
    });
    return Object.values(campMap).sort(
      (a, b) => b.registrations - a.registrations
    );
  }, [filteredRegistrations]);

  // Location analytics
  const locationStats = useMemo(() => {
    const locationMap = {};
    camps.forEach((camp) => {
      const location = camp.location.trim();
      if (!locationMap[location]) {
        locationMap[location] = {
          name: location,
          camps: 0,
          totalParticipants: 0,
        };
      }
      locationMap[location].camps += 1;
      locationMap[location].totalParticipants += camp.participantCount || 0;
    });
    return Object.values(locationMap)
      .sort((a, b) => b.camps - a.camps)
      .slice(0, 8);
  }, [camps]);

  // Monthly registration trend
  const monthlyTrend = useMemo(() => {
    const monthMap = {};
    filteredRegistrations.forEach((r) => {
      const month = new Date(r.registeredAt).toISOString().substring(0, 7);
      if (!monthMap[month]) {
        monthMap[month] = { month, registrations: 0, revenue: 0, confirmed: 0 };
      }
      monthMap[month].registrations += 1;
      monthMap[month].revenue += r.campFees || 0;
      if (r.confirmationStatus === "confirmed") monthMap[month].confirmed += 1;
    });
    return Object.values(monthMap).sort((a, b) =>
      a.month.localeCompare(b.month)
    );
  }, [filteredRegistrations]);

  // Payment status distribution
  const paymentDistribution = useMemo(() => {
    const statusMap = {};
    filteredRegistrations.forEach((r) => {
      const status = r.paymentStatus || "pending";
      statusMap[status] = (statusMap[status] || 0) + 1;
    });
    return Object.entries(statusMap).map(([status, count]) => ({
      status,
      count,
    }));
  }, [filteredRegistrations]);

  // Healthcare professional stats
  const professionalStats = useMemo(() => {
    const profMap = {};
    camps.forEach((camp) => {
      const prof = camp.healthcareProfessional;
      if (!profMap[prof]) {
        profMap[prof] = { name: prof, camps: 0, totalParticipants: 0 };
      }
      profMap[prof].camps += 1;
      profMap[prof].totalParticipants += camp.participantCount || 0;
    });
    return Object.values(profMap)
      .sort((a, b) => b.camps - a.camps)
      .slice(0, 6);
  }, [camps]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 px-4 md:px-8 py-8 bg-gray-50 min-h-screen"
    >
      <Helmet>
        <title>Admin Analytics | Dashboard | MCMS</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            📊 Admin Analytics
          </h1>
          <p className="text-gray-600 mt-2">
            Comprehensive overview of your medical camp management system
          </p>
        </div>
        <div className="flex space-x-3">
          <input
            type="date"
            {...register("filterDate")}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Filter by date"
          />
          <input
            type="month"
            {...register("filterMonth")}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Filter by month"
          />
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Camps"
          value={metrics.totalCamps}
          icon={Activity}
          color="text-blue-500"
          subValue="Active medical camps"
        />
        <StatCard
          title="Total Users"
          value={metrics.totalUsers}
          icon={Users}
          color="text-green-500"
          subValue="Registered participants"
        />
        <StatCard
          title="Total Revenue"
          value={`৳${metrics.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="text-emerald-500"
          subValue={`Avg: ৳${metrics.averageCampFees.toFixed(0)}/camp`}
        />
        <StatCard
          title="Conversion Rate"
          value={`${metrics.conversionRate}%`}
          icon={TrendingUp}
          color="text-purple-500"
          subValue={`${metrics.paidRegistrations} paid registrations`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Registrations"
          value={metrics.totalRegistrations}
          icon={UserCheck}
          color="text-indigo-500"
          subValue="All time registrations"
        />
        <StatCard
          title="Confirmed"
          value={metrics.confirmedRegistrations}
          icon={Clock}
          color="text-teal-500"
          subValue="Confirmed bookings"
        />
        <StatCard
          title="Payment Success"
          value={`${metrics.paidRegistrations}/${metrics.totalRegistrations}`}
          icon={CreditCard}
          color="text-orange-500"
          subValue="Payment completion"
        />
        <StatCard
          title="Avg Camp Size"
          value={(
            metrics.totalRegistrations / (metrics.totalCamps || 1)
          ).toFixed(1)}
          icon={Calendar}
          color="text-pink-500"
          subValue="Participants per camp"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camp Performance */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Top Performing Camps
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={campPerformance.slice(0, 8)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={12}
              />
              <YAxis allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
              />
              <Bar
                dataKey="registrations"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              <Bar dataKey="paid" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Revenue Trend */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Monthly Revenue & Registrations
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                }}
                formatter={(value, name) => [
                  name === "revenue" ? `৳${value}` : value,
                  name === "revenue"
                    ? "Revenue"
                    : name === "registrations"
                    ? "Registrations"
                    : "Confirmed",
                ]}
              />
              <Bar
                yAxisId="right"
                dataKey="registrations"
                fill="#3b82f6"
                radius={[2, 2, 0, 0]}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={3}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="confirmed"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Location Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Camps by Location
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={locationStats}
                dataKey="camps"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                label={({ name, value, percent }) =>
                  `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                }
                labelLine={false}
              >
                {locationStats.map((entry, index) => (
                  <Cell
                    key={`location-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} camps`, "Total Camps"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Status Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Payment Status Overview
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={paymentDistribution}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={({ status, value, percent }) =>
                  `${
                    status.charAt(0).toUpperCase() + status.slice(1)
                  }: ${value} (${(percent * 100).toFixed(1)}%)`
                }
              >
                {paymentDistribution.map((entry, index) => (
                  <Cell
                    key={`payment-${index}`}
                    fill={
                      entry.status === "paid"
                        ? "#10b981"
                        : entry.status === "pending"
                        ? "#f59e0b"
                        : entry.status === "failed"
                        ? "#ef4444"
                        : "#6b7280"
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminAnalytics;

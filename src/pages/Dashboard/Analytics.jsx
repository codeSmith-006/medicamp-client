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
} from "recharts";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../Hooks/AxiousSecure";
import { motion } from "framer-motion";
import AOS from "aos";
import { Calendar, DollarSign, Users } from "lucide-react";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#6366f1", "#ec4899"];

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white p-4 rounded-xl shadow-lg flex items-center space-x-4">
    <Icon className={`w-8 h-8 ${color}`} />
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const ParticipantAnalytics = ({ userEmail }) => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const { register, watch } = useForm();
  const filterDate = watch("filterDate");

  const { data: registrations = [], isLoading } = useQuery({
    queryKey: ["participant-analytics", userEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered-participant?email=${userEmail}`);
      return res.data;
    },
  });

  // Only count paid registrations
  const paidRegistrations = useMemo(
    () => registrations.filter((r) => r.paymentStatus === "paid"),
    [registrations]
  );

  // Optional: filter by date
  const filteredData = useMemo(() => {
    if (!filterDate) return paidRegistrations;
    return paidRegistrations.filter((r) =>
      new Date(r.registeredAt).toISOString().startsWith(filterDate)
    );
  }, [paidRegistrations, filterDate]);

  const totalCamps = filteredData.length;
  const totalFees = filteredData.reduce((sum, r) => sum + (r.campFees || 0), 0);

  const campStats = useMemo(() => {
    const map = {};
    filteredData.forEach((r) => {
      const name = r.campName;
      if (!map[name]) {
        map[name] = { name, count: 0, fee: 0 };
      }
      map[name].count += 1;
      map[name].fee += r.campFees || 0;
    });
    return Object.values(map);
  }, [filteredData]);

  const activityTimeline = useMemo(() => {
    const map = {};
    filteredData.forEach((r) => {
      const date = new Date(r.registeredAt).toISOString().split("T")[0];
      if (!map[date]) map[date] = 0;
      map[date] += 1;
    });
    return Object.entries(map).map(([date, count]) => ({ date, count }));
  }, [filteredData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 px-4 md:px-8 py-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">📊 Your Camp Analytics</h2>
        <input
          type="date"
          {...register("filterDate")}
          className="border rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Camps Joined" value={totalCamps} icon={Users} color="text-blue-500" />
        <StatCard title="Total Fees Paid" value={`৳${totalFees}`} icon={DollarSign} color="text-green-500" />
        <StatCard title="Active Days" value={activityTimeline.length} icon={Calendar} color="text-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Camp-wise Registrations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Fees per Camp</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={campStats}
                dataKey="fee"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                label
              >
                {campStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Registration Activity Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={activityTimeline}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#10b981" fill="#bbf7d0" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ParticipantAnalytics;

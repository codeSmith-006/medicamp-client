import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, Calendar, DollarSign, Star } from "lucide-react";
import StatCard from "./StatCard";
// import StatCard from '../components/StatCard';

const Analytics = () => {
  const analyticsData = [
    { month: "Jan", participants: 45, revenue: 15000 },
    { month: "Feb", participants: 52, revenue: 18000 },
    { month: "Mar", participants: 48, revenue: 16500 },
    { month: "Apr", participants: 61, revenue: 22000 },
    { month: "May", participants: 55, revenue: 19500 },
    { month: "Jun", participants: 67, revenue: 24000 },
  ];

  const campData = [
    { name: "Summer Adventure", value: 35, color: "#3b82f6" },
    { name: "Sports Camp", value: 28, color: "#10b981" },
    { name: "Arts & Crafts", value: 22, color: "#f59e0b" },
    { name: "STEM Camp", value: 15, color: "#ef4444" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">
          Analytics Dashboard
        </h2>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Participants"
          value="142"
          icon={Users}
          color="text-blue-500"
          trend="+12% from last month"
        />
        <StatCard
          title="Active Camps"
          value="8"
          icon={Calendar}
          color="text-green-500"
          trend="+2 new camps"
        />
        <StatCard
          title="Revenue"
          value="$24,500"
          icon={DollarSign}
          color="text-purple-500"
          trend="+18% increase"
        />
        <StatCard
          title="Satisfaction"
          value="4.8/5"
          icon={Star}
          color="text-orange-500"
          trend="Excellent rating"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Monthly Participation
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="participants"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Camp Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={campData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {campData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {campData.map((camp, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-2`}
                    style={{ backgroundColor: camp.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{camp.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-800">
                  {camp.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;

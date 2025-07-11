import React from "react";
import { NavLink } from "react-router-dom";
import { X, Users, Calendar, CreditCard, TrendingUp } from "lucide-react";
import useCurrentUser from "../../Hooks/useController";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { currentUser, isLoading: userLoading } = useCurrentUser();
  console.log("Current user: ", currentUser, "Loading: ", userLoading);
  const sidebarItems = [
    // For user
    ...(currentUser?.role === "user"
      ? [
          {
            id: "analytics",
            path: "/dashboard/participants/analytics",
            icon: TrendingUp,
            label: "Analytics",
            color: "text-blue-500",
          },
          {
            id: "camps",
            path: "/dashboard/camps",
            icon: Calendar,
            label: "Registered Camps",
            color: "text-purple-500",
          },
          {
            id: "payments",
            path: "/dashboard/payments",
            icon: CreditCard,
            label: "Payment History",
            color: "text-orange-500",
          },
        ]
      : []),
    // currentUser?.role == "admin" ? "organizer" : "participants"

    // For both
    {
      id: "participants",
      path: `/dashboard/${
        currentUser?.role == "admin" ? "organizer" : "participants"
      }/profile`,
      icon: Users,
      label: "Participant Profile",
      color: "text-green-500",
    },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">CampDash</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-5 h-5 mr-3 ${
                      isActive ? item.color : "text-gray-500"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  X,
  Users,
  Calendar,
  CreditCard,
  TrendingUp,
  User,
  PlusCircle,
  ClipboardList,
} from "lucide-react";
import useCurrentUser from "../../Hooks/useController";
import AuthContext from "../../Context/AuthContext";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { isDarkMode } = useContext(AuthContext);
  const { currentUser } = useCurrentUser();

  const sidebarItems = [
    {
      id: "profile",
      path: `/dashboard/${
        currentUser?.role === "admin" ? "organizer" : "participants"
      }/profile`,
      icon: User,
      label: "Profile",
      color: "text-green-500",
    },
    ...(currentUser?.role === "user"
      ? [
          {
            id: "analytics",
            path: "/dashboard/participants/analytics",
            icon: TrendingUp,
            label: "Analytics",
            color: "text-blue-400",
          },
          {
            id: "camps",
            path: "/dashboard/participants/camps",
            icon: Calendar,
            label: "Registered Camps",
            color: "text-purple-500",
          },
          {
            id: "payments",
            path: "/dashboard/participants/payments",
            icon: CreditCard,
            label: "Payment History",
            color: "text-orange-500",
          },
        ]
      : []),
    ...(currentUser?.role === "admin"
      ? [
          {
            id: "analytics",
            path: "/dashboard/organizer/analytics",
            icon: TrendingUp,
            label: "Analytics",
            color: "text-blue-400",
          },
          {
            id: "addCamp",
            path: "/dashboard/organizer/add-camp",
            icon: PlusCircle,
            label: "Add A Camp",
            color: "text-blue-600",
          },
          {
            id: "manageCamps",
            path: "/dashboard/organizer/manage-camps",
            icon: ClipboardList,
            label: "Manage Camps",
            color: "text-purple-600",
          },
          {
            id: "registeredCamps",
            path: "/dashboard/organizer/registered-camps",
            icon: Users,
            label: "Manage Registered Camps",
            color: "text-teal-600",
          },
        ]
      : []),
  ];

  return (
    <>
      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          isDarkMode ? "bg-slate-800 text-slate-100" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className={`flex items-center justify-between p-6 border-b ${
              isDarkMode ? "border-slate-600" : "border-gray-100"
            }`}
          >
            <h1
              className={`text-2xl font-bold ${
                isDarkMode ? "text-slate-100" : "text-gray-800"
              }`}
            >
              CampDash
            </h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
              }`}
              aria-label="Close sidebar"
            >
              <X
                className={`${
                  isDarkMode ? "text-slate-400" : "text-gray-600"
                } w-5 h-5`}
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-1">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-500 border-r-2 border-blue-500 shadow-sm"
                      : isDarkMode
                      ? "text-slate-100 hover:bg-slate-700 hover:text-slate-50"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`flex-shrink-0 w-5 h-5 mr-3 transition-colors ${
                        isActive
                          ? item.color
                          : isDarkMode
                          ? "text-slate-400"
                          : "text-gray-400 group-hover:text-gray-600"
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div
            className={`p-6 border-t ${
              isDarkMode ? "border-slate-600" : "border-gray-100"
            }`}
          >
            <div
              className={`text-xs ${
                isDarkMode ? "text-slate-400" : "text-gray-500"
              } text-center`}
            >
              Dashboard v1.0
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

import React from "react";
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

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { currentUser, isLoading: userLoading } = useCurrentUser();
  // console.log("Current user: ", currentUser, "Loading: ", userLoading);

  const sidebarItems = [
    // Shared (if any)
    {
      id: "profile",
      path: `/dashboard/${
        currentUser?.role == "admin" ? "organizer" : "participants"
      }/profile`,
      icon: User,
      label: "Profile",
      color: "text-green-500",
    },

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

    // For organizer (admin)
    ...(currentUser?.role === "admin"
      ? [
          {
            id: "analytics",
            path: "/dashboard/organizer/analytics",
            icon: TrendingUp,
            label: "Analytics",
            color: "text-blue-500",
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
      {/* Backdrop/Overlay - Shows when sidebar is open on ALL screen sizes */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Same collapsible behavior for ALL screen sizes */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800">CampDash</h1>
            {/* Close button - visible on ALL screens */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-1">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => {
                  // Auto-close sidebar after clicking any link (ALL screen sizes)
                  setSidebarOpen(false);
                }}
                className={({ isActive }) =>
                  `group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700 shadow-sm"
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
          <div className="p-6 border-t border-gray-100">
            <div className="text-xs text-gray-500 text-center">
              Dashboard v1.0
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

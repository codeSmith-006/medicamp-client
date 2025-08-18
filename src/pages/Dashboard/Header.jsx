import React, { useContext } from "react";
import { Menu } from "lucide-react";
import axiosSecure from "../../Hooks/AxiousSecure";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../Context/AuthContext";
import LoadingSpinner from "../../Component/LoadingSpinner/LoadingSpinner";

const fetchCurrentUser = async () => {
  const res = await axiosSecure.get("/users");
  return res.data;
};

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, authLoading, isDarkMode } = useContext(AuthContext);

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    enabled: !!user?.email && !authLoading,
  });

  if (authLoading || isLoading)
    return (
      <div
        className={`w-full flex justify-center items-center p-4 ${
          isDarkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        <LoadingSpinner />
      </div>
    );

  return (
    <header
      className={`flex items-center justify-between px-6 py-4 shadow-sm border-b transition-colors duration-300 ${
        isDarkMode
          ? "bg-slate-800 border-slate-600 text-slate-100"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      {/* Sidebar toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`p-2 rounded-lg transition-colors duration-200 ${
          isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
        }`}
      >
        <Menu
          className={`${
            isDarkMode ? "text-slate-100" : "text-gray-800"
          } w-5 h-5`}
        />
      </button>

      {/* Placeholder for right side items */}
      <div className="flex items-center space-x-4">
        {/* You can add profile/avatar buttons here */}
      </div>
    </header>
  );
};

export default Header;

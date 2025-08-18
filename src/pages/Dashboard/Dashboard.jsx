import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Navbar from "../../Component/Navbar/Navbar";
import LoadingSpinner from "../../Component/LoadingSpinner/LoadingSpinner";
import useCurrentUser from "../../Hooks/useController";
import AuthContext from "../../Context/AuthContext";
import { Helmet } from "react-helmet-async";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { user, authLoading, isDarkMode } = useContext(AuthContext);
  const { currentUser, isLoading } = useCurrentUser();

  // Redirect to login if user is logged out
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/join-us");
    }
  }, [authLoading, user, navigate]);

  // Loading state
  if (authLoading || isLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-slate-900" : "bg-gray-50"
        }`}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 ${
        isDarkMode ? "bg-slate-900 text-slate-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Helmet>
        <title>Dashboard | MCMS</title>
      </Helmet>

      <Navbar isDarkMode={isDarkMode} />

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isDarkMode={isDarkMode}
      />

      <div
        className={`transition-all duration-300 pt-16 relative ${
          sidebarOpen ? "lg:ml-64" : "ml-0"
        }`}
      >
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isDarkMode={isDarkMode}
        />
        <main
          className={`p-6 transition-colors duration-300 ${
            isDarkMode
              ? "bg-slate-900 text-slate-100"
              : "bg-gray-50 text-gray-900"
          }`}
        >
          <Outlet>{children}</Outlet>
        </main>
      </div>
    </div>
  );
};

export default Layout;

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
  const { user, authLoading } = useContext(AuthContext); // 👈 Firebase auth state
  const { currentUser, isLoading } = useCurrentUser(); // 👈 DB user info

  // 🔁 Redirect to login if user is logged out (auth state)
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/join-us");
    }
  }, [authLoading, user, navigate]);

  // 🔄 While Firebase is checking auth OR DB is fetching user role
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gray-50 relative">
      <Helmet>
        <title>Dashboard | MCMS</title>
      </Helmet>
      <Navbar />

      {/* Backdrop first */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar above the backdrop */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`transition-all duration-300 pt-16 relative ${
          sidebarOpen ? "lg:ml-64" : "ml-0"
        }`}
      >
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="p-6">
          <Outlet>{children}</Outlet>
        </main>
      </div>
    </div>
  );
};

export default Layout;

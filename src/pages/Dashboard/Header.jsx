import React, { useContext } from "react";
import { Menu } from "lucide-react";
import axiosSecure from "../../Hooks/AxiousSecure";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../Context/AuthContext"; // ✅ import context
import LoadingSpinner from "../../Component/LoadingSpinner/LoadingSpinner";
// import LoadingSpinner from "../LoadingSpinner"; // optional spinner

const fetchCurrentUser = async () => {
  const res = await axiosSecure.get("/users");
  return res.data;
};

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, authLoading } = useContext(AuthContext); // ✅ get auth info

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    enabled: !!user?.email && !authLoading, // ✅ wait until auth is ready
  });

  if (authLoading || isLoading) return <LoadingSpinner />;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-4">

        </div>
      </div>
    </header>
  );
};

export default Header;

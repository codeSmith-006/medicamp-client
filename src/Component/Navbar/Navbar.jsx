import React, { use, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import {
  DownOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import JoinUsButton from "../JoinUsButton/JoinUsButton";
import AnimatedLink from "./AnimatedLink";
import "./active.css";
import logo from "../../assets/CareCamp logo.png";
import AuthContext from "../../Context/AuthContext";
import axiosSecure from "../../Hooks/AxiousSecure";
import { useQuery } from "@tanstack/react-query";
import DarkModeToggle from "react-dark-mode-toggle";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, authLoading, setIsDarkMode, isDarkMode } =
    use(AuthContext);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const menuVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
  };

  const onLogout = async () => {
    logout();
  };

  // Fetch user info from API using React Query
  const { data: dbUser, isLoading: userLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  console.log("current user: ", dbUser);

  const dropdownItems = [
    {
      key: "1",
      label: (
        <div>
          <p className="font-semibold">{dbUser?.name || user?.displayName}</p>
          <p className="text-xs text-gray-400">{dbUser?.role || "User"}</p>
        </div>
      ),
      disabled: true,
    },
    { type: "divider" },
    {
      key: "2",
      label: (
        <Link to="/dashboard" className="flex items-center gap-2">
          Dashboard
        </Link>
      ),
      icon: <DashboardOutlined />,
      extra: "⌘D",
    },
    { type: "divider" },
    {
      key: "5",
      label: (
        <span onClick={onLogout} className="text-red-500">
          Logout
        </span>
      ),
      icon: <LogoutOutlined onClick={onLogout} />,
      extra: "⌘L",
    },
  ];

  console.log("current user: ", user);

  return (
    <div className="bg-gradient-to-r from-[#101828] via-[#1A2235] to-[#2A334D] shadow-md fixed top-0 left-0 w-full z-50">
      <div className="navbar justify-between px-4 lg:px-8">
        {/* Logo + Site Name */}
        <div className="flex items-center gap-1 md:gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-primary"
          >
            <img src={logo} alt="logo" className="w-8 h-8" />
            <span className="text-2xl font-extrabold bg-gradient-to-r from-[#5FACFE] via-[#24A7E8] to-[#46C1E1] bg-clip-text text-transparent tracking-wide drop-shadow-md">
              MediCamp
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <DarkModeToggle
              onChange={setIsDarkMode}
              checked={isDarkMode}
              size={40}
            />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden text-black md:text-white lg:flex items-center gap-6">
          <AnimatedLink to="/">Home</AnimatedLink>
          <AnimatedLink to="/about">About</AnimatedLink>
          <AnimatedLink to="/available-camps">Available Camps</AnimatedLink>

          {authLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : !user ? (
            ""
          ) : (
            <AnimatedLink
              to={
                user?.email === "ryan@admin2.com"
                  ? "/dashboard/organizer/profile"
                  : "/dashboard/participants/profile"
              }
            >
              Profile
            </AnimatedLink>
          )}

          {authLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : !user ? (
            ""
          ) : (
            <AnimatedLink
              to={
                user?.email === "ryan@admin2.com"
                  ? "/dashboard/organizer/manage-camps"
                  : "/dashboard/participants/camps"
              }
            >
              {user?.email === "ryan@admin2.com"
                ? "Manage Camps"
                : "My Registrations"}
            </AnimatedLink>
          )}

          {authLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : !user ? (
            <JoinUsButton />
          ) : (
            <div className="relative">
              <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
                <a
                  onClick={(e) => e.preventDefault()}
                  className="cursor-pointer"
                >
                  <Space className="flex items-center gap-2">
                    <img
                      src={dbUser?.photoUrl || user?.photoURL}
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col items-start text-white">
                      <span className="text-sm font-medium">
                        {userLoading
                          ? "Loading..."
                          : dbUser?.name || user.displayName}
                      </span>
                      <span className="text-xs text-gray-300">
                        {dbUser?.role || "User"}
                      </span>
                    </div>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="btn btn-circle bg-none text-2xl"
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden bg-base-100 w-full px-6 py-4 flex flex-col gap-4 shadow-md"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <AnimatedLink to="/">Home</AnimatedLink>
            <AnimatedLink to="/about">About</AnimatedLink>
            <AnimatedLink to="/available-camps">Available Camps</AnimatedLink>
            {authLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : !user ? (
              ""
            ) : (
              <AnimatedLink
                to={
                  user?.email === "ryan@admin2.com"
                    ? "/dashboard/organizer/manage-camps"
                    : "/dashboard/participants/camps"
                }
              >
                {user?.email === "ryan@admin2.com"
                  ? "Manage Camps"
                  : "My Registrations"}
              </AnimatedLink>
            )}
            {authLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : !user ? (
              ""
            ) : (
              <AnimatedLink
                to={
                  user?.email === "ryan@admin2.com"
                    ? "/dashboard/organizer/profile"
                    : "/dashboard/participants/profile"
                }
              >
                Profile
              </AnimatedLink>
            )}
            {!user ? (
              <JoinUsButton />
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {userLoading
                        ? "Loading..."
                        : dbUser?.name || user.displayName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {dbUser?.role || "User"}
                    </span>
                  </div>
                </div>
                <Link to="/dashboard" className="btn btn-ghost text-left">
                  Dashboard
                </Link>
                <button
                  onClick={onLogout}
                  className="btn btn-error btn-sm w-full"
                >
                  Logout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

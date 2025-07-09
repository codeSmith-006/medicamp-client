import React, { use, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import {
  DownOutlined,
  SettingOutlined,
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import JoinUsButton from "../JoinUsButton/JoinUsButton";
import AnimatedLink from "./AnimatedLink";
import "./active.css";
import logo from "../../assets/CareCamp logo.png";
import AuthContext from "../../Context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, authLoading } = use(AuthContext);
  console.log("User: ", user);

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

  // handle logout
  const onLogout = async () => {
    logout();
  };

  // Ant Design dropdown menu items
  const dropdownItems = [
    {
      key: "1",
      label: user?.displayName || "User",
      disabled: true,
    },
    {
      type: "divider",
    },
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
    {
      type: "divider",
    },
    {
      key: "5",
      label: (
        <span onClick={onLogout} className="text-red-500">
          Logout
        </span>
      ),
      icon: <LogoutOutlined />,
      extra: "⌘L",
    },
  ];

  return (
    <div className="bg-transparent shadow-md fixed top-0 left-0 w-full z-50">
      <div className="navbar px-4 lg:px-8">
        {/* Logo + Site Name */}
        <div className="flex-1">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-primary"
          >
            <img src={logo} alt="logo" className="w-8 h-8" />
            <span
              className="text-2xl font-extrabold bg-gradient-to-r from-[#5FACFE] via-[#24A7E8] to-[#46C1E1] 
             bg-clip-text text-transparent tracking-wide drop-shadow-md"
            >
              MediCamp
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden text-white lg:flex items-center gap-6">
          <AnimatedLink to="/">Home</AnimatedLink>
          <AnimatedLink to="/camps">Available Camps</AnimatedLink>
          {authLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : !user ? (
            <JoinUsButton></JoinUsButton>
          ) : (
            <div className="relative">
              <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
                <a
                  onClick={(e) => e.preventDefault()}
                  className="cursor-pointer"
                >
                  <Space className="flex items-center gap-2">
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="text-sm font-medium">
                      {user.displayName}
                    </span>
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
            className="btn btn-ghost btn-circle text-2xl"
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
            <AnimatedLink to="/camps">Available Camps</AnimatedLink>

            {!user ? (
              <JoinUsButton></JoinUsButton>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-sm font-medium">{user.displayName}</p>
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

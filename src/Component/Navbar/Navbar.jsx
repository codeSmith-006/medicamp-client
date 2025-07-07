import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import JoinUsButton from "../JoinUsButton/JoinUsButton";
import AnimatedLink from "./AnimatedLink";
import "./active.css";
import logo from "../../assets/CareCamp logo.png";

const Navbar = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const menuVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="bg-base-100 shadow-md fixed top-0 left-0 w-full z-50">
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
              CampCare
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <AnimatedLink to="/">Home</AnimatedLink>
          <AnimatedLink to="/camps">Available Camps</AnimatedLink>
          {!user ? (
            <JoinUsButton></JoinUsButton>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
              {/* Dropdown */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-4 z-50"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={menuVariants}
                  >
                    <p className="font-medium text-sm text-gray-700 mb-2">
                      {user.displayName}
                    </p>
                    <Link
                      to="/dashboard"
                      className="block text-sm py-1 hover:text-primary"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={onLogout}
                      className="btn btn-sm btn-error mt-2 w-full"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
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

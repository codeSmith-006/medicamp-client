import React from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
  TeamOutlined,
  DollarOutlined,
  StarFilled,
  HeartOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const CampCard = ({ camp }) => {
  const {
    _id,
    campName,
    image,
    campFees,
    dateTime,
    location,
    healthcareProfessional,
    participantCount,
  } = camp;

  const formattedDate = dayjs(dateTime).format("MMMM D, YYYY – h:mm A");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative bg-white rounded-2xl shadow-lg p-0 overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:scale-[1.015]"
    >
      {/* Top section with image */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={image || "https://via.placeholder.com/400x250?text=No+Image"}
          alt={campName}
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/400x250?text=No+Image")
          }
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Info section */}
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800 leading-tight">
          {campName}
        </h2>

        <div className="flex flex-col items-start gap-2 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <EnvironmentOutlined />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarOutlined />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <UserOutlined />
            <span>{healthcareProfessional}</span>
          </div>

          <div className="flex items-center gap-2">
            <TeamOutlined />
            <span>{participantCount} Participants</span>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs text-green-600">Consultation Fees</p>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-green-600">
              {campFees > 0 ? `৳${campFees}` : "Free"}
            </p>
            <NavLink
              to={`camps/${_id}`}
              className="bg-blue-400 text-white px-4 py-2 text-sm rounded-full font-semibold hover:bg-blue-500 transition-all"
            >
              View Details
            </NavLink>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CampCard;

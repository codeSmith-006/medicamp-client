import React, { useState, useContext } from "react";
import { Input, Select, Spin, Button } from "antd";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../Hooks/AxiousSecure";
import CampCard from "./CampCard";
import { Grid, List } from "lucide-react";
import { Helmet } from "react-helmet-async";
import AuthContext from "../../Context/AuthContext";

const { Option } = Select;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const AvailableCamps = () => {
  const { isDarkMode } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [viewMode, setViewMode] = useState("grid3");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  const { data, isLoading } = useQuery({
    queryKey: ["available-camps", search, sort, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `https://medicamp-server-jth3.onrender.com/camps?search=${search}&sort=${sort}&page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
  });

  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setCurrentPage(1);
  };

  const handleViewToggle = () => {
    setViewMode((prev) => (prev === "grid3" ? "grid2" : "grid3"));
  };

  return (
    <motion.div
      className={`max-w-7xl mx-auto px-4 pt-26 pb-10 transition-colors duration-300 ${
        isDarkMode ? "bg-slate-900 text-slate-200" : "bg-gray-50 text-gray-800"
      }`}
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <Helmet>
        <title>Available Camps | MCMS</title>
      </Helmet>

      {/* Header */}
      <div className="mb-10 text-center">
        <h2
          className={`${
            isDarkMode ? "text-slate-100" : "text-black"
          } text-4xl font-bold`}
        >
          Available Medical Camps
        </h2>
        <p
          className={`${isDarkMode ? "text-slate-400" : "text-gray-500"} mt-2`}
        >
          Browse upcoming health camps and join the one best suited to you.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <Input
          placeholder="Search by name, date, location or doctor..."
          value={search}
          onChange={handleSearchChange}
          size="large"
          className={`md:w-1/2 transition-colors duration-300 ${
            isDarkMode
              ? "bg-[#2F2F2F] text-slate-200 border-gray-600 placeholder-slate-400"
              : "bg-white text-gray-800 border-gray-300 placeholder-gray-500"
          }`}
        />

        <div className="flex items-center gap-2">
          <Select
            value={sort || undefined}
            onChange={handleSortChange}
            placeholder="Sort by..."
            size="large"
            className={`min-w-[180px] transition-colors duration-300 ${
              isDarkMode ? "bg-[#2F2F2F] text-slate-200 border-gray-600" : ""
            }`}
            dropdownClassName={`${
              isDarkMode ? "bg-[#2F2F2F] text-slate-200" : ""
            }`}
          >
            <Option value="participant">Most Registered</Option>
            <Option value="feesLow">Fees: Low to High</Option>
            <Option value="feesHigh">Fees: High to Low</Option>
            <Option value="name">Alphabetical</Option>
          </Select>

          <Button
            icon={
              viewMode === "grid3" ? <Grid size={18} /> : <List size={18} />
            }
          />
        </div>
      </div>

      {/* Camps Display */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spin size="large" />
        </div>
      ) : data?.result?.length === 0 ? (
        <p
          className={`${
            isDarkMode ? "text-slate-400" : "text-gray-500"
          } text-center mt-10`}
        >
          No camps found matching your criteria.
        </p>
      ) : (
        <motion.div
          className={`grid gap-6 ${
            viewMode === "grid3"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {data?.result?.map((camp) => (
            <CampCard key={camp._id} camp={camp} isDarkMode={isDarkMode} />
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-3">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-lg px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default AvailableCamps;

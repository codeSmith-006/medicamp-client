import React, { useEffect, useState, useMemo } from "react";
import { Input, Select, Spin, Button } from "antd";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import CampCard from "./CampCard"; // Assume this is prebuilt
import { Grid, List } from "lucide-react";
import CampCard from "./CampCard";
import axiosSecure from "../../Hooks/AxiousSecure";

const { Option } = Select;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const AvailableCamps = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [viewMode, setViewMode] = useState("grid3");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["available-camps", search, sort, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:5000/camps?search=${search}&sort=${sort}&page=${currentPage}&limit=${limit}`
      );
      console.log("response: ", res.data)
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
      className="max-w-7xl mx-auto px-4 pt-26 pb-10"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-indigo-700">
          🏥 Available Medical Camps
        </h2>
        <p className="text-gray-600 mt-2">
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
          className="md:w-1/2"
        />

        <div className="flex items-center gap-2">
          <Select
            value={sort || undefined}
            onChange={handleSortChange}
            placeholder="Sort by..."
            size="large"
            className="min-w-[180px]"
          >
            <Option value="participant">Most Registered</Option>
            <Option value="feesLow">Fees: Low to High</Option>
            <Option value="feesHigh">Fees: High to Low</Option>
            <Option value="name">Alphabetical</Option>
          </Select>

          <Button
            icon={viewMode === "grid3" ? <Grid size={18} /> : <List size={18} />}
            onClick={handleViewToggle}
          />
        </div>
      </div>

      {/* Camps Display */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spin size="large" />
        </div>
      ) : data?.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No camps found matching your criteria.
        </p>
      ) : (
        <motion.div
          className={`grid gap-6 ${
            viewMode === "grid3" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {data?.map((camp) => (
            <CampCard key={camp._id} camp={camp} />
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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

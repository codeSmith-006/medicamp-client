import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Input, Table, Spin, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  TableOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  UserOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import UpdateCampModal from "./UpdateCampModal";
import useCurrentUser from "../../Hooks/useController";
import { Helmet } from "react-helmet-async";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 },
};

const ManageCamps = () => {
  const { currentUser } = useCurrentUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // default for desktop
  const itemsPerPage = 5;

  // Update viewMode on resize (force grid on mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setViewMode("grid");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    data = { result: [], total: 0 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["organizer-camps", currentUser?.email, searchTerm, currentPage],
    queryFn: async () => {
      const url = `https://medicamp-server-jth3.onrender.com/camps?search=${encodeURIComponent(
        searchTerm
      )}&page=${currentPage}&limit=${itemsPerPage}`;
      const res = await axios.get(url);
      return res.data;
    },
    enabled: !!currentUser?.email,
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the camp.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://medicamp-server-jth3.onrender.com/camps/${id}`
        );
        toast.success("Camp deleted successfully");
        refetch();
      } catch (err) {
        toast.error("Failed to delete the camp");
      }
    }
  };

  const columns = [
    { title: "Camp Name", dataIndex: "campName", key: "campName" },
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
      render: (text) => new Date(text).toLocaleString(),
    },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Healthcare Professional",
      dataIndex: "healthcareProfessional",
      key: "healthcareProfessional",
    },
    {
      title: "Participants",
      dataIndex: "participantCount",
      key: "participantCount",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedCamp(record);
              setIsModalOpen(true);
            }}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      className="max-w-6xl mx-auto p-4 mt-10"
    >
      <Helmet>
        <title>Manage Camp | Dashboard | MCMS</title>
      </Helmet>

      {/* Heading & Toggle */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-6">
        <h2 className="text-3xl font-semibold text-indigo-700">
          📋 Manage Your Camps
        </h2>

        {/* Toggle button only for md+ */}
        <div className="hidden md:block">
          <Button
            type="default"
            icon={
              viewMode === "table" ? <AppstoreOutlined /> : <TableOutlined />
            }
            onClick={() =>
              setViewMode((prev) => (prev === "table" ? "grid" : "table"))
            }
          >
            {viewMode === "table" ? "Grid View" : "Table View"}
          </Button>
        </div>
      </div>

      {/* Search */}
      <Input
        size="large"
        placeholder="Search by name, location or doctor..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4"
      />

      {/* Data Display */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : data.result.length === 0 ? (
        <p className="text-center text-gray-500">No camps found.</p>
      ) : viewMode === "table" && window.innerWidth >= 768 ? (
        <Table
          dataSource={data.result}
          columns={columns}
          rowKey="_id"
          pagination={false}
          bordered
          className="rounded-lg shadow-lg overflow-x-auto"
        />
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.result.map((camp, index) => (
            <motion.div
              key={camp._id}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200"
            >
              <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-50 rounded-md">
                      <MedicineBoxOutlined className="text-indigo-600 text-base" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                      {camp.campName}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 p-2.5 bg-blue-50 rounded-md">
                    <CalendarOutlined className="text-blue-600 text-base flex-shrink-0" />
                    <div>
                      <p className="text-xs text-blue-800 font-medium">
                        Date & Time
                      </p>
                      <p className="text-blue-700 font-semibold text-sm">
                        {new Date(camp.dateTime).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-blue-600 text-xs">
                        {new Date(camp.dateTime).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 bg-green-50 rounded-md">
                    <EnvironmentOutlined className="text-green-600 text-base flex-shrink-0" />
                    <div>
                      <p className="text-xs text-green-800 font-medium">
                        Location
                      </p>
                      <p className="text-green-700 font-semibold text-sm line-clamp-2">
                        {camp.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 bg-purple-50 rounded-md">
                    <UserOutlined className="text-purple-600 text-base flex-shrink-0" />
                    <div>
                      <p className="text-xs text-purple-800 font-medium">
                        Healthcare Professional
                      </p>
                      <p className="text-purple-700 font-semibold text-sm line-clamp-2">
                        {camp.healthcareProfessional}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 bg-orange-50 rounded-md">
                    <TeamOutlined className="text-orange-600 text-base flex-shrink-0" />
                    <div>
                      <p className="text-xs text-orange-800 font-medium">
                        Registered Participants
                      </p>
                      <p className="text-orange-700 font-bold text-xl">
                        {camp.participantCount}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => {
                      setSelectedCamp(camp);
                      setIsModalOpen(true);
                    }}
                    className="flex-1 h-9 bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 rounded-md font-medium shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    Edit
                  </Button>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(camp._id)}
                    className="h-9 px-3 rounded-md font-medium shadow-sm hover:shadow-md transition-all duration-200"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data.total > itemsPerPage && (
        <div className="flex justify-center mt-8 gap-2">
          <Button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-6 h-10 rounded-lg font-medium"
          >
            Previous
          </Button>
          <span className="px-6 py-2 text-lg font-medium text-gray-600 bg-gray-50 rounded-lg">
            Page {currentPage} of {Math.ceil(data.total / itemsPerPage)}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(p + 1, Math.ceil(data.total / itemsPerPage))
              )
            }
            disabled={currentPage === Math.ceil(data.total / itemsPerPage)}
            className="px-6 h-10 rounded-lg font-medium"
          >
            Next
          </Button>
        </div>
      )}

      {/* Update Modal */}
      {isModalOpen && selectedCamp && (
        <UpdateCampModal
          camp={selectedCamp}
          onClose={() => setIsModalOpen(false)}
          onUpdated={() => {
            refetch();
            toast.success("Camp updated successfully");
          }}
        />
      )}
    </motion.div>
  );
};

export default ManageCamps;

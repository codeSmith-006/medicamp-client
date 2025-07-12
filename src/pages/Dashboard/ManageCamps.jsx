import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Input, Table, Spin, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import UpdateCampModal from "./UpdateCampModal"; // Create separately
// import useAuth from "../../Hooks/useAuth";
import UpdateCampModal from "./UpdateCampModal";
import useCurrentUser from "../../Hooks/useController";
import axiosSecure from "../../Hooks/AxiousSecure";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const ManageCamps = () => {
  const { currentUser } = useCurrentUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("enable: ", currentUser)

  const {
    data: camps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["organizer-camps", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`camps`);
      return res.data;
    },
    enabled: !!currentUser?.email,
  });
  console.log("loading: ", isLoading)
  console.log("camp data: ", camps);
  const filteredCamps = useMemo(() => {
    return camps.filter(
      (camp) =>
        camp.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        camp.healthcareProfessional
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [camps, searchTerm]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredCamps.length / itemsPerPage);
  const paginatedCamps = filteredCamps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        await axios.delete(`http://localhost:5000/camps/${id}`);
        toast.success("Camp deleted successfully");
        refetch();
      } catch (err) {
        toast.error("Failed to delete the camp");
      }
    }
  };

  const columns = [
    {
      title: "Camp Name",
      dataIndex: "campName",
      key: "campName",
    },
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
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
      <h2 className="text-3xl font-semibold text-indigo-700 mb-6">
        📋 Manage Your Camps
      </h2>

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

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : filteredCamps.length === 0 ? (
        <p className="text-center text-gray-500">No camps found.</p>
      ) : (
        <Table
          dataSource={paginatedCamps}
          columns={columns}
          rowKey="_id"
          pagination={false}
          bordered
          className="rounded-lg shadow-lg overflow-x-auto"
        />
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <Button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="px-4 py-2 text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* DaisyUI Modal for Update */}
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

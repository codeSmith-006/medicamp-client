import React, { useState } from "react";
import {
  Table,
  Button,
  Tag,
  Input,
  Modal,
  Space,
  message,
  Tooltip,
  Spin,
} from "antd";
import { useQuery } from "@tanstack/react-query";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axiosSecure from "../../Hooks/AxiousSecure";

// Simulated current organizer's email
const currentOrganizerEmail = "organizer@example.com"; // Replace with real user logic

const ManageRegisteredParticipants = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch participants using TanStack Query
  const {
    data: participants = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["registered-participants", currentOrganizerEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:5000/all-registered-participant?email=${currentOrganizerEmail}`
      );
      return res.data;
    },
  });

  // Filtered by search
  const filtered = participants.filter((item) =>
    `${item.campName} ${item.participantName} ${item.healthcareProfessional}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const handleConfirmStatus = async (record) => {
    if (record.paymentStatus !== "paid") return;

    try {
      await axios.patch(
        `http://localhost:5000/confirm-participant/${record._id}`
      );
      toast.success("Participant confirmed");
      refetch();
    } catch {
      toast.error("Confirmation failed");
    }
  };

  const handleCancel = async (id, isDisabled) => {
    if (isDisabled) return;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will cancel the participant's registration.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`http://localhost:5000/delete-registration/${id}`);
        toast.success("Registration cancelled");
        refetch();
      } catch {
        toast.error("Cancellation failed");
      }
    }
  };

  const columns = [
    {
      title: "Camp Name",
      dataIndex: "campName",
      key: "campName",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Fees (BDT)",
      dataIndex: "campFees",
      key: "campFees",
      render: (fee) => (fee === 0 ? "Free" : fee),
    },
    {
      title: "Participant",
      dataIndex: "participantName",
      key: "participantName",
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => (
        <Tag color={status === "paid" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Confirmation",
      dataIndex: "confirmationStatus",
      key: "confirmationStatus",
      render: (status, record) => (
        <Button
          size="small"
          type="default"
          disabled={record.paymentStatus !== "paid"}
          onClick={() => handleConfirmStatus(record)}
        >
          <Tag
            color={status === "confirmed" ? "blue" : "orange"}
            className="cursor-pointer"
          >
            {status}
          </Tag>
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const isCancelDisabled =
          record.paymentStatus === "paid" &&
          record.confirmationStatus === "confirmed";

        return (
          <Space>
            <Tooltip title="View Details">
              <Button
                icon={<EyeOutlined />}
                size="small"
                onClick={() => {
                  setSelectedParticipant(record);
                  setIsModalOpen(true);
                }}
              />
            </Tooltip>
            <Tooltip title="Cancel Registration">
              <Button
                danger
                size="small"
                disabled={isCancelDisabled}
                onClick={() => handleCancel(record._id, isCancelDisabled)}
              >
                Cancel
              </Button>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-600 text-center mt-20">Failed to load data.</p>;
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto mt-10 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          📋 Registered Participants
        </h2>
        <Input
          placeholder="Search by name, camp, doctor..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filtered}
        pagination={{
          current: currentPage,
          pageSize: 10,
          onChange: (page) => setCurrentPage(page),
        }}
        rowKey="_id"
        bordered
      />

      {/* Participant Detail Modal */}
      <Modal
        title={`Participant: ${selectedParticipant?.participantName}`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {selectedParticipant && (
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Email:</strong> {selectedParticipant.participantEmail}
            </p>
            <p>
              <strong>Phone:</strong> {selectedParticipant.phone}
            </p>
            <p>
              <strong>Gender:</strong> {selectedParticipant.gender}
            </p>
            <p>
              <strong>Emergency Contact:</strong>{" "}
              {selectedParticipant.emergencyContact}
            </p>
            <p>
              <strong>Registered At:</strong>{" "}
              {new Date(selectedParticipant.registeredAt).toLocaleString()}
            </p>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default ManageRegisteredParticipants;

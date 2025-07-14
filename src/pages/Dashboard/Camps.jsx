import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  Input,
  Button,
  Tag,
  Space,
  Modal,
  message,
  Rate,
  Form,
} from "antd";
import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import axiosSecure from "../../Hooks/AxiousSecure"; // your secure axios instance
import useStripePayment from "../../Hooks/useSriptePayment";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";

const { confirm } = Modal;

const RegisteredCamps = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [form] = Form.useForm();
  const { mutate: handlePayment } = useStripePayment();

  const queryClient = useQueryClient();

  const {
    data: registeredCamps = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["registeredCamps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/registered-participant");
      return res.data;
    },
  });

  console.log("Registered camps: ", registeredCamps);

  const filteredData = registeredCamps.filter((item) =>
    item.campName?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCancelRegistration = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will cancel your registration permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/cancel-registration-user/${id}`);
        toast.success("✅ Registration cancelled");
        queryClient.invalidateQueries({ queryKey: ["registeredCamps"] });

        // Optional SweetAlert success
        Swal.fire(
          "Cancelled!",
          "Your registration has been removed.",
          "success"
        );
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to cancel registration");
      }
    }
  };

  const handleOpenFeedback = (record) => {
    setSelectedCamp(record);
    form.resetFields();
    setFeedbackModalVisible(true);
  };

  const handleSubmitFeedback = async (values) => {
    try {
      const payload = {
        campId: selectedCamp.campId,
        feedback: values.feedback,
        rating: values.rating,
      };
      await axios.post("http://localhost:5000/feedback", payload);
      toast.success("Thank you for your feedback!");
      setFeedbackModalVisible(false);
    } catch (error) {
      toast.error("Failed to submit feedback");
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
      title: "Fees",
      dataIndex: "campFees",
      key: "campFees",
      render: (fee) => (fee === 0 ? "Free" : `BDT ${fee}`),
    },
    {
      title: "Participant",
      dataIndex: "participantName",
      key: "participantName",
    },
    {
      title: "Payment Status",
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
      render: (status) => (
        <Tag color={status === "confirmed" ? "blue" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          {record.paymentStatus === "unpaid" && (
            <Space>
              <Button
                type="primary"
                size="small"
                onClick={() =>
                  handlePayment({
                    campTitle: record.campName,
                    campId: record.campId,
                    amount: record.campFees,
                    userEmail: record.participantEmail,
                    userName: record.participantName,
                  })
                }
              >
                Pay
              </Button>
              <Button
                danger
                size="small"
                onClick={() => handleCancelRegistration(record._id)}
              >
                Cancel
              </Button>
            </Space>
          )}
          {record.paymentStatus === "paid" && (
            <Button
              size="small"
              className="bg-gray-200"
              onClick={() => handleOpenFeedback(record)}
            >
              Feedback
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <motion.div
      className="max-w-7xl mx-auto mt-10 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          📋 Registered Camps
        </h2>
        <Input
          placeholder="Search by camp name..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 250 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          current: currentPage,
          pageSize: 10,
          onChange: (page) => setCurrentPage(page),
        }}
        rowKey="_id"
        bordered
        loading={isLoading}
      />

      <Modal
        open={feedbackModalVisible}
        onCancel={() => setFeedbackModalVisible(false)}
        footer={null}
        title="Leave Feedback"
      >
        <Form layout="vertical" form={form} onFinish={handleSubmitFeedback}>
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: "Please provide a rating" }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            name="feedback"
            label="Feedback"
            rules={[{ required: true, message: "Feedback is required" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Write your feedback here..."
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" block>
              Submit Feedback
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default RegisteredCamps;

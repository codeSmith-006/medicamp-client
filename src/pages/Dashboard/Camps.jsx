import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  Input,
  Button,
  Tag,
  Space,
  Modal,
  Rate,
  Form,
  Spin,
} from "antd";
import {
  SearchOutlined,
  TableOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import axiosSecure from "../../Hooks/AxiousSecure"; // secure axios instance
import useStripePayment from "../../Hooks/useSriptePayment";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const RegisteredCamps = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [form] = Form.useForm();
  const { mutate: handlePayment } = useStripePayment();
  const queryClient = useQueryClient();

  // view mode: "grid" or "table"
  const [viewMode, setViewMode] = useState("grid");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setViewMode("grid");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const {
    data: registeredCamps = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["registeredCamps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/registered-participant");
      return res.data;
    },
  });

  const filteredData = registeredCamps.filter((item) => {
    const search = searchText.toLowerCase();
    return (
      item.campName?.toLowerCase().includes(search) ||
      item.participantName?.toLowerCase().includes(search)
    );
  });

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
        await axios.delete(
          `https://medicamp-server-jth3.onrender.com/cancel-registration-user/${id}`
        );
        toast.success("✅ Registration cancelled");
        queryClient.invalidateQueries({ queryKey: ["registeredCamps"] });
        Swal.fire(
          "Cancelled!",
          "Your registration has been removed.",
          "success"
        );
      } catch {
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
        participantName: selectedCamp?.participantName,
        participantEmail: selectedCamp?.participantEmail,
        campName: selectedCamp?.campName,
        campId: selectedCamp.campId,
        feedback: values.feedback,
        rating: values.rating,
      };
      await axios.post(
        "https://medicamp-server-jth3.onrender.com/feedback",
        payload
      );
      toast.success("Thank you for your feedback!");
      setFeedbackModalVisible(false);
    } catch {
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
            <>
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
            </>
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">Failed to load data.</p>
    );
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto mt-10 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Registered Camps | Dashboard | MCMS</title>
      </Helmet>

      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          📋 Registered Camps
        </h2>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search by camp name..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
          {/* View toggle only on tablet+ */}
          {!isMobile && (
            <Button
              icon={
                viewMode === "table" ? <AppstoreOutlined /> : <TableOutlined />
              }
              onClick={() =>
                setViewMode((prev) => (prev === "table" ? "grid" : "table"))
              }
            />
          )}
        </div>
      </div>

      {/* Table view (desktop & tablet only) */}
      {!isMobile && viewMode === "table" && (
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
        />
      )}

      {/* Card/Grid view */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredData.map((record) => (
            <motion.div
              key={record._id}
              className="border rounded-xl shadow p-4 bg-white"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-bold text-lg">{record.campName}</h3>
              <p className="text-sm text-gray-600">
                Participant: {record.participantName}
              </p>
              <p className="text-sm">
                Fees:{" "}
                {record.campFees === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  `BDT ${record.campFees}`
                )}
              </p>
              <div className="flex gap-2 mt-2">
                <Tag color={record.paymentStatus === "paid" ? "green" : "red"}>
                  {record.paymentStatus}
                </Tag>
                <Tag
                  color={
                    record.confirmationStatus === "confirmed"
                      ? "blue"
                      : "orange"
                  }
                >
                  {record.confirmationStatus}
                </Tag>
              </div>
              <div className="mt-3 flex gap-2">
                {record.paymentStatus === "unpaid" && (
                  <>
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
                  </>
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
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Feedback Modal */}
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

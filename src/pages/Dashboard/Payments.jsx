import React, { useEffect, useState } from "react";
import { Table, Tag, Spin, Empty } from "antd";
import { motion } from "framer-motion";
import axiosSecure from "../../Hooks/AxiousSecure";
import useCurrentUser from "../../Hooks/useController";
import { Helmet } from "react-helmet-async";

const Payments = () => {
  const { currentUser } = useCurrentUser();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await axiosSecure.get(
          "https://medicamp-server-jth3.onrender.com/registered-participant"
        );

        const filtered = data
          .filter(
            (item) =>
              item.loggedUserEmail === currentUser?.email &&
              item.paymentStatus === "paid"
          )
          .map((item, index) => ({
            key: index,
            campName: item.campName,
            fees: item.campFees,
            id: item.transactionId || "N/A",
            date: new Date(item.registeredAt).toLocaleDateString(),
            status: "Paid",
            participantName: item.participantName,
            phone: item.phone,
            gender: item.gender,
          }));

        setTransactions(filtered);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.email) fetchTransactions();
  }, [currentUser]);

  const columns = [
    {
      title: "Camp Name",
      dataIndex: "campName",
      key: "campName",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Participant",
      key: "participantName",
      render: (_, record) => (
        <div>
          <p className="font-medium">{record.participantName}</p>
          <p className="text-xs text-gray-500">{record.phone}</p>
          <p className="text-xs text-gray-400 italic">{record.gender}</p>
        </div>
      ),
    },
    {
      title: "Fees ($)",
      dataIndex: "fees",
      key: "fees",
    },
    {
      title: "Transaction ID",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <span className="text-blue-700 font-mono text-sm">{id}</span>
      ),
    },
    {
      title: "Payment Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color="green" className="font-semibold">
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <motion.div
      className="max-w-6xl mx-auto mt-10 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Payment History | Dashboard | MCMS</title>
      </Helmet>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Stripe Transactions
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spin size="large" />
        </div>
      ) : transactions.length > 0 ? (
        <Table
          columns={columns}
          dataSource={transactions}
          pagination={{ pageSize: 5 }}
          bordered
        />
      ) : (
        <Empty description="No paid transactions found." />
      )}
    </motion.div>
  );
};

export default Payments;

import React, { useEffect, useState } from "react";
import { Table, Tag, Spin, Empty, Button } from "antd";
import { motion } from "framer-motion";
import axiosSecure from "../../Hooks/AxiousSecure";
import useCurrentUser from "../../Hooks/useController";
import { Helmet } from "react-helmet-async";
import { LayoutGrid, Table as TableIcon } from "lucide-react";

const Payments = () => {
  const { currentUser } = useCurrentUser();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("grid");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setView("grid");
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
        <h2 className="text-2xl font-semibold text-gray-800">
          Stripe Transactions
        </h2>

        {!isMobile && (
          <div className="flex gap-2">
            <Button
              type={view === "table" ? "primary" : "default"}
              icon={<TableIcon size={16} />}
              onClick={() => setView("table")}
            >
              Table
            </Button>
            <Button
              type={view === "grid" ? "primary" : "default"}
              icon={<LayoutGrid size={16} />}
              onClick={() => setView("grid")}
            >
              Grid
            </Button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spin size="large" />
        </div>
      ) : transactions.length > 0 ? (
        <>
          {/* TABLE VIEW */}
          {!isMobile && view === "table" && (
            <Table
              columns={columns}
              dataSource={transactions}
              pagination={{ pageSize: 5 }}
              bordered
            />
          )}

          {/* GRID VIEW */}
          {view === "grid" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {transactions.map((tx) => (
                <motion.div
                  key={tx.key}
                  className="p-5 rounded-2xl shadow bg-white border hover:shadow-lg transition"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    {tx.campName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Participant:{" "}
                    <span className="font-medium">{tx.participantName}</span>
                  </p>
                  <p className="text-sm text-gray-500">{tx.phone}</p>
                  <p className="text-sm text-gray-400 italic">{tx.gender}</p>

                  <p className="mt-2 text-sm">
                    <span className="font-semibold">Fees:</span> ${tx.fees}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Txn ID:</span>{" "}
                    <span className="font-mono text-blue-700">{tx.id}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Date:</span> {tx.date}
                  </p>

                  <Tag
                    color="green"
                    className="mt-2 font-semibold inline-block px-3 py-1 rounded-lg"
                  >
                    {tx.status}
                  </Tag>
                </motion.div>
              ))}
            </div>
          )}
        </>
      ) : (
        <Empty description="No paid transactions found." />
      )}
    </motion.div>
  );
};

export default Payments;

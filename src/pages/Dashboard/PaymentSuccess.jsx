import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, Spin, Result, Button } from "antd";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const campId = searchParams.get("campId");
  const [loading, setLoading] = useState(true);
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/session-details/${sessionId}`
        );
        console.log("payment data: ", data)
        const transactionId = data.payment_intent;
        const campId = data.metadata?.campId;

        // Send patch request to update status + transactionId
        const result = await axios.patch(
          `http://localhost:5000/update-payment-status/${campId}`,
          {
            participantEmail: data.customer_email,
            paymentStatus: "paid",
            transactionId,
          }
        );

        console.log("Payment status: ", result.data)

        toast.success("✅ Payment confirmed!");
        setTransactionId(transactionId);
      } catch (err) {
        console.error("Payment success error:", err);
        toast.error("Something went wrong while confirming payment.");
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchSession();
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-white px-4"
    >
      <Card className="w-full max-w-xl shadow-2xl rounded-2xl border border-green-100">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Spin size="large" />
          </div>
        ) : (
          <Result
            status="success"
            title="🎉 Payment Successful!"
            subTitle={
              <div className="space-y-2">
                <p>Your camp registration has been confirmed.</p>
                <p className="font-semibold text-gray-700">
                  Transaction ID:{" "}
                  <span className="text-green-600">{transactionId}</span>
                </p>
              </div>
            }
            extra={[
              <Button
                type="primary"
                key="dashboard"
                onClick={() => navigate("/dashboard/participants/camps")}
              >
                🔙 Back to Camps
              </Button>,
            ]}
          />
        )}
      </Card>
    </motion.div>
  );
};

export default PaymentSuccess;

import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, Spin, Result, Button } from "antd";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const PaymentCancelled = () => {
  const [searchParams] = useSearchParams();
  const campId = searchParams.get("campId");
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cancelRegistration = async () => {
      if (!campId || !email) {
        toast.error("Missing required info to cancel registration.");
        return setLoading(false);
      }

      try {
        const res = await axios.delete(
          `https://medicamp-server-jade.vercel.app/delete-registration?campId=${campId}&email=${email}`
        );

        if (res.data.deletedCount > 0) {
          toast.success("✅ Registration cancelled.");
        } else {
          toast("Registration not found or already cancelled.");
        }
      } catch (error) {
        console.error("Cancel error:", error);
        toast.error("Failed to cancel registration.");
      } finally {
        setLoading(false);
      }
    };

    cancelRegistration();
  }, [campId, email]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-white px-4"
    >
      <Card className="w-full max-w-xl shadow-2xl rounded-2xl border border-red-100">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Spin size="large" />
          </div>
        ) : (
          <Result
            status="warning"
            title="❌ Registration Cancelled"
            subTitle="Your payment was not completed and the registration has been removed."
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

export default PaymentCancelled;

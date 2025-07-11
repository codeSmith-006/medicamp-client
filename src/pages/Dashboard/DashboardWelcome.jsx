import React from "react";
import { Card, Typography, Button } from "antd";
import { motion } from "framer-motion";
import { Smile, CalendarPlus, Activity } from "lucide-react";
import useCurrentUser from "../../Hooks/useController";
// import useCurrentUser from "../../Hooks/useCurrentUser";

const { Title, Text } = Typography;

const DashboardWelcome = () => {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) return null;

  const isAdmin = currentUser?.role === "admin";
  const isUser = currentUser?.role === "user";

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card bordered className="shadow-xl rounded-2xl bg-white">
        <div className="flex flex-col items-center text-center space-y-6 px-6 py-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 160 }}
          >
            <Smile className="w-16 h-16 text-blue-500" />
          </motion.div>

          <Title level={2} className="!text-3xl font-bold">
            Welcome back, {currentUser?.name || "User"}!
          </Title>

          <Text type="secondary" className="text-base">
            You are logged in as{" "}
            <span className="capitalize font-medium text-black">
              {currentUser?.role}
            </span>
            . Explore your dashboard tools below.
          </Text>

          {isAdmin && (
            <Button
              type="primary"
              size="large"
              icon={<CalendarPlus className="mr-2" />}
              href="/dashboard/organizer/add-camp"
            >
              Add New Camp
            </Button>
          )}

          {isUser && (
            <Button
              type="primary"
              size="large"
              icon={<Activity className="mr-2" />}
              href="/dashboard/participants/analytics"
            >
              View Analytics
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default DashboardWelcome;

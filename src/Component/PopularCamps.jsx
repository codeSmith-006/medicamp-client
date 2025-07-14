import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import AOS from "aos";
import { motion } from "framer-motion";
// import axiosSecure from "../../Hooks/AxiousSecure";
// import CampCard from "./CampCard";
import { FireOutlined } from "@ant-design/icons";
import CampCard from "../pages/AvailableCamps/CampCard";
import axiosSecure from "../Hooks/AxiousSecure";

const PopularCamps = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const { data: popularCamps = [], isLoading } = useQuery({
    queryKey: ["popular-camps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/popular-camps");
      return res.data;
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-16 px-4 md:px-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-10">
          🔥 Popular Medical Camps
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading popular camps...</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {popularCamps.map((camp, index) => (
              <motion.div
                key={camp._id}
                className="relative"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {/* 🔥 Popular Badge */}
                <div className="absolute top-2 right-2 z-10">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow">
                    <FireOutlined />
                    Popular
                  </span>
                </div>

                {/* Card */}
                <CampCard camp={camp} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* See All Camps Button */}
        <div className="text-center mt-12" data-aos="fade-up">
          <Link
            to="/available-camps"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition duration-300"
          >
            🔍 See All Camps
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PopularCamps;

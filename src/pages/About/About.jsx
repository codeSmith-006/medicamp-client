import React, { useState, useEffect, use } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  AimOutlined,
  GlobalOutlined,
  TeamOutlined,
  SmileOutlined,
  SunOutlined,
  MoonOutlined,
  FireOutlined,
  CheckCircleOutlined,
  StarFilled,
  HeartFilled,
} from "@ant-design/icons";
import AuthContext from "../../Context/AuthContext";

export default function About({}) {
  const { isDarkMode } = use(AuthContext);
  // const [isDarkMode, setIsDark] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.05,
      y: -10,
      boxShadow: isDarkMode
        ? "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
        : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  const themeClass = isDarkMode ? "bg-slate-900" : "bg-gray-50";
  const textPrimary = isDarkMode ? "text-slate-100" : "text-black";
  const textSecondary = isDarkMode ? "text-slate-400" : "text-gray-500";
  const cardBg = isDarkMode ? "bg-slate-800" : "bg-white";
  const gradientBg = isDarkMode
    ? "from-slate-800 via-blue-900 to-slate-800"
    : "from-blue-600 to-cyan-500";

  return (
    <div className={`min-h-screen transition-all duration-700 ${themeClass}`}>
      {/* Hero Section with Parallax */}
      <section
        className={`relative bg-gradient-to-br ${gradientBg} text-white py-32 text-center overflow-hidden`}
      >
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
        />

        {/* Floating Background Elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-32 right-16 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl"
          style={{ animationDelay: "2s" }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-red-500 text-white text-sm px-4 py-2 rounded-full shadow-lg">
              <FireOutlined />
              <span className="font-semibold">Most Popular Platform</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent"
          >
            About Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed text-blue-100"
          >
            Connecting communities with doctors through seamless medical camp
            management
          </motion.p>

          {/* Animated Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12"
          >
            {[
              { number: "1000+", label: "Doctors" },
              { number: "50K+", label: "Patients" },
              { number: "500+", label: "Camps" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-3xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Mission & Vision with Enhanced Design */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div
            variants={itemVariants}
            className={`p-8 rounded-3xl ${cardBg} shadow-2xl border ${
              isDarkMode ? "border-slate-700" : "border-gray-100"
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl">
                <AimOutlined className="text-2xl text-white" />
              </div>
              <h2 className={`text-4xl font-bold ${textPrimary}`}>
                Our Mission
              </h2>
            </div>
            <p className={`${textSecondary} text-lg leading-relaxed`}>
              To empower healthcare accessibility by enabling organizers to host
              medical camps and participants to register with ease. We strive to
              make healthcare available, affordable, and transparent for all
              communities worldwide.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <CheckCircleOutlined className="text-green-500" />
              <span className={`text-sm ${textSecondary}`}>
                Trusted by 1000+ healthcare providers
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className={`p-8 rounded-3xl ${cardBg} shadow-2xl border ${
              isDarkMode ? "border-slate-700" : "border-gray-100"
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                <StarFilled className="text-2xl text-white" />
              </div>
              <h2 className={`text-4xl font-bold ${textPrimary}`}>
                Our Vision
              </h2>
            </div>
            <p className={`${textSecondary} text-lg leading-relaxed`}>
              A world where quality healthcare reaches every corner of society
              through organized medical camps. We aim to connect communities
              with the right doctors and services to ensure healthier, brighter
              futures for everyone.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <HeartFilled className="text-red-500" />
              <span className={`text-sm ${textSecondary}`}>
                Impacting 50K+ lives annually
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Journey Timeline with Modern Design */}
      <section
        className={`py-24 px-6 ${isDarkMode ? "bg-slate-800/50" : "bg-white"}`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-4xl font-bold text-center mb-16 ${textPrimary}`}
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            {/* Timeline Line */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
                isDarkMode ? "bg-slate-700" : "bg-gray-200"
              }`}
            />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-16"
            >
              {[
                {
                  year: "2023",
                  title: "The Beginning",
                  text: "Idea was born to simplify medical camp management and make healthcare more accessible.",
                  icon: <AimOutlined />,
                },
                {
                  year: "2024",
                  title: "Platform Development",
                  text: "Platform built with cutting-edge MERN stack and real-world integrations for seamless experience.",
                  icon: <GlobalOutlined />,
                },
                {
                  year: "2025",
                  title: "Massive Growth",
                  text: "Expanded to connect hundreds of qualified doctors with thousands of participants across the globe.",
                  icon: <TeamOutlined />,
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={`flex items-center ${
                    idx % 2 === 0 ? "justify-start" : "justify-end"
                  } relative`}
                >
                  <div
                    className={`${idx % 2 === 0 ? "mr-8" : "ml-8"} max-w-md`}
                  >
                    <motion.div
                      whileHover="hover"
                      variants={cardHoverVariants}
                      className={`p-6 rounded-2xl ${cardBg} shadow-xl border ${
                        isDarkMode ? "border-slate-700" : "border-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white">
                          {item.icon}
                        </div>
                        <div className={`text-2xl font-bold text-blue-500`}>
                          {item.year}
                        </div>
                      </div>
                      <h3
                        className={`text-xl font-semibold mb-2 ${textPrimary}`}
                      >
                        {item.title}
                      </h3>
                      <p className={`${textSecondary} leading-relaxed`}>
                        {item.text}
                      </p>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 ${
                      isDarkMode ? "border-slate-900" : "border-gray-50"
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features with Advanced Cards */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl font-bold text-center mb-16 ${textPrimary}`}
        >
          Why Choose MCMS?
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              icon: <AimOutlined className="text-4xl" />,
              title: "Organized",
              desc: "Streamlined camp management for organizers with intuitive dashboard and tools.",
              gradient: "from-blue-500 to-cyan-500",
              bgIcon: "bg-blue-500/10",
            },
            {
              icon: <GlobalOutlined className="text-4xl" />,
              title: "Accessible",
              desc: "Connecting participants with quality healthcare services across all regions.",
              gradient: "from-green-500 to-emerald-500",
              bgIcon: "bg-green-500/10",
            },
            {
              icon: <TeamOutlined className="text-4xl" />,
              title: "Trusted Doctors",
              desc: "Qualified specialists across multiple medical fields and expertise areas.",
              gradient: "from-purple-500 to-violet-500",
              bgIcon: "bg-purple-500/10",
            },
            {
              icon: <SmileOutlined className="text-4xl" />,
              title: "User-Friendly",
              desc: "Easy registration, payment processing, and seamless user experience.",
              gradient: "from-pink-500 to-rose-500",
              bgIcon: "bg-pink-500/10",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover="hover"
              className="group"
            >
              <motion.div
                variants={cardHoverVariants}
                className={`h-full p-8 rounded-3xl ${cardBg} shadow-xl border ${
                  isDarkMode ? "border-slate-700" : "border-gray-100"
                } transition-all duration-300`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${feature.bgIcon} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div
                    className={`bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                  >
                    {feature.icon}
                  </div>
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${textPrimary}`}>
                  {feature.title}
                </h3>
                <p className={`${textSecondary} leading-relaxed`}>
                  {feature.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call to Action with Enhanced Design */}
      <section
        className={`bg-gradient-to-br ${gradientBg} text-white py-24 text-center relative overflow-hidden`}
      >
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-10 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-20 right-10 w-24 h-24 bg-cyan-300/20 rounded-full blur-xl"
          style={{ animationDelay: "1s" }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-6"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
          >
            Ready to Transform Healthcare Access?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto"
          >
            Join thousands of healthcare providers and participants in making
            quality medical care accessible to everyone.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                isDarkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-400 hover:bg-blue-500 text-white"
              } shadow-xl`}
            >
              Join as Organizer
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl font-semibold text-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 transition-all duration-300"
            >
              Register as Patient
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  HeartOutlined,
  TeamOutlined,
  GlobalOutlined,
  StarFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";

export default function AboutSection({ isDarkMode }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-8, 8, -8],
      rotate: [0, 3, -3, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className={`relative py-24 overflow-hidden transition-colors duration-700 ${
        isDarkMode ? "bg-slate-900" : "bg-gray-50"
      }`}
    >
      {/* Floating Background Elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-32 right-16 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
        style={{ animationDelay: "3s" }}
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-1/2 right-10 w-16 h-16 bg-green-500/10 rounded-full blur-lg"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col xl:flex-row items-center gap-16">
          {/* Left: Enhanced Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.8 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 80,
              damping: 12,
            }}
            className="xl:w-1/2 flex justify-center relative"
          >
            {/* Decorative Elements Around Image */}
            <div className="relative">
              {/* Gradient Background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl"></div>

              {/* Main Image Container */}
              <div
                className={`relative p-4 rounded-3xl backdrop-blur-sm border ${
                  isDarkMode
                    ? "bg-slate-800/50 border-slate-700/50"
                    : "bg-white/50 border-gray-200/50"
                }`}
              >
                {/* Placeholder for image since we don't have the actual image */}
                <div
                  className={`w-full aspect-[4/3] rounded-2xl flex items-center justify-center ${
                    isDarkMode ? "bg-slate-700" : "bg-gray-200"
                  }`}
                >
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                      <HeartOutlined className="text-2xl text-white" />
                    </div>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-slate-400" : "text-gray-500"
                      }`}
                    >
                      Medical Camp Image
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
                className={`absolute -top-6 -right-6 p-4 rounded-2xl backdrop-blur-md border shadow-xl ${
                  isDarkMode
                    ? "bg-slate-800/80 border-slate-600/50"
                    : "bg-white/80 border-gray-200/50"
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">500+</div>
                  <div
                    className={`text-xs ${
                      isDarkMode ? "text-slate-400" : "text-gray-500"
                    }`}
                  >
                    Camps Organized
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: 10 }}
                animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ delay: 1, duration: 0.6, type: "spring" }}
                className={`absolute -bottom-4 -left-6 p-4 rounded-2xl backdrop-blur-md border shadow-xl ${
                  isDarkMode
                    ? "bg-slate-800/80 border-slate-600/50"
                    : "bg-white/80 border-gray-200/50"
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">50K+</div>
                  <div
                    className={`text-xs ${
                      isDarkMode ? "text-slate-400" : "text-gray-500"
                    }`}
                  >
                    Lives Impacted
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Enhanced Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="xl:w-1/2 space-y-8"
          >
            {/* Header Section */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30"
              >
                <StarFilled className="text-blue-500 text-sm" />
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-blue-300" : "text-blue-600"
                  }`}
                >
                  Healthcare Excellence
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                className={`text-4xl lg:text-5xl font-bold leading-tight transition-colors duration-500 ${
                  isDarkMode ? "text-slate-100" : "text-gray-800"
                }`}
              >
                About Our{" "}
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Program
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
                className={`text-lg leading-relaxed transition-colors duration-500 ${
                  isDarkMode ? "text-slate-400" : "text-gray-600"
                }`}
              >
                Our{" "}
                <span className="font-semibold text-blue-500">
                  Medical Camp Management System (MCMS)
                </span>{" "}
                bridges the gap between healthcare professionals and
                communities. Organizers can efficiently manage camps, while
                participants can register with ease, make secure payments, and
                access quality healthcare.
              </motion.p>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex items-center gap-4 pt-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircleOutlined className="text-green-500" />
                  <span
                    className={`text-sm ${
                      isDarkMode ? "text-slate-400" : "text-gray-500"
                    }`}
                  >
                    Trusted by 1000+ doctors
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleOutlined className="text-green-500" />
                  <span
                    className={`text-sm ${
                      isDarkMode ? "text-slate-400" : "text-gray-500"
                    }`}
                  >
                    99.9% uptime
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Mission, Vision, Values Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6"
            >
              {[
                {
                  icon: HeartOutlined,
                  color: "text-red-500",
                  bgColor: "from-red-500/20 to-pink-500/20",
                  borderColor: "border-red-500/30",
                  title: "Mission",
                  description:
                    "Ensure accessible healthcare for all through well-managed medical camps and innovative technology solutions.",
                },
                {
                  icon: GlobalOutlined,
                  color: "text-blue-500",
                  bgColor: "from-blue-500/20 to-cyan-500/20",
                  borderColor: "border-blue-500/30",
                  title: "Vision",
                  description:
                    "Build a healthier, more connected community with quality healthcare access for everyone, everywhere.",
                },
                {
                  icon: TeamOutlined,
                  color: "text-green-500",
                  bgColor: "from-green-500/20 to-emerald-500/20",
                  borderColor: "border-green-500/30",
                  title: "Values",
                  description:
                    "Transparency, Accessibility, and Collaboration in every step of our healthcare delivery process.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  className={`group relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:shadow-2xl ${
                    isDarkMode
                      ? "bg-slate-800/50 border-slate-700/50 hover:border-slate-600"
                      : "bg-white/50 border-gray-200/50 hover:border-gray-300"
                  }`}
                >
                  {/* Gradient Background on Hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>

                  <div className="relative z-10 flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${item.bgColor} border ${item.borderColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className={`${item.color} text-2xl`} />
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`font-bold text-lg mb-2 transition-colors duration-500 ${
                          isDarkMode ? "text-slate-100" : "text-gray-800"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p
                        className={`text-sm leading-relaxed transition-colors duration-500 ${
                          isDarkMode ? "text-slate-400" : "text-gray-600"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9, type: "spring" }}
              className="pt-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: isDarkMode
                    ? "0 20px 40px rgba(59, 130, 246, 0.3)"
                    : "0 20px 40px rgba(59, 130, 246, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 overflow-hidden ${
                  isDarkMode
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-blue-400 hover:bg-blue-500 text-white"
                }`}
              >
                {/* Button Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <span className="relative z-10 flex items-center gap-2">
                  Explore Available Camps
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

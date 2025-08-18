import React, { useState } from "react";

// Mock framer-motion and react-intersection-observer
const motion = {
  div: ({ children, initial, animate, transition, className, ...props }) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),
  h2: ({ children, initial, animate, transition, className, ...props }) => (
    <h2 className={className} {...props}>
      {children}
    </h2>
  ),
  p: ({ children, initial, animate, transition, className, ...props }) => (
    <p className={className} {...props}>
      {children}
    </p>
  ),
};

const useInView = () => ({ ref: null, inView: true });

// Mock Ant Design icons
const SearchOutlined = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const EditOutlined = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

const CreditCardOutlined = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
  </svg>
);

const BarChartOutlined = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
  </svg>
);

const UserOutlined = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const StarOutlined = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
  </svg>
);

const steps = [
  {
    icon: <SearchOutlined className="text-4xl" />,
    title: "Discover Camps",
    desc: "Browse upcoming medical camps with filters for location, date, and doctors. Each camp highlights key details and availability.",
    number: "01",
  },
  {
    icon: <EditOutlined className="text-4xl" />,
    title: "Register Easily",
    desc: "Sign up with Google or Email. A simple registration flow ensures you're added to your chosen camp in seconds.",
    number: "02",
  },
  {
    icon: <CreditCardOutlined className="text-4xl" />,
    title: "Secure Payments",
    desc: "Pay securely using Stripe integration. Only paid registrations are confirmed, ensuring transparency and trust.",
    number: "03",
  },
  {
    icon: <BarChartOutlined className="text-4xl" />,
    title: "Organizer Dashboard",
    desc: "Organizers can manage camps, monitor registrations, and view analytics with a professional dashboard.",
    number: "04",
  },
  {
    icon: <UserOutlined className="text-4xl" />,
    title: "Participant Dashboard",
    desc: "View your registered camps, payments, and analytics. Track participation history with interactive charts.",
    number: "05",
  },
  {
    icon: <StarOutlined className="text-4xl" />,
    title: "Feedback & Testimonials",
    desc: "Leave feedback after camp completion. Build credibility for organizers and improve future events.",
    number: "06",
  },
];

export default function HowItWorks({ isDarkMode = false }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className={`py-20 transition-colors duration-500 relative overflow-hidden ${
        isDarkMode ? "bg-slate-900 text-slate-100" : "bg-gray-50 text-black"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Heading */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span
              className={`text-sm font-medium tracking-wider uppercase mb-4 block ${
                isDarkMode ? "text-blue-400" : "text-blue-500"
              }`}
            >
              Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500">
              How It Works
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`max-w-3xl mx-auto text-lg leading-relaxed transition-colors duration-500 ${
              isDarkMode ? "text-slate-400" : "text-gray-500"
            }`}
          >
            Our Medical Camp Management System makes it simple for participants
            and organizers to connect, manage registrations, handle payments,
            and improve healthcare outcomes.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative"
            >
              {/* Connection Line for larger screens */}
              {index < steps.length - 1 && (
                <div
                  className={`hidden lg:block absolute top-16 -right-4 w-8 h-px ${
                    isDarkMode ? "bg-slate-700" : "bg-gray-300"
                  } transition-colors duration-500`}
                >
                  <div
                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full ${
                      isDarkMode ? "bg-slate-600" : "bg-gray-400"
                    } transition-colors duration-500`}
                  />
                </div>
              )}

              <div
                className={`relative rounded-3xl p-8 h-full transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl ${
                  isDarkMode
                    ? "bg-slate-800 shadow-lg shadow-slate-900/20"
                    : "bg-white shadow-lg shadow-gray-100/50"
                }`}
              >
                {/* Step Number */}
                <div
                  className={`absolute top-6 right-6 text-6xl font-bold opacity-10 transition-colors duration-500 ${
                    isDarkMode ? "text-slate-600" : "text-gray-300"
                  }`}
                >
                  {step.number}
                </div>

                {/* Icon Container */}
                <div
                  className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 ${
                    isDarkMode
                      ? "bg-slate-700 text-blue-400"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {step.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3
                    className={`text-xl font-bold mb-4 transition-colors duration-500 ${
                      isDarkMode ? "text-slate-100" : "text-gray-800"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed transition-colors duration-500 ${
                      isDarkMode ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>

                {/* Hover Effect Background */}
                <div
                  className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    isDarkMode
                      ? "bg-gradient-to-br from-slate-700/20 to-slate-800/20"
                      : "bg-gradient-to-br from-blue-50/50 to-indigo-50/50"
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p
            className={`text-lg mb-6 transition-colors duration-500 ${
              isDarkMode ? "text-slate-300" : "text-gray-700"
            }`}
          >
            Ready to streamline your medical camp experience?
          </p>
          <button
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              isDarkMode
                ? "bg-blue-400 text-white hover:bg-blue-500 shadow-blue-600/20"
                : "bg-blue-400 text-white hover:bg-blue-500 shadow-blue-600/20"
            }`}
          >
            Get Started Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}

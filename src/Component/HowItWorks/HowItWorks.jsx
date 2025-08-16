import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  SearchOutlined,
  EditOutlined,
  CreditCardOutlined,
  BarChartOutlined,
  UserOutlined,
  StarOutlined,
} from "@ant-design/icons";

const steps = [
  {
    icon: <SearchOutlined className="text-4xl text-blue-500" />,
    title: "Discover Camps",
    desc: "Browse upcoming medical camps with filters for location, date, and doctors. Each camp highlights key details and availability.",
  },
  {
    icon: <EditOutlined className="text-4xl text-green-500" />,
    title: "Register Easily",
    desc: "Sign up with Google or Email. A simple registration flow ensures you're added to your chosen camp in seconds.",
  },
  {
    icon: <CreditCardOutlined className="text-4xl text-purple-500" />,
    title: "Secure Payments",
    desc: "Pay securely using Stripe integration. Only paid registrations are confirmed, ensuring transparency and trust.",
  },
  {
    icon: <BarChartOutlined className="text-4xl text-orange-500" />,
    title: "Organizer Dashboard",
    desc: "Organizers can manage camps, monitor registrations, and view analytics with a professional dashboard.",
  },
  {
    icon: <UserOutlined className="text-4xl text-pink-500" />,
    title: "Participant Dashboard",
    desc: "View your registered camps, payments, and analytics. Track participation history with interactive charts.",
  },
  {
    icon: <StarOutlined className="text-4xl text-yellow-500" />,
    title: "Feedback & Testimonials",
    desc: "Leave feedback after camp completion. Build credibility for organizers and improve future events.",
  },
];

export default function HowItWorks() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-16 bg-gray-50 bg-[#191919]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-600 text-gray-300 max-w-2xl mx-auto mb-12"
        >
          Our Medical Camp Management System makes it simple for participants
          and organizers to connect, manage registrations, handle payments, and
          improve healthcare outcomes.
        </motion.p>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white bg-[#2F2F2F] rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-gray-300">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

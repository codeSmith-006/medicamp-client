import { motion } from "framer-motion";
import {
  AimOutlined,
  GlobalOutlined,
  TeamOutlined,
  SmileOutlined,
} from "@ant-design/icons";

export default function About() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 max-w-2xl mx-auto text-lg md:text-xl"
        >
          Connecting communities with doctors through seamless medical camp
          management.
        </motion.p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            To empower healthcare accessibility by enabling organizers to host
            medical camps and participants to register with ease. We strive to
            make healthcare available, affordable, and transparent for all.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            A world where quality healthcare reaches every corner of society
            through organized medical camps. We aim to connect communities with
            the right doctors and services to ensure healthier futures.
          </p>
        </motion.div>
      </section>

      {/* Story Timeline */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Our Journey</h2>
          <div className="space-y-8">
            {[
              {
                year: "2023",
                text: "Idea was born to simplify medical camp management.",
              },
              {
                year: "2024",
                text: "Platform built with MERN stack and real-world integrations.",
              },
              {
                year: "2025",
                text: "Expanded to connect hundreds of doctors & thousands of participants.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="flex items-center justify-center space-x-6"
              >
                <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold">
                  {item.year}
                </div>
                <p className="text-lg text-gray-700">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose MCMS?
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: <AimOutlined className="text-4xl text-blue-600" />,
              title: "Organized",
              desc: "Streamlined camp management for organizers.",
            },
            {
              icon: <GlobalOutlined className="text-4xl text-green-600" />,
              title: "Accessible",
              desc: "Connecting participants with quality healthcare.",
            },
            {
              icon: <TeamOutlined className="text-4xl text-purple-600" />,
              title: "Trusted Doctors",
              desc: "Qualified specialists across multiple fields.",
            },
            {
              icon: <SmileOutlined className="text-4xl text-pink-600" />,
              title: "User-Friendly",
              desc: "Easy registration & payment experience.",
            },
          ].map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Ready to Be a Part of Our Journey?
        </motion.h2>
        <motion.a
          href="/register"
          whileHover={{ scale: 1.05 }}
          className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold shadow"
        >
          Join Now
        </motion.a>
      </section>
    </div>
  );
}

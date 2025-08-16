import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HeartOutlined, TeamOutlined, GlobalOutlined } from "@ant-design/icons";
import aboutImg from "../../assets/aboutImage.png";

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-12">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center"
        >
          <img
            src={aboutImg}
            className="rounded-2xl shadow-lg w-full md:w-4/5"
          />
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2 space-y-6"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            About Our Program
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our <strong>Medical Camp Management System (MCMS)</strong> bridges
            the gap between healthcare professionals and communities. Organizers
            can efficiently manage camps, while participants can register with
            ease, make secure payments, and access quality healthcare.
          </p>

          {/* Mission, Vision, Values */}
          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-start gap-3 bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <HeartOutlined className="text-red-500 text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Mission</h4>
                <p className="text-gray-600 text-sm">
                  Ensure accessible healthcare for all through well-managed
                  medical camps.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-start gap-3 bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <GlobalOutlined className="text-blue-500 text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Vision</h4>
                <p className="text-gray-600 text-sm">
                  Build a healthier, more connected community with quality
                  healthcare access.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-start gap-3 bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <TeamOutlined className="text-green-500 text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Values</h4>
                <p className="text-gray-600 text-sm">
                  Transparency, Accessibility, and Collaboration in every step.
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Explore Available Camps
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

import React, { useEffect } from "react";
import { Collapse } from "antd";
import { motion } from "framer-motion";
import AOS from "aos";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "aos/dist/aos.css";

const { Panel } = Collapse;

const faqs = [
  {
    question: "1. What is the Medical Camp Management System (MCMS)?",
    answer:
      "MCMS is an online platform designed to simplify the organization and participation in medical camps. It connects organizers with participants, enabling easy camp registration, secure payments, and seamless communication.",
  },
  {
    question: "2. Who can register as a participant?",
    answer:
      "Anyone with a valid email address can register as a participant. Once logged in, users can register for any available medical camp by filling out a short participant form.",
  },
  {
    question: "3. How do I become a camp organizer?",
    answer:
      "If you’re interested in organizing camps, you can request admin access. Initially, users are registered as participants. The platform admin can manually assign the “organizer” role to your account.",
  },
  {
    question: "4. Can I register multiple participants from one account?",
    answer:
      "Yes, a user can register multiple participants using a single account. This is helpful for registering family members or others who may not have separate accounts.",
  },
  {
    question: "5. Is online payment secure on this platform?",
    answer:
      "Absolutely. We use Stripe for processing payments, ensuring that all transactions are secure, encrypted, and PCI-compliant.",
  },
  {
    question: "6. What happens after I pay for a camp?",
    answer:
      "Once your payment is successful, your registration will be confirmed, and you'll receive a transaction ID. You will also gain access to the feedback option after attending the camp.",
  },
  {
    question: "7. Can I cancel a registration after paying?",
    answer:
      "No. To ensure fairness and commitment, registrations cannot be cancelled after payment has been confirmed. Cancellations are only allowed before completing payment.",
  },
  {
    question: "8. How can I give feedback on a camp I attended?",
    answer:
      "Once your payment is confirmed, a “Feedback” button will appear in your dashboard. You can rate the camp and leave a review to help improve future events.",
  },
  {
    question: "9. What is the participant count in a camp?",
    answer:
      "The participant count reflects how many people have registered for a specific camp. This number updates automatically each time a new participant registers.",
  },
  {
    question: "10. Who can see my personal information?",
    answer:
      "Only authorized organizers of the camps you’ve registered for can see your registration details, and all information is protected by secure authentication using Firebase and JWT.",
  },
];

const FAQSection = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const headerVariants = {
    rest: { opacity: 0.6, y: 10 },
    hover: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.3 },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white py-16 px-4 md:px-8"
    >
      <div className="max-w-5xl mx-auto" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          📚 Frequently Asked Questions (FAQ)
        </h2>

        <Collapse
          accordion
          ghost
          expandIconPosition="right"
          className="rounded-xl bg-white"
        >
          {faqs.map((faq, index) => (
            <Panel
              key={index}
              style={{
                background: "#f9f9f9",
                borderRadius: 12,
                marginBottom: 12,
              }}
              showArrow
              header={
                <motion.div
                  variants={headerVariants}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  custom={index}
                  className="flex items-center"
                >
                  <QuestionCircleOutlined className="mr-2 text-blue-500" />
                  <span className="text-base md:text-lg font-semibold text-gray-800">
                    {faq.question}
                  </span>
                </motion.div>
              }
            >
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                {faq.answer}
              </p>
            </Panel>
          ))}
        </Collapse>
      </div>
    </motion.div>
  );
};


export default FAQSection;

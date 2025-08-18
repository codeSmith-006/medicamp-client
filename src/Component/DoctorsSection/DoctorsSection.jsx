import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useState } from "react";

// 🔹 Doctors extracted from Camps JSON
const doctors = [
  {
    name: "Dr. Afsana Karim",
    specialization: "Dentist",
    image: "https://i.ibb.co.com/VpwKqVjg/female-4.png",
    camps: [
      {
        campName: "Free Dental Checkup Camp",
        location: "Green Life Hospital, Dhaka",
        dateTime: "2025-07-30T04:00:00.000Z",
        campFees: 250,
        participantCount: 8,
      },
    ],
  },
  {
    name: "Dr. Riaz Mahmud",
    specialization: "Ophthalmologist",
    image: "https://i.ibb.co.com/Q7FfWKyJ/doc-7.jpg",
    camps: [
      {
        campName: "Free Eye Check-Up Camp",
        location: "Green Life Hospital, Dhaka",
        dateTime: "2025-07-25T09:00:00.000Z",
        campFees: 0,
        participantCount: 7,
      },
    ],
  },
  {
    name: "Dr. Salma Haque",
    specialization: "General Physician",
    image: "https://i.ibb.co.com/PsY95DXS/femla.jpg",
    camps: [
      {
        campName: "General Health Screening Camp",
        location: "MedStar Diagnostic Center, Chittagong",
        dateTime: "2027-09-01T03:00:00.000Z",
        campFees: 200,
        participantCount: 4,
      },
    ],
  },
  {
    name: "Dr. Nahid Uddin",
    specialization: "Endocrinologist",
    image: "https://i.ibb.co.com/ZzdYyP3P/doctor-male-2.jpg",
    camps: [
      {
        campName: "Diabetes Awareness & Screening Camp",
        location: "HealthLine Clinic, Rajshahi",
        dateTime: "2025-08-28T05:30:00.000Z",
        campFees: 250,
        participantCount: 3,
      },
    ],
  },
  {
    name: "Dr. Asif Hasan",
    specialization: "Pediatrician",
    image: "https://i.ibb.co.com/zTBTTW04/doctor-male-3.png",
    camps: [
      {
        campName: "Pediatric Wellness Camp",
        location: "Shishu Hospital, Sylhet",
        dateTime: "2025-08-29T03:30:00.000Z",
        campFees: 100,
        participantCount: 5,
      },
    ],
  },
  {
    name: "Dr. Ahsan Kabir",
    specialization: "Cardiologist",
    image: "https://i.ibb.co.com/ZzhZCxy4/doctor-male.png",
    camps: [
      {
        campName: "Cardiac Check-Up Camp",
        location: "LifeCare Cardiology, Dhaka",
        dateTime: "2025-09-05T04:00:00.000Z",
        campFees: 300,
        participantCount: 3,
      },
    ],
  },
  {
    name: "Dr. Nusrat Jahan",
    specialization: "Gynecologist",
    image: "https://i.ibb.co.com/23XbRKVd/doctor-female-2.png",
    camps: [
      {
        campName: "Women’s Health Awareness Camp",
        location: "Maya Hospital, Barisal",
        dateTime: "2025-08-27T04:00:00.000Z",
        campFees: 200,
        participantCount: 1,
      },
    ],
  },
  {
    name: "Dr. Tanvir Hossain",
    specialization: "Dentist",
    image: "https://i.ibb.co.com/67wPgJKx/doctor-male-4.jpg",
    camps: [
      {
        campName: "Dental Hygiene Camp",
        location: "Smile Care Dental, Comilla",
        dateTime: "2025-09-03T09:00:00.000Z",
        campFees: 120,
        participantCount: 0,
      },
    ],
  },
  {
    name: "Dr. Fahmida Rahman",
    specialization: "Dermatologist",
    image: "https://i.ibb.co.com/rDRVZQ1/doctor-female-1.png",
    camps: [
      {
        campName: "DermaZone Clinic, Dhaka",
        location: "DermaZone Clinic, Dhaka",
        dateTime: "2025-08-30T04:00:00.000Z",
        campFees: 250,
        participantCount: 1,
      },
    ],
  },
  {
    name: "Dr. Jahangir Kabir",
    specialization: "Orthopedic Surgeon",
    image: "https://i.ibb.co.com/JF2xw3Hb/doctor-male-5.jpg",
    camps: [
      {
        campName: "Orthopedic Joint Pain Camp",
        location: "BoneCare Hospital, Khulna",
        dateTime: "2025-09-10T04:00:00.000Z",
        campFees: 300,
        participantCount: 0,
      },
    ],
  },
  {
    name: "Dr. Mahir Hasan",
    specialization: "Immunologist",
    image: "https://i.ibb.co.com/dwQRJ2ms/male-6.jpg",
    camps: [
      {
        campName: "COVID-19 Vaccine Camp",
        location: "National Health Center, Dhaka",
        dateTime: "2025-09-03T18:00:00.000Z",
        campFees: 0,
        participantCount: 0,
      },
    ],
  },
  {
    name: "Dr. Lubna Haque",
    specialization: "Eye Surgeon",
    image: "https://i.ibb.co.com/mmJpw3H/doc-fe-3.png",
    camps: [
      {
        campName: "Vision & Glaucoma Screening Camp",
        location: "LightHouse Eye Clinic, Rangpur",
        dateTime: "2025-09-06T05:00:00.000Z",
        campFees: 200,
        participantCount: 1,
      },
    ],
  },
];

const DoctorsSection = ({ isDarkMode }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [visibleCount, setVisibleCount] = useState(6);

  const handleSeeMore = () => setVisibleCount(doctors.length);
  const handleSeeLess = () => setVisibleCount(6);

  return (
    <section
      className={`py-16 transition-colors duration-500 ${
        isDarkMode ? "bg-slate-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className={`text-3xl md:text-4xl font-bold mb-12 transition-colors duration-500 ${
            isDarkMode ? "text-slate-100" : "text-black"
          }`}
        >
          Meet Our <span className="text-blue-400">Doctors</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {doctors.slice(0, visibleCount).map((doc, index) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className={`rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                isDarkMode ? "bg-slate-800" : "bg-white"
              }`}
            >
              <div className="w-56 h-56 mt-4 mx-auto overflow-hidden rounded-full">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 text-left">
                <h3
                  className={`text-xl font-semibold transition-colors duration-500 ${
                    isDarkMode ? "text-slate-100" : "text-gray-800"
                  }`}
                >
                  {doc.name}
                </h3>
                <p className="text-blue-400 font-medium">
                  {doc.specialization}
                </p>

                <div className="mt-4 space-y-3">
                  {doc.camps.map((camp, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg transition-colors duration-500 ${
                        isDarkMode ? "bg-slate-700" : "bg-gray-100"
                      }`}
                    >
                      <p
                        className={`font-semibold transition-colors duration-500 ${
                          isDarkMode ? "text-slate-100" : "text-gray-700"
                        }`}
                      >
                        {camp.campName}
                      </p>
                      <p
                        className={`text-sm flex items-center gap-2 transition-colors duration-500 ${
                          isDarkMode ? "text-slate-400" : "text-gray-600"
                        }`}
                      >
                        <EnvironmentOutlined /> {camp.location}
                      </p>
                      <p
                        className={`text-sm flex items-center gap-2 transition-colors duration-500 ${
                          isDarkMode ? "text-slate-400" : "text-gray-600"
                        }`}
                      >
                        <CalendarOutlined />{" "}
                        {new Date(camp.dateTime).toLocaleDateString()}
                      </p>
                      <p
                        className={`text-sm flex items-center gap-2 transition-colors duration-500 ${
                          isDarkMode ? "text-slate-400" : "text-gray-600"
                        }`}
                      >
                        <DollarOutlined />{" "}
                        {camp.campFees === 0 ? "Free" : `${camp.campFees} BDT`}
                      </p>
                      <p
                        className={`text-sm flex items-center gap-2 transition-colors duration-500 ${
                          isDarkMode ? "text-slate-400" : "text-gray-600"
                        }`}
                      >
                        <TeamOutlined /> {camp.participantCount} Participants
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleCount < doctors.length ? (
          <button
            onClick={handleSeeMore}
            className={`mt-8 px-6 py-3 rounded-full font-medium transition-colors duration-500 ${
              isDarkMode
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-blue-400 hover:bg-blue-400 text-white"
            }`}
          >
            See More
          </button>
        ) : (
          <button
            onClick={handleSeeLess}
            className={`mt-8 px-6 py-3 rounded-full font-medium transition-colors duration-500 ${
              isDarkMode
                ? "bg-gray-600 hover:bg-gray-500 text-white"
                : "bg-gray-400 hover:bg-gray-500 text-white"
            }`}
          >
            See Less
          </button>
        )}
      </div>
    </section>
  );
};

export default DoctorsSection;

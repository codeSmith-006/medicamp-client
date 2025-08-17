import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const res = await axios.get(
        "https://medicamp-server-jth3.onrender.com/feedback"
      );
      return res.data || [];
    },
  });

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isAutoPlaying && testimonials.length > 0) {
      const interval = setInterval(nextTestimonial, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  const getVisibleTestimonials = () => {
    if (testimonials.length === 0) return [];
    const visible = [];
    for (let i = 0; i < Math.min(3, testimonials.length); i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const getRandomColor = (name) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-red-500",
      "bg-teal-500",
      "bg-orange-500",
    ];
    let hash = 0;
    for (let i = 0; i < name?.length; i++) {
      hash = name?.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading testimonials...</div>;
  }

  if (!testimonials.length) {
    return <div className="text-center py-10">No testimonials available.</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 bg-gray-50 min-h-screen">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Testimonials</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hear what our participants have to say about their experience with our
          health camps
        </p>
      </motion.div>

      {/* Slider */}
      <div className="relative">
        {/* Navigation */}
        <div className="absolute top-0 right-0 flex space-x-2 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonial}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="p-3 rounded-full border-2 border-gray-300 bg-white hover:bg-gray-100 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonial}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-lg"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          <AnimatePresence mode="popLayout">
            {getVisibleTestimonials().map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    delay: index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                  },
                }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="text-gray-700 mb-6 leading-relaxed text-sm"
                >
                  {testimonial.feedback}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  className="flex items-center"
                >
                  <div
                    className={`w-12 h-12 rounded-full ${getRandomColor(
                      testimonial.participantName
                    )} flex items-center justify-center text-white font-semibold text-sm mr-4`}
                  >
                    {getInitials(testimonial.participantName)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">
                      {testimonial.participantName}
                    </h4>
                    <p className="text-gray-500 text-xs">
                      {testimonial.campName}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goToSlide(index)}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-indigo-600 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-full bg-gray-200 rounded-full h-1">
          <motion.div
            className="bg-indigo-600 h-1 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentIndex + 1) / testimonials.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Achievements */}
      <div className="text-center mt-4 md:mt-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-8"
        >
          Our <span className="text-indigo-600">Achievements</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {testimonials.length}+
              </div>
              <p className="text-gray-600">Happy Participants</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {(
                  testimonials.reduce((sum, t) => sum + t.rating, 0) /
                  testimonials.length
                ).toFixed(1)}
              </div>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {testimonials.filter((t) => t.rating === 5).length}
              </div>
              <p className="text-gray-600">5-Star Reviews</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsSlider;

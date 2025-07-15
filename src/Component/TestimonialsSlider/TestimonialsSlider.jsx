import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample testimonials data based on your structure
  const testimonials = [
    {
      _id: "687658d6d3f5c90ffd4c16f0",
      participantName: "Rehan Islam",
      campName: "Free Eye Check-Up Camp",
      feedback: "Pagedone is simply the best tool of investment in the market right now.",
      rating: 5,
      createdAt: "2025-07-15T13:34:14.577Z"
    },
    {
      _id: "687658d6d3f5c90ffd4c16f1",
      participantName: "Ethan Miller",
      campName: "Health Awareness Program",
      feedback: "I was hesitant to try pagedone at first, but I'm so glad I did - it's exceeded all of my expectations.",
      rating: 5,
      createdAt: "2025-07-14T10:20:30.123Z"
    },
    {
      _id: "687658d6d3f5c90ffd4c16f2",
      participantName: "Olivia Carter",
      campName: "Community Health Drive",
      feedback: "Pagedone stands out as the most user-friendly and effective solution I've ever used.",
      rating: 5,
      createdAt: "2025-07-13T15:45:22.456Z"
    },
    {
      _id: "687658d6d3f5c90ffd4c16f3",
      participantName: "Sarah Johnson",
      campName: "Medical Check-Up Camp",
      feedback: "The service quality was exceptional. Highly recommend to everyone looking for professional healthcare.",
      rating: 4,
      createdAt: "2025-07-12T09:15:10.789Z"
    },
    {
      _id: "687658d6d3f5c90ffd4c16f4",
      participantName: "David Wilson",
      campName: "Wellness Initiative",
      feedback: "Outstanding experience! The team was professional and the facilities were top-notch.",
      rating: 5,
      createdAt: "2025-07-11T14:30:45.321Z"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(nextTestimonial, 2000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
        }`}
      />
    ));
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const getRandomColor = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-teal-500',
      'bg-orange-500'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 bg-gray-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Testimonials</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hear what our participants have to say about their experience with our health camps
        </p>
      </motion.div>

      {/* Main Slider Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <div className="absolute top-0 right-0 flex space-x-2 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonial}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="p-3 rounded-full border-2 border-gray-300 bg-white hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonial}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 shadow-lg"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Testimonials Grid */}
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
                    stiffness: 100
                  }
                }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {/* Rating Stars */}
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Feedback */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="text-gray-700 mb-6 leading-relaxed text-sm"
                >
                  "{testimonial.feedback}"
                </motion.p>

                {/* User Info */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  className="flex items-center"
                >
                  <div className={`w-12 h-12 rounded-full ${getRandomColor(testimonial.participantName)} flex items-center justify-center text-white font-semibold text-sm mr-4`}>
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

        {/* Pagination Dots */}
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
                  ? 'bg-indigo-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-full bg-gray-200 rounded-full h-1">
          <motion.div
            className="bg-indigo-600 h-1 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Stats Section */}
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
              {(testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)}
            </div>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {testimonials.filter(t => t.rating === 5).length}
            </div>
            <p className="text-gray-600">5-Star Reviews</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TestimonialsSlider;
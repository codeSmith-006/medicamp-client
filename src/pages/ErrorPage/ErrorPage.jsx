import React from 'react';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Monitor with sad face */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="relative mb-8"
        >
          {/* Monitor base */}
          <div className="bg-gray-200 w-24 h-6 mx-auto rounded-b-lg"></div>
          <div className="bg-gray-300 w-16 h-4 mx-auto rounded-b-md"></div>
          
          {/* Monitor screen */}
          <div className="bg-gray-700 p-4 rounded-lg mx-auto w-64 h-48 relative -mt-2">
            <div className="bg-teal-500 w-full h-full rounded relative">
              {/* Sad face */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Eyes */}
                <div className="absolute top-12 left-16">
                  <motion.div
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0.1 }}
                    transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                    className="w-8 h-8 bg-gray-700 transform rotate-45 rounded-sm"
                  ></motion.div>
                </div>
                <div className="absolute top-12 right-16">
                  <motion.div
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0.1 }}
                    transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                    className="w-8 h-8 bg-gray-700 transform rotate-45 rounded-sm"
                  ></motion.div>
                </div>
                
                {/* Mouth */}
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute bottom-16"
                >
                  <svg width="60" height="30" viewBox="0 0 60 30">
                    <motion.path
                      d="M10 5 Q30 25 50 5"
                      stroke="#4a5568"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* 404 Error bubble */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5, type: "spring" }}
            className="absolute -top-4 -right-4 bg-white rounded-lg p-3 shadow-lg"
          >
            <div className="text-4xl font-bold text-gray-800">404</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Error</div>
            {/* Speech bubble tail */}
            <div className="absolute bottom-0 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white transform translate-y-full"></div>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-2xl font-bold text-gray-800 mb-4 tracking-wide"
        >
          SORRY, THE PAGE NOT FOUND
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="text-gray-700 mb-8 leading-relaxed"
        >
          The link you followed probably broken<br />
          or the page has been removed
        </motion.p>

        {/* Return button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          whileHover={{ scale: 1.05, backgroundColor: "#f97316" }}
          whileTap={{ scale: 0.95 }}
          className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => window.history.back()}
        >
          ▶ Return to Homepage
        </motion.button>
      </div>
    </div>
  );
};

export default ErrorPage;
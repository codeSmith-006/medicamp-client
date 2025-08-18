import React, { useState } from 'react';

// Mock react-hook-form
const useForm = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const register = (name, validation) => ({
    value: email,
    onChange: (e) => {
      setEmail(e.target.value);
      if (errors[name]) setErrors({});
    }
  });

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    if (!email) {
      setErrors({ email: { message: 'Email is required' } });
      return;
    }
    if (!/^\S+@\S+$/i.test(email)) {
      setErrors({ email: { message: 'Invalid email' } });
      return;
    }
    onSubmit({ email });
  };

  const reset = () => {
    setEmail('');
    setErrors({});
  };

  return { register, handleSubmit, formState: { errors }, reset };
};

// Mock framer-motion
const motion = {
  h2: ({ children, initial, whileInView, transition, className, ...props }) => (
    <h2 className={className} {...props}>{children}</h2>
  ),
  p: ({ children, initial, whileInView, transition, className, ...props }) => (
    <p className={className} {...props}>{children}</p>
  ),
  form: ({ children, initial, whileInView, transition, className, ...props }) => (
    <form className={className} {...props}>{children}</form>
  ),
  div: ({ children, initial, whileInView, transition, className, ...props }) => (
    <div className={className} {...props}>{children}</div>
  )
};

// Mock toast
const toast = {
  success: (message) => console.log('Success:', message)
};

// Mock Ant Design icon
const MailOutlined = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const NewsletterSection = ({ isDarkMode = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Subscribed Email:", data.email);
    toast.success(`Thank you for subscribing: ${data.email}`);
    reset();
  };

  return (
    <section
      className={`py-20 relative overflow-hidden transition-colors duration-500 ${
        isDarkMode ? "bg-slate-900" : "bg-gray-50"
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className={`absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 ${
          isDarkMode ? "bg-blue-600" : "bg-blue-400"
        }`} />
        <div className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl opacity-15 ${
          isDarkMode ? "bg-purple-600" : "bg-purple-400"
        }`} />
        
        {/* Floating Elements */}
        <div className={`absolute top-20 right-20 w-4 h-4 rounded-full ${
          isDarkMode ? "bg-slate-600" : "bg-gray-300"
        } opacity-60`} />
        <div className={`absolute bottom-32 left-20 w-2 h-2 rounded-full ${
          isDarkMode ? "bg-slate-500" : "bg-gray-400"
        } opacity-40`} />
        <div className={`absolute top-40 left-1/3 w-3 h-3 rounded-full ${
          isDarkMode ? "bg-slate-600" : "bg-gray-300"
        } opacity-50`} />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`rounded-3xl p-8 md:p-12 backdrop-blur-sm border transition-all duration-500 ${
              isDarkMode 
                ? "bg-slate-800/60 border-slate-700 shadow-2xl shadow-slate-900/20" 
                : "bg-white/80 border-gray-200 shadow-2xl shadow-gray-900/10"
            }`}
          >
            {/* Header */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                  isDarkMode ? "bg-blue-600/20 text-blue-400" : "bg-blue-100 text-blue-600"
                }`}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 7H4l5-5v5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${
                  isDarkMode ? "text-slate-100" : "text-gray-800"
                }`}
              >
                Stay in the Loop
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`text-lg leading-relaxed max-w-2xl mx-auto transition-colors duration-500 ${
                  isDarkMode ? "text-slate-400" : "text-gray-700"
                }`}
              >
                Get exclusive updates on upcoming medical camps, health tips, and community news delivered straight to your inbox.
              </motion.p>
            </div>

            {/* Newsletter Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Input Container */}
              <div className="relative max-w-md mx-auto">
                <div className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-300 focus-within:scale-105 ${
                  isDarkMode 
                    ? "border-slate-600 focus-within:border-blue-400 bg-slate-700" 
                    : "border-gray-300 focus-within:border-blue-400 bg-white"
                }`}>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MailOutlined
                      className={`transition-colors duration-500 ${
                        isDarkMode ? "text-slate-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                    })}
                    className={`w-full pl-12 pr-4 py-4 text-lg bg-transparent focus:outline-none transition-colors duration-500 ${
                      isDarkMode ? "text-slate-200 placeholder-slate-400" : "text-gray-900 placeholder-gray-500"
                    }`}
                  />
                </div>
                
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 text-center"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl bg-blue-400 hover:bg-blue-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-400/20"
                >
                  <span className="relative z-10">Subscribe Now</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  
                  {/* Button Background Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex items-center justify-center space-x-6 pt-6"
              >
                <div className="flex items-center space-x-2">
                  <svg className={`w-4 h-4 ${isDarkMode ? "text-green-400" : "text-green-600"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-600"}`}>
                    No spam
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className={`w-4 h-4 ${isDarkMode ? "text-green-400" : "text-green-600"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-600"}`}>
                    Unsubscribe anytime
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className={`w-4 h-4 ${isDarkMode ? "text-green-400" : "text-green-600"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className={`text-sm ${isDarkMode ? "text-slate-400" : "text-gray-600"}`}>
                    Weekly updates
                  </span>
                </div>
              </motion.div>
            </motion.div>
            </motion.div>
          </div>
        </div>
      
    </section>
  );
};

export default NewsletterSection;
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { MailOutlined } from "@ant-design/icons";

const NewsletterSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Subscribed Email:", data.email);
    alert(`Thank you for subscribing: ${data.email}`);
    reset();
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 :text-gray-200 mb-4"
        >
          Stay Updated!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-700 :text-gray-400 mb-8"
        >
          Subscribe to our newsletter to get the latest medical camp updates and
          news.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-center items-center gap-4"
        >
          <div className="relative w-full md:w-96">
            <MailOutlined className="absolute left-3 top-3 text-gray-400 :text-gray-300" />
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 :border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 :bg-[#2F2F2F] :text-gray-200"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default NewsletterSection;

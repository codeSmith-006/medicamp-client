import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Card, Spin } from "antd";
import { motion } from "framer-motion";
import axios from "axios";
import axiosSecure from "../../Hooks/AxiousSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const fetchLoggedInUser = async () => {
  const res = await axiosSecure.get("/users");
  return res.data;
};

const Participant = () => {
  const [photoUrl, setPhotoUrl] = useState("https://i.pravatar.cc/150?img=3");
  const [uploading, setUploading] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch user data via TanStack Query
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["loggedInUser"],
    queryFn: fetchLoggedInUser,
  });

  // Set default values when user is fetched
  useEffect(() => {
    if (user) {
      console.log("User:", user);

      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        emergencyContact: user.emergencyContact || "",
        age: user.age || "",
        gender: user.gender || "",
        bloodGroup: user.bloodGroup || "",
        organization: user.organization || "",
        designation: user.designation || "",
      });

      setPhotoUrl(user.photoUrl || "");
    }
  }, [user, reset]);

  // console.log("User: ", user);

  const onSubmit = async (data) => {
    const finalProfile = { ...data, photoUrl };

    try {
      const res = await axiosSecure.patch(
        "/users/participants-profile",
        finalProfile
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Profile updated successfully!");

        // ✅ Invalidate React Query cache to refetch updated data in Navbar
        queryClient.invalidateQueries({ queryKey: ["user", user?.email] });
      } else {
        toast.info("No changes made.");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile.");
    }
  };

  const handleImageSubmit = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file); // Cloudinary requires this key name
    formData.append("upload_preset", "carecamp_unsigned"); // 👈 change this

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dlr8t4tyc/image/upload",
        formData
      );

      const imageUrl = res.data?.secure_url;
      if (imageUrl) {
        setPhotoUrl(imageUrl); // Set preview
        // setValue("photoUrl", imageUrl); // Uncomment if using react-hook-form
        toast.success("Image uploaded successfully!");
        console.log("Image URL from upload button:", imageUrl);
      } else {
        toast.error("Image upload failed. No URL returned.");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 mt-10">
        Failed to load user: {error.toast}
      </div>
    );
  }

  const SectionHeader = ({ icon, title }) => (
    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b border-gray-100">
      <span className="text-xl sm:text-2xl">{icon}</span>
      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">
        {title}
      </h3>
    </div>
  );

  const InputField = ({ label, error, children, required = false }) => (
    <div className="space-y-1 sm:space-y-2">
      <label className="block text-xs sm:text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8"
    >
      <Helmet>
        <title>Profile | Dashboard | MCMS</title>
      </Helmet>

      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 lg:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Profile Settings
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Manage your personal information and preferences
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 sm:space-y-8"
      >
        {/* Basic Info Section */}
        <Card className="shadow-sm border border-gray-200 rounded-xl overflow-hidden p-4 sm:p-6 lg:p-8">
          <SectionHeader icon="👤" title="Basic Info" />

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <div className="relative">
              {uploading ? (
                <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full bg-gray-100 flex items-center justify-center">
                  <Spin size="large" />
                </div>
              ) : (
                <img
                  src={photoUrl || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 object-cover rounded-full ring-4 ring-gray-100 shadow-lg"
                />
              )}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSubmit}
                    className="hidden"
                  />
                  <div className="bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg whitespace-nowrap">
                    {uploading ? "Uploading..." : "Change Photo"}
                  </div>
                </label>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 sm:mt-4 text-center px-4">
              Upload a profile photo (JPG/PNG, max 5MB)
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <InputField label="Full Name" error={errors.name} required>
              <input
                type="text"
                placeholder="Enter your full name"
                {...register("name", { required: "Name is required" })}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
              />
            </InputField>

            <InputField label="Email Address" error={errors.email}>
              <input
                type="email"
                placeholder="your.email@example.com"
                disabled
                {...register("email")}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base bg-gray-50 cursor-not-allowed text-gray-600"
              />
            </InputField>
          </div>
        </Card>

        {/* Contact Info Section */}
        <Card className="shadow-sm border border-gray-200 rounded-xl overflow-hidden p-4 sm:p-6 lg:p-8">
          <SectionHeader icon="📞" title="Contact Info" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <InputField label="Phone Number" error={errors.phone}>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register("phone", {
                  pattern: {
                    value: /^[0-9+\-\s()]{6,20}$/,
                    message: "Invalid phone number",
                  },
                })}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
              />
            </InputField>

            <InputField
              label="Emergency Contact"
              error={errors.emergencyContact}
            >
              <input
                type="tel"
                placeholder="+1 (555) 987-6543"
                {...register("emergencyContact", {
                  pattern: {
                    value: /^[0-9+\-\s()]{6,20}$/,
                    message: "Invalid phone number",
                  },
                })}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
              />
            </InputField>

            <div className="lg:col-span-2">
              <InputField label="Address" error={errors.address}>
                <textarea
                  placeholder="Enter your full address"
                  {...register("address")}
                  rows={3}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 resize-none"
                />
              </InputField>
            </div>
          </div>
        </Card>

        {/* Role-Based Info Section */}
        <Card className="shadow-sm border border-gray-200 rounded-xl overflow-hidden p-4 sm:p-6 lg:p-8">
          <SectionHeader icon="🧑" title="Role-Based Info" />

          {/* Participant Fields */}
          <div className="mb-6 sm:mb-8">
            <h4 className="text-sm sm:text-base font-medium text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
              <span>Participant Information</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <InputField label="Age" error={errors.age}>
                <input
                  type="number"
                  placeholder="25"
                  {...register("age", {
                    min: { value: 1, message: "Age must be at least 1" },
                    max: { value: 120, message: "Age must be less than 120" },
                  })}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                />
              </InputField>

              <InputField label="Gender" error={errors.gender}>
                <select
                  {...register("gender")}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </InputField>

              <div className="sm:col-span-2 lg:col-span-1">
                <InputField label="Blood Group" error={errors.bloodGroup}>
                  <select
                    {...register("bloodGroup")}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </InputField>
              </div>
            </div>
          </div>

          {/* Organizer Fields */}
          <div>
            <h4 className="text-sm sm:text-base font-medium text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
              <span>Organizer Information</span>
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <InputField label="Organization" error={errors.organization}>
                <input
                  type="text"
                  placeholder="Your organization name"
                  {...register("organization")}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                />
              </InputField>

              <InputField label="Designation" error={errors.designation}>
                <input
                  type="text"
                  placeholder="Your job title/position"
                  {...register("designation")}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400"
                />
              </InputField>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center pt-4 sm:pt-6 pb-4 sm:pb-0">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-none px-8 sm:px-12 py-2 sm:py-3 h-auto text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
          >
            {isSubmitting ? "Updating Profile..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default Participant;

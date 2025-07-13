import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Card, Spin } from "antd";
import { motion } from "framer-motion";
import axios from "axios";
import axiosSecure from "../../Hooks/AxiousSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
      });

      setPhotoUrl(user.photoUrl || "");
    }
  }, [user, reset]);

  console.log("User: ", user)

const onSubmit = async (data) => {
  const finalProfile = { ...data, photoUrl };

  try {
    const res = await axiosSecure.patch("/users/participants-profile", finalProfile);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto mt-10"
    >
      <Card bordered={false} className="shadow-xl rounded-xl">
        <div className="flex flex-col items-center text-center space-y-4">
          {uploading ? (
            <Spin size="large" />
          ) : (
            <img
              src={photoUrl || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-28 h-28 object-cover rounded-full animated-image-border"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {photoUrl ? "Preview Image" : "Upload Image"}
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-[#d9d9d9] rounded-md shadow-sm text-base transition-all duration-200 focus:outline-none focus:ring-0.5 focus:ring-[#4096ff] focus:border-[#4096ff]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.toast}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              disabled
              {...register("email")}
              className="w-full px-4 py-2 border border-[#d9d9d9] rounded-md shadow-sm text-base bg-gray-100 cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#4096ff] focus:border-[#4096ff]"
            />
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              placeholder="Phone Number (optional)"
              {...register("phone", {
                pattern: {
                  value: /^[0-9+\-\s()]{6,20}$/,
                  toast: "Invalid phone number",
                },
              })}
              className="w-full px-4 py-2 border border-[#d9d9d9] rounded-md shadow-sm text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#4096ff] focus:border-[#4096ff]"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.toast}</p>
            )}
          </div>

          {/* Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSubmit}
              className="w-full px-4 py-[7px] border border-[#d9d9d9] rounded-md shadow-sm text-base bg-white file:mr-4 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-[#4096ff] file:text-white transition-all duration-200"
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload a profile photo (JPG/PNG)
            </p>
          </div>

          {/* Submit */}
          <Button
            type="primary"
            block
            size="large"
            htmlType="submit"
            loading={isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Update Profile
          </Button>
        </form>
      </Card>
    </motion.div>
  );
};

export default Participant;

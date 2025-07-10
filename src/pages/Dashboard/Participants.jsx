import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Card, message, Spin } from "antd";
import { motion } from "framer-motion";
import axios from "axios";
import axiosSecure from "../../Hooks/AxiousSecure";
import { useQuery } from "@tanstack/react-query";

const fetchLoggedInUser = async () => {
  const res = await axiosSecure.get("/users");
  return res.data;
};

const Participant = () => {
  const [photoUrl, setPhotoUrl] = useState("https://i.pravatar.cc/150?img=3");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
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
      console.log(user)
      setValue("name", user.name);
      setValue("email", user.email);
      setPhotoUrl(user.photoUrl);
    }
  }, [user, setValue]);

  const onSubmit = (data) => {
    const finalProfile = { ...data, photo: photoUrl };
    console.log("Updated Profile:", finalProfile);
    message.success("Profile updated successfully!");
    // API call to update the profile can be added here
  };

  const handleImageSubmit = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=0e04c002726999826a7cb12080231439",
        formData
      );

      const imageUrl = response.data.data.display_url;
      setPhotoUrl(imageUrl);
      message.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Image upload failed");
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
        Failed to load user: {error.message}
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
              className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500"
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
            <Input
            defaultValue={name}
              placeholder="Full Name"
              size="large"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Input
              placeholder="Email Address"
              size="large"
              disabled
              {...register("email")}
            />
          </div>

          {/* Phone */}
          <div>
            <Input
              placeholder="Phone Number (optional)"
              size="large"
              {...register("phone", {
                pattern: {
                  value: /^[0-9+\-\s()]{6,20}$/,
                  message: "Invalid phone number",
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Upload */}
          <div>
            <Input
              type="file"
              accept="image/*"
              size="large"
              onChange={handleImageSubmit}
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

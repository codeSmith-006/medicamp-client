import React, { use, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Card, DatePicker, InputNumber, Spin } from "antd";
import toast from "react-hot-toast";
// import axiosSecure from "../../../Hooks/AxiousSecure";
import TextArea from "antd/es/input/TextArea";
import { motion } from "framer-motion";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import { Helmet } from "react-helmet-async";

const AddCamp = () => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const imageInputRef = useRef(null);
  const { user } = use(AuthContext);

  // fade up animation
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "carecamp_unsigned");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dlr8t4tyc/image/upload",
        formData
      );
      const url = res.data?.secure_url;
      if (url) {
        setImageUrl(url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("No image URL returned.");
      }
    } catch (err) {
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!imageUrl) {
      toast.error("Please upload an image.");
      return;
    }

    const campData = {
      addedBy: user?.email,
      campName: data.campName,

      image: imageUrl,
      campFees: Number(data.campFees),
      dateTime: data.dateTime ? data.dateTime.toISOString() : null,
      location: data.location,
      healthcareProfessional: data.healthcareProfessional,
      description: data.description,
      participantCount: 0,
    };

    // Commented out server request, just logging for now
    console.log("Camp data: ", campData);

    // post camps data to the database
    try {
      const response = await axios.post(
        "https://medicamp-server-jth3.onrender.com/camps",
        campData
      );

      if (response.data?.insertedId) {
        toast.success("Camp added successfully");
        setImageUrl("");
        if (imageInputRef.current) {
          imageInputRef.current.value = "";
        }
        reset();
      }
    } catch (error) {
      console.log("Error while posting data to db: ", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto mt-14 px-4 sm:px-0"
    >
      <Helmet>
        <title>Add Camp | Dashboard | MCMS</title>
      </Helmet>
      <Card
        title={
          <h2 className="text-3xl font-semibold text-indigo-700 flex items-center gap-2">
            🏕️ Add A Camp
          </h2>
        }
        className="rounded-xl shadow-2xl"
        bodyStyle={{ padding: "2rem" }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Camp Name */}
          <motion.div {...fadeInUp}>
            <label
              htmlFor="campName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Camp Name <span className="text-red-500">*</span>
            </label>
            <Controller
              name="campName"
              control={control}
              rules={{ required: "Camp name is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="campName"
                  placeholder="Enter camp name"
                  size="large"
                  status={errors.campName ? "error" : ""}
                />
              )}
            />
            {errors.campName && (
              <p className="mt-1 text-xs text-red-600">
                {errors.campName.message}
              </p>
            )}
          </motion.div>

          {/* Camp Fees */}
          <motion.div {...fadeInUp}>
            <label
              htmlFor="campFees"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Camp Fees (BDT) <span className="text-red-500">*</span>
            </label>
            <Controller
              name="campFees"
              control={control}
              rules={{
                required: "Camp fee is required",
                min: { value: 0, message: "Fee must be non-negative" },
              }}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  id="campFees"
                  min={0}
                  className="w-full"
                  placeholder="Enter camp fee"
                  size="large"
                  status={errors.campFees ? "error" : ""}
                />
              )}
            />
            {errors.campFees && (
              <p className="mt-1 text-xs text-red-600">
                {errors.campFees.message}
              </p>
            )}
          </motion.div>

          {/* Date & Time */}
          <motion.div {...fadeInUp}>
            <label
              htmlFor="dateTime"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Date & Time <span className="text-red-500">*</span>
            </label>
            <Controller
              name="dateTime"
              control={control}
              rules={{ required: "Date & time is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  id="dateTime"
                  showTime
                  className="w-full"
                  size="large"
                  value={field.value || null}
                  onChange={(value) => field.onChange(value)}
                  placeholder="Select date & time"
                  status={errors.dateTime ? "error" : ""}
                />
              )}
            />
            {errors.dateTime && (
              <p className="mt-1 text-xs text-red-600">
                {errors.dateTime.message}
              </p>
            )}
          </motion.div>

          {/* Location */}
          <motion.div {...fadeInUp}>
            <label
              htmlFor="location"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Location <span className="text-red-500">*</span>
            </label>
            <Controller
              name="location"
              control={control}
              rules={{ required: "Location is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="location"
                  placeholder="Enter camp location"
                  size="large"
                  status={errors.location ? "error" : ""}
                />
              )}
            />
            {errors.location && (
              <p className="mt-1 text-xs text-red-600">
                {errors.location.message}
              </p>
            )}
          </motion.div>

          {/* Healthcare Professional Name */}
          <motion.div {...fadeInUp}>
            <label
              htmlFor="healthcareProfessional"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Healthcare Professional Name{" "}
              <span className="text-red-500">*</span>
            </label>
            <Controller
              name="healthcareProfessional"
              control={control}
              rules={{ required: "Professional name required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="healthcareProfessional"
                  placeholder="Enter healthcare professional name"
                  size="large"
                  status={errors.healthcareProfessional ? "error" : ""}
                />
              )}
            />
            {errors.healthcareProfessional && (
              <p className="mt-1 text-xs text-red-600">
                {errors.healthcareProfessional.message}
              </p>
            )}
          </motion.div>

          {/* Description */}
          <motion.div {...fadeInUp}>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <TextArea
                  {...field}
                  id="description"
                  rows={5}
                  placeholder="Enter camp description"
                  size="large"
                  status={errors.description ? "error" : ""}
                />
              )}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </motion.div>

          {/* Image Upload */}
          <motion.div {...fadeInUp}>
            <label
              htmlFor="imageUpload"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Camp Image <span className="text-red-500">*</span>
            </label>
            <input
              id="imageUpload"
              type="file"
              ref={imageInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-3 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {uploading && <Spin className="mt-3" />}
            {imageUrl && (
              <motion.img
                key={imageUrl}
                src={imageUrl}
                alt="Uploaded camp"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-4 w-52 h-32 object-cover rounded-md shadow-md"
              />
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div {...fadeInUp}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              disabled={uploading}
              loading={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 font-semibold text-lg"
              style={{ borderRadius: "0.5rem" }}
            >
              ➕ Add Camp
            </Button>
          </motion.div>
        </form>
      </Card>
    </motion.div>
  );
};

export default AddCamp;

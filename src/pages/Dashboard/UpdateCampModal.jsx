import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, DatePicker, InputNumber, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import dayjs from "dayjs";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const UpdateCampModal = ({ camp, onClose, onUpdated }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      campName: camp.campName,
      campFees: camp.campFees,
      dateTime: camp.dateTime ? dayjs(camp.dateTime) : null,
      location: camp.location,
      healthcareProfessional: camp.healthcareProfessional,
      description: camp.description,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const updateData = {
        ...data,
        campFees: Number(data.campFees),
        dateTime: data.dateTime ? data.dateTime.toISOString() : null,
      };

      console.log("updated data: ", updateData);

      // patch request to update camp
      await axios.patch(
        `https://medicamp-server-jth3.onrender.com/camps/${camp._id}`,
        updateData
      );

      toast.success("Camp updated successfully");
      onUpdated();
      onClose();
    } catch (error) {
      toast.error("Failed to update camp", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal modal-open modal-bottom sm:modal-middle">
      <motion.div
        className="modal-box max-w-3xl p-6"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <h3 className="font-bold text-xl text-indigo-700 mb-4">
          ✏️ Update Camp
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Camp Name */}
          <div>
            <label className="block mb-1 font-medium">Camp Name *</label>
            <Controller
              name="campName"
              control={control}
              rules={{ required: "Camp name is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Camp Name"
                  size="large"
                  status={errors.campName ? "error" : ""}
                />
              )}
            />
            {errors.campName && (
              <p className="text-xs text-red-600 mt-1">
                {errors.campName.message}
              </p>
            )}
          </div>

          {/* Camp Fees */}
          <div>
            <label className="block mb-1 font-medium">Camp Fees (BDT) *</label>
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
                  min={0}
                  className="w-full"
                  placeholder="Camp Fee"
                  size="large"
                  status={errors.campFees ? "error" : ""}
                />
              )}
            />
            {errors.campFees && (
              <p className="text-xs text-red-600 mt-1">
                {errors.campFees.message}
              </p>
            )}
          </div>

          {/* Date & Time */}
          <div>
            <label className="block mb-1 font-medium">Date & Time *</label>
            <Controller
              name="dateTime"
              control={control}
              rules={{ required: "Date & time is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
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
              <p className="text-xs text-red-600 mt-1">
                {errors.dateTime.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1 font-medium">Location *</label>
            <Controller
              name="location"
              control={control}
              rules={{ required: "Location is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Location"
                  size="large"
                  status={errors.location ? "error" : ""}
                />
              )}
            />
            {errors.location && (
              <p className="text-xs text-red-600 mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Healthcare Professional */}
          <div>
            <label className="block mb-1 font-medium">
              Healthcare Professional Name *
            </label>
            <Controller
              name="healthcareProfessional"
              control={control}
              rules={{ required: "Healthcare professional is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Healthcare Professional Name"
                  size="large"
                  status={errors.healthcareProfessional ? "error" : ""}
                />
              )}
            />
            {errors.healthcareProfessional && (
              <p className="text-xs text-red-600 mt-1">
                {errors.healthcareProfessional.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description *</label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <TextArea
                  {...field}
                  rows={5}
                  placeholder="Description"
                  size="large"
                  status={errors.description ? "error" : ""}
                />
              )}
            />
            {errors.description && (
              <p className="text-xs text-red-600 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Participant Count (readonly) */}
          <div>
            <label className="block mb-1 font-medium">
              Participant Count (Read Only)
            </label>
            <Input
              value={camp.participantCount}
              readOnly
              size="large"
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading || isSubmitting}
              className="px-5 py-2 rounded-2xl border cursor-pointer border-gray-300 bg-white text-gray-800 hover:bg-gray-100 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="px-6 py-2 rounded-2xl bg-blue-500 cursor-pointer text-white hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow"
            >
              {loading || isSubmitting ? "Updating..." : "Update Camp"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateCampModal;

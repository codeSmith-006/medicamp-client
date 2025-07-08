import { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Input } from "../Input/input";
import { Button } from "../Button/button";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import GradientButton from "../GradientButton/GradientButton";
import { FaUserPlus } from "react-icons/fa";

// Helper for password strength
const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "Too weak" };

  const lengthCheck = password.length >= 8;
  const upperCheck = /[A-Z]/.test(password);
  const lowerCheck = /[a-z]/.test(password);
  const numberCheck = /\d/.test(password);
  const symbolCheck = /[^A-Za-z0-9]/.test(password);

  const checks = [lengthCheck, upperCheck, lowerCheck, numberCheck, symbolCheck];
  const score = checks.filter(Boolean).length;

  const labels = [
    "Too weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Very Strong",
  ];

  return {
    score,
    label: labels[score],
  };
};

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Only JPG/PNG files are allowed!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const RegisterForm = ({ onSwitch }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const name = watch("name");
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const photoUrl = watch("photoUrl");

  const { score: strengthScore, label: strengthLabel } = getPasswordStrength(password);
  const passwordsMatch = password === confirmPassword;
  const allValid = name && email && photoUrl && passwordsMatch && strengthScore >= 4;

  const handleUpload = async ({ file }) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=0e04c002726999826a7cb12080231439`,
        formData
      );
      const imgUrl = res.data.data.url;
      setPreview(imgUrl);
      setValue("photoUrl", imgUrl);
      toast.success("Image uploaded!");
    } catch (err) {
      message.error("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const onSubmit = (data) => {
    console.log("Register:", data);
    toast.success("Registered successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-6 bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Create Your Account
      </h2>

      {/* Profile Upload with text beside */}
      <div className="flex items-center gap-4">
        <div className="shrink-0">
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            customRequest={handleUpload}
            beforeUpload={beforeUpload}
          >
            {preview ? (
              <img
                src={preview}
                alt="avatar"
                className="rounded-full object-cover"
                style={{ width: "80px", height: "80px" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
          <input
            type="hidden"
            {...register("photoUrl", { required: "Profile photo is required" })}
          />
        </div>

        <div className="text-sm">
          <p className="font-medium text-gray-800">Upload your profile photo</p>
          <p className="text-gray-500">
            This photo will appear on your dashboard.
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <Input
          placeholder="Full Name"
          {...register("name", { required: "Name is required" })}
          className="bg-transparent border border-gray-300 text-gray-900 placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Input
          placeholder="Email"
          type="email"
          {...register("email", { required: "Email is required" })}
          className="bg-transparent border border-gray-300 text-gray-900 placeholder-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="relative">
          <Input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            className="bg-transparent border border-gray-300 text-gray-900 placeholder-gray-400 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {password && (
            <p className={`text-sm mt-1 ${strengthScore < 4 ? "text-red-500" : "text-green-600"}`}>
              Strength: {strengthLabel}
            </p>
          )}
        </div>

        <div className="relative">
          <Input
            placeholder="Confirm Password"
            type={showConfirm ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Confirm your password",
            })}
            className="bg-transparent border border-gray-300 text-gray-900 placeholder-gray-400 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {confirmPassword && (
            <p className={`text-sm mt-1 ${passwordsMatch ? "text-green-600" : "text-red-500"}`}>
              {passwordsMatch ? "Passwords match" : "Passwords do not match"}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <GradientButton
          type="submit"
          text="Register"
          icon={<FaUserPlus />}
          disabled={!allValid}
        />
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center gap-2 justify-center"
      >
        <FcGoogle size={18} />
        Continue with Google
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <NavLink to="/join-us">
          <button
            type="button"
            onClick={onSwitch}
            className="text-blue-600 hover:underline font-medium"
          >
            Log In
          </button>
        </NavLink>
      </p>
    </form>
  );
};

export default RegisterForm;

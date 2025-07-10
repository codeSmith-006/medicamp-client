import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Input } from "../Input/input";
import { Button } from "../Button/button";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import GradientButton from "../GradientButton/GradientButton";
import { FaUserPlus } from "react-icons/fa";
import AuthContext from "../../Context/AuthContext";
import { createUser } from "../../APIs/usersApi";

// Helper for password strength
const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "Too weak" };

  const lengthCheck = password.length >= 8;
  const upperCheck = /[A-Z]/.test(password);
  const lowerCheck = /[a-z]/.test(password);
  const numberCheck = /\d/.test(password);
  const symbolCheck = /[^A-Za-z0-9]/.test(password);

  const checks = [
    lengthCheck,
    upperCheck,
    lowerCheck,
    numberCheck,
    symbolCheck,
  ];
  const score = checks.filter(Boolean).length;

  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];

  return {
    score,
    label: labels[score],
  };
};

// checks the uploaded file is only png or jpg
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Only JPG/PNG files are allowed!");
  }
  return isJpgOrPng;
};

const RegisterForm = ({ onSwitch }) => {
  // main submitted data for registration
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  // navigate
  const navigate = useNavigate();

  // getting register with email
  const { registerWithEmail, loginWithGoogle, authLoading, updateUserProfile } =
    use(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  // loading for google login
  const [googleLoading, setGoogleLoading] = useState(null);
  // loading for email password login
  const [emailLoading, setEmailLoading] = useState(null);

  const name = watch("name");
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const photoUrl = watch("photoUrl");

  const { score: strengthScore, label: strengthLabel } =
    getPasswordStrength(password);
  const passwordsMatch = password === confirmPassword;
  const allValid =
    name && email && photoUrl && passwordsMatch && strengthScore >= 4;

  // handling image upload
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

  // styles for upload button
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  // submitting the form
  const onSubmit = async (data) => {
    setEmailLoading(true);
    const { email, password, name, photoUrl } = data;

    try {
      const result = await registerWithEmail(email, password);

      if (result.user) {
        // Update user profile with name and photo URL
        await updateUserProfile({ displayName: name, photoURL: photoUrl });

        setEmailLoading(false);
        navigate("/");

        // sending the users data to the backend
        const payload = {
          name,
          email,
          photoUrl,
          role: "user",
        };

        try {
          const result = await createUser(payload);
          console.log(result);
          if (result?.insertedId) {
            toast.success("Registered successfully!");
          }
        } catch (error) {
          console.log("Error while post users data to database: ", error);
        }
      }
    } catch (error) {
      console.error("Error while registration with email and password:", error);
      setEmailLoading(false);
      toast.error(error.message || "Registration failed");
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const result = await loginWithGoogle();

      console.log("Google login success:", result.user);

      if (result.user) {
        const { displayName, email, photoURL } = result.user;

        // Prepare payload for backend
        const payload = {
          name: displayName,
          email,
          photoUrl: photoURL,
          role: "user", // default role
        };

        try {
          const response = await createUser(payload);
          console.log("User creation result:", response);

          if (response?.insertedId || response?.acknowledged) {
            toast.success("Registered successfully!");
          } else {
            toast.info("Welcome back!");
          }
        } catch (error) {
          console.error("Error while sending user to backend:", error);
          toast.error("Failed to save user to database.");
        }

        toast.success("Logged in with Google!");
        setGoogleLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Google login error:", error);
      setGoogleLoading(false);
      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-6 bg-transparent backdrop-blur-md  rounded-lg px-6 py-8"
    >
      <h2 className="text-2xl font-bold text-center text-white">
        Create Your Account
      </h2>

      {/* Profile Upload */}
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
                style={{ width: "72px", height: "72px" }}
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
          <p className="font-medium text-white">Upload your profile photo</p>
          <p className="text-white/80">This will appear on your dashboard.</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <Input
          placeholder="Full Name"
          {...register("name", { required: "Name is required" })}
          className="bg-white/10 text-white placeholder-white border border-white/30 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <Input
          placeholder="Email"
          type="email"
          {...register("email", { required: "Email is required" })}
          className="bg-white/10 text-white placeholder-white border border-white/30 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
        />

        {/* Password */}
        <div>
          <div className="relative">
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="bg-white/10 text-white placeholder-white border border-white/30 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="h-5 mt-1">
            {password && (
              <p
                className={`text-sm ${
                  strengthScore < 4 ? "text-red-400" : "text-green-400"
                }`}
              >
                Strength: {strengthLabel}
              </p>
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <div className="relative">
            <Input
              placeholder="Confirm Password"
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm your password",
              })}
              className="bg-white/10 text-white placeholder-white border border-white/30 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="h-5 mt-1">
            {confirmPassword && (
              <p
                className={`text-sm ${
                  passwordsMatch ? "text-green-400" : "text-red-400"
                }`}
              >
                {passwordsMatch ? "Passwords match" : "Passwords do not match"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <GradientButton
          type="submit"
          text={
            emailLoading ? (
              <span className="loading loading-spinner loading-md" />
            ) : (
              "Register"
            )
          }
          icon={!emailLoading ? <FaUserPlus /> : ""}
          disabled={!allValid}
        />
      </div>

      {/* Google Login Button */}
      <Button
        type="button"
        onClick={handleGoogleLogin}
        variant="outline"
        className="w-full flex items-center gap-2 justify-center bg-white text-gray-800 hover:bg-gray-100 font-medium shadow-sm"
      >
        {!googleLoading ? (
          <>
            <FcGoogle size={18} />
            Continue with Google
          </>
        ) : (
          <span className="loading loading-spinner loading-md" />
        )}
      </Button>

      {/* Switch to Log In */}
      <p className="text-center text-sm text-white/80">
        Already have an account?{" "}
        <NavLink to="/join-us">
          <button
            type="button"
            onClick={onSwitch}
            className="text-blue-300 hover:underline font-medium"
          >
            Log In
          </button>
        </NavLink>
      </p>
    </form>
  );
};

export default RegisterForm;

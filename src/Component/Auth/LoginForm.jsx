import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../Input/input";
import { Button } from "../Button/button";
import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import toast from "react-hot-toast";
import GradientButton from "../GradientButton/GradientButton";
import { FaSignInAlt } from "react-icons/fa";
import AuthContext from "../../Context/AuthContext";
import { createUser } from "../../APIs/usersApi";
import axios from "axios";

const LoginForm = ({ onSwitch }) => {
  // navigate
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const { login, loginWithGoogle, updateUserProfile, setUser } =
    use(AuthContext);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Step 1: Firebase Login
      const result = await login(data.email, data.password);

      if (result.user) {
        const loggedUser = result.user;
        toast.success("Logged in successfully!");

        // Step 2: Get JWT from your backend
        const jwtResponse = await axios.post(
          "https://medicamp-server-jth3.onrender.com/jwt",
          {
            email: loggedUser.email,
          }
        );

        const token = jwtResponse.data?.token;

        if (token) {
          localStorage.setItem("token", token);
          setUser(loggedUser);
        }
        // Step 5: Redirect
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);

    try {
      const result = await loginWithGoogle();
      const user = result?.user;

      if (user) {
        const { displayName, email, photoURL } = user;

        // 1️⃣ Prepare payload for DB sync
        const payload = {
          name: displayName,
          email,
          photoUrl: photoURL,
          role: "user", // default role
        };

        // 2️⃣ Sync user to your MongoDB via backend
        try {
          const res = await createUser(payload);
          console.log("User sync result:", res);

          if (res?.insertedId || res?.acknowledged) {
            toast.success("Registered successfully!");
          } else {
            toast.info("Welcome back!");
          }
        } catch (error) {
          console.error("Error while saving user to DB:", error);
          toast.error("User sync failed.");
        }

        // 3️⃣ Get JWT token from backend
        try {
          const jwtRes = await axios.post(
            `https://medicamp-server-jth3.onrender.com/jwt`,
            {
              email, // send only email to issue token
            }
          );

          const token = jwtRes.data?.token;

          if (token) {
            // 4️⃣ Store token in localStorage
            localStorage.setItem("token", token);
            setUser(user);
            console.log("JWT Token stored:", token);
          } else {
            toast.error("Failed to receive JWT token.");
          }
        } catch (jwtError) {
          console.error("JWT token request failed:", jwtError);
          toast.error("Authentication token generation failed.");
        }

        // 5️⃣ Navigate after everything is successful
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.message || "Google login failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-6 bg-transparent backdrop-blur-md rounded-lg px-6 py-8"
    >
      <h2 className="text-2xl font-bold text-center text-white">Log In</h2>

      <div className="space-y-4">
        <div>
          <Input
            placeholder="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email address",
              },
            })}
            className={`bg-white/10 text-white placeholder-white border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white w-full ${
              errors.email ? "border-red-400" : "border-white/30"
            }`}
          />
          {errors.email && (
            <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`bg-white/10 text-white placeholder-white border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-white w-full ${
                errors.password ? "border-red-400" : "border-white/30"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-300 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <GradientButton
          type="submit"
          text={isLoading ? "Logging in..." : "Login"}
          icon={<FaSignInAlt />}
          disabled={isLoading}
        />
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleLogin}
        className="w-full flex items-center gap-2 justify-center bg-white text-gray-800 hover:bg-gray-100 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGoogleLoading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          <div className="flex items-center gap-2">
            <FcGoogle size={18} />
            <p>Continue with Google</p>
          </div>
        )}
      </Button>

      <p className="text-center text-sm text-white/80">
        Don't have an account?{" "}
        <NavLink to="/register">
          <button
            type="button"
            onClick={onSwitch}
            className="text-blue-300 hover:underline font-medium"
          >
            Sign Up
          </button>
        </NavLink>
      </p>
    </form>
  );
};

export default LoginForm;

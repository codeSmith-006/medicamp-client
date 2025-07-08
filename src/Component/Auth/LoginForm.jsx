import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Input } from "../Input/input";
import { Button } from "../Button/button";
import { NavLink } from "react-router-dom";

const LoginForm = ({ onSwitch }) => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log("Login:", data);
    toast.success("Logged in successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-6 bg-white bg-opacity-10 backdrop-blur-md rounded-lg"

    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Log In</h2>

      <div className="space-y-4">
        <Input placeholder="Email" type="email" {...register("email")} />

        <div className="relative">
          <Input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Log In
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center gap-2 justify-center"
      >
        <FcGoogle size={18} />
        Continue with Google
      </Button>

      <p className="text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <NavLink to='/register'>
          <button
            type="button"
            onClick={onSwitch}
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </button>
        </NavLink>
      </p>
    </form>
  );
};

export default LoginForm;

import { use, useEffect } from "react";
import AuthContext from "../../Context/AuthContext";

const injectKeyframes = () => {
  if (!document.getElementById("slide-gradient-keyframes")) {
    const style = document.createElement("style");
    style.id = "slide-gradient-keyframes";
    style.innerHTML = `
      @keyframes slide-gradient {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }
    `;
    document.head.appendChild(style);
  }
};

const GradientButton = ({
  type = "button", // "submit", "reset", etc.
  text = "Click Me",
  icon = null,
  className = "",
  animationDuration = 0.2, // seconds
  onClick,
  disabled = false,
  ...props
}) => {
  useEffect(() => {
    injectKeyframes();
  }, []);

  const {authLoading} = use(AuthContext);

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold
        bg-gradient-to-r from-[#5FACFE] via-[#24A7E8] to-[#46C1E1]
        bg-[length:200%_200%] bg-left
        hover:[animation:slide-gradient_${animationDuration}s_ease-in-out_forwards]
        transition-all duration-100 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {icon && <span className="text-lg text-center">{icon}</span>}
      {text}
    </button>
  );
};

export default GradientButton;

import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { useEffect } from "react";

// Inject keyframes directly into the DOM when the component loads
const injectKeyframes = () => {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes slide-gradient {
      0% { background-position: 0% 50%; }
      100% { background-position: 100% 50%; }
    }
  `;
  document.head.appendChild(style);
};

const JoinUsButton = () => {
  useEffect(() => {
    injectKeyframes();
  }, []);

  return (
    <Link
      to="/login"
      className="inline-flex btn items-center gap-2 px-5 py-2.5 rounded-full text-white font-semibold 
                 bg-gradient-to-r from-[#5FACFE] via-[#24A7E8] to-[#46C1E1]
                 bg-[length:200%_200%] bg-left
                 hover:[animation:slide-gradient_0.2s_ease-in-out_forwards]
                 transition-all duration-100 ease-in-out"
    >
      <FaUserPlus className="text-lg" />
      Join Us
    </Link>
  );
};

export default JoinUsButton;

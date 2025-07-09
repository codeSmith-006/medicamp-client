import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const ACTIVE_COLOR = "#3B82F6"; // Tailwind blue-500 hex

const AnimatedLink = ({ to, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <NavLink
        to={to}
        className={({ isActive }) =>
          `relative px-2 py-1 text-base font-medium ${
            isActive ? "nav-active" : "text-white"
          }`
        }
        style={({ isActive }) => ({
          color: isActive ? ACTIVE_COLOR : undefined,
        })}
      >
        {({ isActive }) => (
          <>
            {children}

            <motion.span
              className="absolute left-0 bottom-0 h-[2px] w-full origin-left"
              style={{ backgroundColor: ACTIVE_COLOR }}
              initial={{ scaleX: isActive ? 1 : 0 }}
              animate={{ scaleX: isActive || isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </>
        )}
      </NavLink>
    </motion.div>
  );
};

export default AnimatedLink;

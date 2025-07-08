// src/components/ui/Toast.jsx
import { Toaster } from "react-hot-toast";

const Toast = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "#ffffff",
          color: "#333",
          fontWeight: "500",
          border: "1px solid #e5e7eb",
        },
        success: {
          style: {
            background: "#24A7E8",
            color: "#fff",
          },
        },
        error: {
          style: {
            background: "#EF4444",
            color: "#fff",
          },
        },
      }}
    />
  );
};

export default Toast;

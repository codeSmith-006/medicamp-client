import { Link } from "react-router-dom";

const AuthLayout = ({ form, title, description, buttonText, onSwitch }) => {
  const gradientStyle = {
    background: `linear-gradient(
      270deg,
      #5FACFE,
      #3BA0FF,
      #24A7E8,
      #1B82C7,
      #46C1E1,
      #5FACFE
    )`,
    backgroundSize: "800% 800%",
    animation: "gradientShift 12s ease infinite",
  };

  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <style>
        {`
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animated-gradient-bg {
    background: linear-gradient(270deg, #5FACFE, #24A7E8, #46C1E1);
    background-size: 600% 600%;
    animation: gradientShift 15s ease infinite;
  }
`}
      </style>

      <div
        className="min-h-screen w-full flex items-center justify-center px-4 overflow-hidden relative"
        style={gradientStyle}
      >
        <div className="fixed top-4 left-4 z-50 md:absolute md:z-10">
          <Link
            to="/"
            className="text-white px-3 py-1 rounded-md text-sm font-medium transition"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="relative w-full max-w-6xl bg-none bg-opacity-10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row h-auto min-h-[700px]">
          <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10 z-10">
            {form}
          </div>

          <div className="hidden md:flex w-1/2 items-center justify-center px-6 py-10 bg-none text-white">
            <div className="text-center max-w-md">
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              <p className="mb-6">{description}</p>
              <Link
                to={onSwitch}
                className="bg-white text-[#24A7E8] px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition inline-block"
              >
                {buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;

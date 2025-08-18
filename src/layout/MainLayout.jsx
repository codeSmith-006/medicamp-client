import React, { use } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";
import AuthContext from "../Context/AuthContext";

const MainLayout = () => {
  const { isDarkMode } = use(AuthContext);
  return (
    <div>
      <Navbar></Navbar>
      <div className={`${isDarkMode && "bg-slate-900"}`}>
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;

import React, { use } from "react";
import BannerCarousel from "../../Component/Banner/BannerCarousel";
import FAQSection from "../../Component/FAQSection";
import PopularCamps from "../../Component/PopularCamps";
import TestimonialsSlider from "../../Component/TestimonialsSlider/TestimonialsSlider";
import { Helmet } from "react-helmet-async";
import AboutSection from "../../Component/AboutSection/AboutSection";
import HowItWorks from "../../Component/HowItWorks/HowItWorks";
import DoctorsSection from "../../Component/DoctorsSection/DoctorsSection";
import NewsletterSection from "../../Component/NewsletterSection/NewsletterSection";
import AuthContext from "../../Context/AuthContext";

const Home = () => {
  const { isDarkMode } = use(AuthContext);
  return (
    <div>
      <Helmet>
        <title>Home | MCMS</title>
      </Helmet>
      <div className="pt-16">
        <BannerCarousel></BannerCarousel>
        <AboutSection isDarkMode={isDarkMode}></AboutSection>
        <PopularCamps></PopularCamps>
        <HowItWorks isDarkMode={isDarkMode}></HowItWorks>
        <DoctorsSection isDarkMode={isDarkMode}></DoctorsSection>
        <div className={`${isDarkMode ? "bg-slate-900" : "bg-gray-50"}`}>
          <TestimonialsSlider isDarkMode={isDarkMode}></TestimonialsSlider>
        </div>

        <FAQSection isDarkMode={isDarkMode}></FAQSection>
        <NewsletterSection isDarkMode={isDarkMode}></NewsletterSection>
      </div>
    </div>
  );
};

export default Home;

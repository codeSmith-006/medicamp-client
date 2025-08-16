import React from "react";
import BannerCarousel from "../../Component/Banner/BannerCarousel";
import FAQSection from "../../Component/FAQSection";
import PopularCamps from "../../Component/PopularCamps";
import TestimonialsSlider from "../../Component/TestimonialsSlider/TestimonialsSlider";
import { Helmet } from "react-helmet-async";
import AboutSection from "../../Component/AboutSection/AboutSection";
import HowItWorks from "../../Component/HowItWorks/HowItWorks";
import DoctorsSection from "../../Component/DoctorsSection/DoctorsSection";
import NewsletterSection from "../../Component/NewsletterSection/NewsletterSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | MCMS</title>
      </Helmet>
      <div className="pt-16">
        <BannerCarousel></BannerCarousel>
        <AboutSection></AboutSection>
        <PopularCamps></PopularCamps>
        <HowItWorks></HowItWorks>
        <DoctorsSection></DoctorsSection>
        <TestimonialsSlider></TestimonialsSlider>
        <FAQSection></FAQSection>
        <NewsletterSection></NewsletterSection>
      </div>
    </div>
  );
};

export default Home;

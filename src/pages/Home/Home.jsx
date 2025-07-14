import React from "react";
import BannerCarousel from "../../Component/Banner/BannerCarousel";
import FAQSection from "../../Component/FAQSection";
import PopularCamps from "../../Component/PopularCamps";

const Home = () => {
  return (
    <div>
      <div className="pt-16">
        <BannerCarousel></BannerCarousel>
        <PopularCamps></PopularCamps>
        <FAQSection></FAQSection>
      </div>
    </div>
  );
};

export default Home;

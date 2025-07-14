import React from "react";
import BannerCarousel from "../../Component/Banner/BannerCarousel";
import FAQSection from "../../Component/FAQSection";

const Home = () => {
  return (
    <div>
      <div className="pt-16">
        <BannerCarousel></BannerCarousel>
        <FAQSection></FAQSection>
      </div>
    </div>
  );
};

export default Home;

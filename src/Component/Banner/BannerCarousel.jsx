import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import GradientButton from "../GradientButton/GradientButton";
import { FaSignInAlt } from "react-icons/fa";

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const slides = [
    {
      id: 1,
      image: "https://i.ibb.co/LdzjGsmw/medical-camp-community.jpg",
      title: "Community Health Impact",
      description:
        "Empowering local communities through accessible healthcare camps. See how we’ve reached thousands with life-saving services.",
      buttonText: "See Success Stories",
    },
    {
      id: 2,
      image: "https://i.ibb.co/dJ1nHn08/mobile-medical-unit.jpg",
      title: "Mobile Clinics in Action",
      description:
        "Explore how our mobile medical units bring essential healthcare to remote and underserved areas with efficiency and care.",
      buttonText: "Explore Missions",
    },
    {
      id: 3,
      image: "https://i.ibb.co/kVfcTPmt/healthcare-workers-team.jpg",
      title: "Volunteers Making a Difference",
      description:
        "Meet the heroes behind the scenes—our healthcare professionals, volunteers, and organizers making an impact every day.",
      buttonText: "Meet the Team",
    },
    {
      id: 4,
      image: "https://i.ibb.co/4ZtXdzpq/patient-smiling-with-doctor.jpg",
      title: "Camp Success Stories",
      description:
        "Hear firsthand from participants whose lives have been changed through early diagnosis, medical care, and support.",
      buttonText: "Read Testimonials",
    },
    {
      id: 5,
      image: "https://i.ibb.co/twjcjTGM/doctors-handshake.jpg",
      title: "Together for Better Health",
      description:
        "Join hands in creating a healthier future through organized camps, education, and proactive community engagement.",
      buttonText: "Join Our Mission",
    },
  ];

  const AUTOPLAY_DELAY = 3000;

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, AUTOPLAY_DELAY);

      // Progress bar animation
      setProgress(0);
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 100 / (AUTOPLAY_DELAY / 50);
        });
      }, 50);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, currentSlide, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 z-10 pointer-events-none" />
      {/* Main Banner */}
      <div className="relative w-full h-full">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${currentSlideData.image})`,
            transform: `scale(1.05)`,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-2xl ml-8 md:ml-20 text-white z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {currentSlideData.title}
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed text-gray-200">
              {currentSlideData.description}
            </p>
            {/* <button className="bg-gradient-to-r from-red-500 to-pink-600 px-8 py-4 rounded-full font-semibold text-white hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/25">
              {currentSlideData.buttonText}
            </button> */}
            <GradientButton text={currentSlideData.buttonText} className="" />
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-32 right-6 md:right-10 flex flex-col gap-4 z-20">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`w-20 h-14 md:w-24 md:h-16 rounded-lg cursor-pointer transition-all duration-300 bg-cover bg-center border-2 ${
              index === currentSlide
                ? "border-[#24A7E8] scale-110 shadow-lg shadow-[#24A7E8]/40"
                : "border-white/30 hover:border-white/60 hover:scale-105"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div
              className={`w-full h-full rounded-lg transition-all duration-300 ${
                index === currentSlide
                  ? "bg-gradient-to-r from-[#5FACFE]/45 via-[#24A7E8]/45 to-[#46C1E1]/45"
                  : "bg-black/40 hover:bg-black/20"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-20">
        <button
          onClick={prevSlide}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-300 flex items-center justify-center group hover:bg-gradient-to-r hover:from-[#5FACFE] hover:via-[#24A7E8] hover:to-[#46C1E1] hover:border-transparent hover:shadow-md hover:shadow-[#24A7E8]/40"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={toggleAutoplay}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-300 flex items-center justify-center group hover:bg-gradient-to-r hover:from-[#5FACFE] hover:via-[#24A7E8] hover:to-[#46C1E1] hover:border-transparent hover:shadow-md hover:shadow-[#24A7E8]/40"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 group-hover:scale-110 transition-transform" />
          ) : (
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
          )}
        </button>

        <button
          onClick={nextSlide}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-300 flex items-center justify-center group hover:bg-gradient-to-r hover:from-[#5FACFE] hover:via-[#24A7E8] hover:to-[#46C1E1] hover:border-transparent hover:shadow-md hover:shadow-[#24A7E8]/40"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Progress Bar */}
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <div
          className="h-full bg-gradient-to-r from-[#5FACFE] via-[#24A7E8] to-[#46C1E1] transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm md:text-base z-20">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-gradient-to-r from-[#5FACFE] via-[#24A7E8] to-[#46C1E1] w-8"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;

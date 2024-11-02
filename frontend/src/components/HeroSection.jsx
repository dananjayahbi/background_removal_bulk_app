import React from "react";
import HeroImg from "../assets/HeroImg.gif";
import "./styles/HeroSection.css";

const HeroSection = () => {
  // Function to handle smooth scrolling
  const handleScroll = () => {
    const heroSection = document.querySelector(".hero-container");
    const heroSectionBottom = heroSection.offsetTop + heroSection.offsetHeight;

    window.scrollTo({
      top: heroSectionBottom,
      behavior: "smooth",
    });
  };

  return (
    <div className="hero-container">
      <div className="left-content">
        <h1 className="main-title">Image Background Remover</h1>
        <p className="sub-title">
          A hobby project to remove image backgrounds using AI
        </p>
        <button className="cta-button" onClick={handleScroll}>
          Give a Try
        </button>
      </div>
      <div className="right-content">
        <img src={HeroImg} alt="Hero" className="hero-image" />
      </div>
    </div>
  );
};

export default HeroSection;

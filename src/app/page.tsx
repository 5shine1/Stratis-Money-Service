import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import ProcessSection from "./components/ProcessSection";
import ConclusionSection from "./components/ConclusionSection";
import Footer from "./components/Footer";

const MainPage = () => {
  return (
    <>
      <main className="overflow-hidden relative">
        <Header />
        <div className="absolute right-0 top-40 rounded-full translate-x-1/2 bg-[#12444e] w-[150vw] h-[240vh] blur-[1000px]"></div>
        <div className="absolute left-1/2 top-1/2 rounded-full -translate-x-1/2 -translate-y-1/2 bg-[#041923] w-[150vw] h-[240vh] blur-[450px]"></div>
        <div className="relative">
          <HeroSection />
          <FeatureSection />
          <ProcessSection />
          <ConclusionSection />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default MainPage;

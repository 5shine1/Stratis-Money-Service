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
      <Header />
      <main className="overflow-hidden">
        <HeroSection />
        <FeatureSection />
        <ProcessSection />
        <ConclusionSection />
        <Footer />
      </main>
    </>
  );
};

export default MainPage;

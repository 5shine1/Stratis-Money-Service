"use client";
import React from "react";
import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import ProcessSection from "./components/ProcessSection";
import ConclusionSection from "./components/ConclusionSection";
import Footer from "./components/Footer";

const MainPage = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.origin);
    }
  }, []);
  return (
    <>
    <Head>
      <title>Stratis Money Service</title>
      <meta name="description" content="Stratis Crypto Payment Gateway Platform" />
      <meta property="og:title" content="Stratis Money Service" />
      <meta property="og:description" content="At Stratis Money Service, we bridge the gap between traditional finance and the digital world..." />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Stratis Money Service" />
      <meta property="og:image" content={`${url}/assets/landing/meta-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
    </Head>
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

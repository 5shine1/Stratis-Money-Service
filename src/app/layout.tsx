"use client";

import { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import "./globals.css";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.origin);
    }
  }, []);
  return (
    <html className="notranslate" translate="no">
      <title>Stratis Money Service</title>
      {/* Open Graph Meta Tags */}
      <meta name="description" content="Stratis Crypto Payment Gateway Platform" />
      <meta property="og:title" content="Stratis Money Service" />
      <meta property="og:description" content="At Stratis Money Service, we bridge the gap between traditional finance and the digital world." />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Stratis Money Service" />
      <meta property="og:image" content={`${url}/assets/landing/meta-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Stratis Money Service" />
      <meta name="twitter:description" content="At Stratis Money Service, we bridge the gap between traditional finance and the digital world." />
      <meta name="twitter:image" content={`${url}/assets/landing/meta-image.png`}  />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="675" />
      <body>{children}</body>
    </html>
  );
};
export default RootLayout;

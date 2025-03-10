import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import "./globals.css";

// export const metadata: Metadata = {
//   title: "Stratis Money Service",
//   description: "Stratis Crypto Payment Gateway Platform",
// };

export const metadata: Metadata = {
  title: "website-Stratis Money Service",
  description: "Stratis Crypto Payment Gateway Platform",
  keywords: ["money service"],
  openGraph: {
    title: "meta-Stratis Money Service",
    description: "At Stratis Money Service, we bridge the gap between traditional finance and the digital world...",
    url: "https://beta.money.stratisplatform.com/",
    siteName: "Stratis Money Service",
    images: [
      {
        url: "https://beta.money.stratisplatform.com/assets/landing/meta-image.png",
        width: 1200,
        height: 630,
        alt: "Stratis Money Service",
      },
    ],
    type: "website",
  },
};

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html className="notranslate" translate="no">
      <body>{children}</body>
    </html>
  );
};
export default RootLayout;

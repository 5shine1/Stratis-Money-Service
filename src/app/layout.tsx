import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import "./globals.css";

// export const metadata: Metadata = {
//   title: "Stratis Money Service",
//   description: "Stratis Crypto Payment Gateway Platform",
// };

export const metadata: Metadata = {
  title: "test-Stratis Money Service",
  description: "Stratis Crypto Payment Gateway Platform",
  keywords: ["money service"],
  openGraph: {
    title: "Stratis Money Service",
    description: "At Stratis Money Service, we bridge the gap between traditional finance and the digital world. Regulated by the Bank of Spain (SEPBLAC) with a VASP registration, we provide a secure platform that allows your customers to pay in crypto, ensuring compliance and eliminating uncertainty.",
    url: "/",
    siteName: "Stratis Money Service",
    images: [
      {
        url: "/assets/landing/meta-image.png",
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

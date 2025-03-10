import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import "./globals.css";

// export const metadata: Metadata = {
//   title: "Stratis Money Service",
//   description: "Stratis Crypto Payment Gateway Platform",
// };

export const metadata: Metadata = {
  title: "Stratis Money Service",
  description: "Stratis Crypto Payment Gateway Platform",
  keywords: ["Next.js", "React", "Web Development"],
  openGraph: {
    title: "Stratis Money Service",
    description: "Stratis Crypto Payment Gateway Platform",
    url: "/",
    siteName: "Stratis Money Service",
    images: [
      {
        url: "/assets/landing/meta_image.png",
        width: 800,
        height: 600,
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

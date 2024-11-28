import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stratis Money Service",
  description: "Stratis Crypto Payment Gateway Platform",
};

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html className="notranslate" translate="no">
      <body>{children}</body>
    </html>
  );
};
export default RootLayout;

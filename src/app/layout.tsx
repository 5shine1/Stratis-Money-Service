import type { Metadata } from "next";
import "./globals.css";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Stratis Payment",
  description: "Stratis Crypto Payment Gateway Platform",
};

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};
export default RootLayout;

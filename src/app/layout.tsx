import { PropsWithChildren } from "react";
import "./globals.css";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html className="notranslate" translate="no">
      <body>{children}</body>
    </html>
  );
};
export default RootLayout;

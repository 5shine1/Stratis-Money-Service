import { PropsWithChildren } from "react";
import "./globals.css";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html className="notranslate" translate="no">
      <title>Stratis Money Service</title>
      <body>{children}</body>
    </html>
  );
};
export default RootLayout;

import React, { PropsWithChildren } from "react";
import AppSidebar from "./components/Sidebar";

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="w-full h-[100vh] flex gap-4">
      <AppSidebar />
      <section className="p-8 w-full h-screen overflow-auto">
        {children}
      </section>
    </main>
  );
};

export default AppLayout;

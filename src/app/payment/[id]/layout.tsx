import React, { PropsWithChildren } from "react";
import Header from "@/app/components/Header";

const PaymentLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden relative pt-100 pb-40 px-12 flex justify-center items-center min-h-[100vh] m-auto">
        <div className="g-effect absolute -top-[400px] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] scale-50 lg:scale-100 -z-10"></div>
        {children}
      </main>
    </>
  );
};

export default PaymentLayout;

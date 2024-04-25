"use client";
import React, { PropsWithChildren } from "react";
import { ScrollProvider } from "@/components/providers/ScrollProvider";

const RootTemplate = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ScrollProvider>{children}</ScrollProvider>
    </>
  );
};

export default RootTemplate;

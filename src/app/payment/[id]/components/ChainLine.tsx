import React from "react";

const ChainLine = () => {
  return (
    <div className="w-full items-center gap-6  hidden md:flex">
      <div className=" flex-none  border-[3px] border-[#E3D2AB1A] rounded-full">
        <div className="w-6 h-6 bg-[#516972] rounded-full"></div>
      </div>
      <hr className="border-[#5C747D] w-full border-dashed"></hr>
      <div className=" flex-none  border-[3px] border-[#E3D2AB1A] rounded-full">
        <div className="w-6 h-6 bg-[#516972] rounded-full"></div>
      </div>
    </div>
  );
};

export default ChainLine;

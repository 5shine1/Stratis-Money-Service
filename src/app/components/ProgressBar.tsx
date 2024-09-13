import React from "react";

const ProgressBar = ({ label, progress, percentage }) => {
  return (
    <div className="w-full">
      <div className="mb-10 flex justify-between gap-20 items-center text-14">
        <div className="text-[#6B7A87]">{label}</div>
        <span className="#BDCCD8">{progress}</span>
      </div>
      <div
        className="flex w-full h-4 bg-[#192D3B] placeholder:rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="flex flex-col justify-center rounded-full overflow-hidden bg-gradient-to-r from-[#4194B6] to-[#E2AD3A] text-xs text-white text-center whitespace-nowrap transition duration-500 "
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;

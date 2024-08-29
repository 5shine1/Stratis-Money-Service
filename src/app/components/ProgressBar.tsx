import React from 'react';

const ProgressBar = ({ label, progress, percentage }) => {
  return (
    <div>
      <div className="mb-10 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">{label}</h3>
        <span className="text-sm text-white dark:text-white">{progress}</span>
      </div>
      <div
        className="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="flex flex-col justify-center rounded-full overflow-hidden bg-teal-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
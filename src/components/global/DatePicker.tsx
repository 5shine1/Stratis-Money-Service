import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import useClickOutside from "@/hooks/global/useClickOutside";

type Props = {
  selectedDate: Date | null;
  setSelectedDate: (value: Date) => void; //eslint-disable-line
  error?: string;
};
const DatePicker: React.FC<Props> = ({ selectedDate, setSelectedDate, error }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedDate) {
      setInputValue(formatDate(selectedDate));
    }
  }, [selectedDate]);

  const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) => new Date(year, month - 1, 1).getDay();

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const parseDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const parsedDate = parseDate(value);
      if (!isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
        setCurrentMonth(parsedDate.getMonth() + 1);
        setCurrentYear(parsedDate.getFullYear());
      }
    }
  };

  const handleDateSelect = (day: number) => {
    const selected = new Date(currentYear, currentMonth - 1, day);
    setSelectedDate(selected);
    setShowCalendar(false);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePrevYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear(currentYear + 1);
  };

  const renderDays = () => {
    const days = [];
    const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);

    // Add empty slots for the days of the previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    // Add days of the current month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === i &&
        selectedDate.getMonth() + 1 === currentMonth &&
        selectedDate.getFullYear() === currentYear;

      days.push(
        <button
          key={i}
          className={`text-12 w-32 h-32 flex items-center justify-center rounded-full ${
            isSelected ? "bg-[#DDAC3E] text-[#4C3910]" : ""
          }`}
          onClick={() => handleDateSelect(i)}
        >
          {i}
        </button>
      );
    }

    return days;
  };

  return (
    <div
      className="relative w-full"
      ref={useClickOutside(() => {
        setShowCalendar(false);
      })}
    >
      <input
        ref={dateInputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowCalendar(true)}
        readOnly
        className={` border flex items-center px-12 gap-6 u-transition-color group rounded-6 text-14 placeholder:text-input-placeholder py-12 w-full text-input-text outline-none bg-transparent ${
          error ? "border-error" : "border-input-border focus-within:border-[#3C5D71]"
        }`}
        placeholder="YYYY-MM-DD"
      />
      {showCalendar && (
        <div className="absolute z-20 top-full left-0 p-16 bg-[#192C37] text-input-text rounded-lg border border-[#213541] shadow-tab">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center justify-evenly w-full gap-8">
              <Icon icon="uiw:d-arrow-left" onClick={handlePrevYear} className="w-12 h-12 cursor-pointer" />
              <Icon icon="uiw:left" onClick={handlePrevMonth} className="w-12 h-12 cursor-pointer" />
              <span className="text-14">
                {currentYear} - {currentMonth}
              </span>
              <Icon icon="uiw:right" onClick={handleNextMonth} className="w-12 h-12 cursor-pointer" />
              <Icon icon="uiw:d-arrow-right" onClick={handleNextYear} className="w-12 h-12 cursor-pointer" />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center mt-16">
            <div className="text-12 flex items-center justify-center w-32 h-32">Su</div>
            <div className="text-12 flex items-center justify-center w-32 h-32">Mo</div>
            <div className="text-12 flex items-center justify-center w-32 h-32">Tu</div>
            <div className="text-12 flex items-center justify-center w-32 h-32">We</div>
            <div className="text-12 flex items-center justify-center w-32 h-32">Th</div>
            <div className="text-12 flex items-center justify-center w-32 h-32">Fr</div>
            <div className="text-12 flex items-center justify-center w-32 h-32">Sa</div>
            {renderDays()}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;

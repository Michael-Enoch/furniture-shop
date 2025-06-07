import { Clock } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import theme from "../context/Theme";

const CountdownTimer = ({ targetDate }) => {
  const timeRef = useRef(null);
  const calculateTimeLeft = () => {
    const target = new Date(targetDate);
    if (isNaN(target)) return null;

    const now = new Date().getTime();
    const difference = target.getTime() - now;

    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    timeRef.current = setInterval(() => {
      const updatedTime = calculateTimeLeft();
      if (!updatedTime) {
        clearInterval(timeRef.current);
        timeRef.current = null;
        setTimeLeft(null);
      } else {
        setTimeLeft(updatedTime);
      }
    }, 1000);

    return () => clearInterval(timeRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  const padZero = (num) => String(num).padStart(2, "0");

  if (!timeLeft) {
    return <span className="text-red-500 font-semibold">Offer Expired</span>;
  }

  return (
    <div
      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold animate-pulse"
      style={{
        fontFamily: theme.fonts.ui,
      }}
    >
      <Clock size={14} className="text-amber-300" />
      <span className="text-white">
        Ends in:
        <span className="ml-1 text-[#B57C54]">{padZero(timeLeft.days)}d</span>
        <span className="ml-1 text-[#A65A2E]">{padZero(timeLeft.hours)}h</span>
        <span className="ml-1 text-[#7A8C5D]">
          {padZero(timeLeft.minutes)}m
        </span>
        <span className="ml-1 text-[#7F8B91]">
          {padZero(timeLeft.seconds)}s
        </span>
      </span>
    </div>
  );
};

export default CountdownTimer;

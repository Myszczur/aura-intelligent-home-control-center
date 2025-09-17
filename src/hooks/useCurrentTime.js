import { useState, useEffect } from "react";

// Funkcja pomocnicza do formatowania czasu
const formatTime = (date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

export const useCurrentTime = () => {
  const [time, setTime] = useState(formatTime(new Date()));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return time;
};

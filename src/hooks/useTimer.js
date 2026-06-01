import { useState, useEffect, useRef, useCallback } from 'react';

export const useTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const startTimer = useCallback(() => setIsRunning(true), []);
  const stopTimer = useCallback(() => setIsRunning(false), []);
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTime(0);
  }, []);

  const formattedTime = [
    Math.floor(time / 60).toString().padStart(2, '0'),
    (time % 60).toString().padStart(2, '0')
  ].join(':');

  return { time, formattedTime, isRunning, startTimer, stopTimer, resetTimer };
};

import { useEffect, useState } from 'react';
import { getCountdown } from '../utils/date';

export const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState(() => getCountdown(targetDate));

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getCountdown(targetDate)), 1000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

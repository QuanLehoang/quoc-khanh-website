export const getCountdown = (targetDate) => {
  const distance = Math.max(new Date(targetDate).getTime() - Date.now(), 0);
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);
  return { days, hours, minutes, seconds };
};

export const getNextNationalDay = () => {
  const now = new Date();
  const year = now.getMonth() > 8 || (now.getMonth() === 8 && now.getDate() > 2)
    ? now.getFullYear() + 1
    : now.getFullYear();

  return new Date(year, 8, 2, 0, 0, 0);
};

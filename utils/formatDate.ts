export const formatRelativeDate = (date: string) => {
  const timestamp = new Date(date).getTime();
  const now = Date.now();

  const difference = now - timestamp;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (difference < minute) {
    return "Just now";
  }

  if (difference < hour) {
    const minutes = Math.floor(difference / minute);
    return `${minutes}m ago`;
  }

  if (difference < day) {
    const hours = Math.floor(difference / hour);
    return `${hours}h ago`;
  }

  const days = Math.floor(difference / day);

  if (days < 7) {
    return `${days}d ago`;
  }

  return new Date(date).toLocaleDateString();
};
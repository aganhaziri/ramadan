/**
 * Apply city offset (in minutes) to a time string "HH:mm"
 */
export function applyTimeOffset(time: string, offsetMinutes: number): string {
  if (!time || time === '') return time;
  const [h, m] = time.split(':').map(Number);
  const totalMinutes = h * 60 + m + offsetMinutes;
  const wrapped = ((totalMinutes % 1440) + 1440) % 1440; // handle day overflow
  const newH = Math.floor(wrapped / 60) % 24;
  const newM = wrapped % 60;
  return `${newH.toString().padStart(2, '0')}:${newM.toString().padStart(2, '0')}`;
}

/**
 * Get schedule for a specific date
 */
export function getScheduleForDate<T extends { dateObj: Date }>(
  schedule: T[],
  date: Date
): T | null {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return (
    schedule.find(
      (d) =>
        d.dateObj.getFullYear() === year &&
        d.dateObj.getMonth() === month &&
        d.dateObj.getDate() === day
    ) ?? null
  );
}

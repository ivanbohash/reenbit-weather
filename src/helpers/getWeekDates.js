export function getTodayAndNextWeekDate() {
  const today = new Date();
  const nextWeekDate = new Date();
  nextWeekDate.setDate(today.getDate() + 6);

  const todayFormatted = today.toISOString().split("T")[0];
  const nextWeekFormatted = nextWeekDate.toISOString().split("T")[0];

  return { today: todayFormatted, nextWeek: nextWeekFormatted };
}

export function getDayOfWeek(date) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}

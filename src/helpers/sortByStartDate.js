export function sortByStartDate(trips) {
  return trips.slice().sort((a, b) => {
    return new Date(a.startDate) - new Date(b.startDate);
  });
}

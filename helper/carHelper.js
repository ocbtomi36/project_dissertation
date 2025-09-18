function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;   // csak YYYY-MM-DD formátum
  if (!regex.test(dateString)) return false;

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(dateString);

  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month && // +1 mert 0-alapú
    date.getDate() === day
  )};

module.exports = { isValidDate }
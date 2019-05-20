
export function capitalizeFirstLetter(string) {
  if(string == null)
      return "N/A";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function checkDeadline(date) {
  return date === null ? "Not set" : date;
}

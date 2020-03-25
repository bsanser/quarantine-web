export const truncateString = (string, characters) =>
  string.length > characters ? string.substring(0, characters) + "..." : string;

export const capitalizeString = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

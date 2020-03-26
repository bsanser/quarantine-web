export const truncateString = (string, characters) =>
  string.length > characters ? string.substring(0, characters) + "..." : string;

export const capitalizeString = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const replaceSpaceWithHyphens = string => string.replace(/\s+/g, "-");

export const replaceHyphensWithSpaces = string => string.replace((/-/g, ' '));

export const capitalizeAndSplit = string  => string.split("-").map(word => capitalizeString(word)).join(" ");

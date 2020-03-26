import { format } from "date-fns";
import differenceInDays from "date-fns/differenceInDays";
import formatRelative from "date-fns/formatRelative";
import formatDistance from "date-fns/formatDistance";
import formatISO from "date-fns/formatISO";

export function relativeDate(date, baseDate, options) {
  return Math.abs(differenceInDays(date, baseDate)) < 6
    ? formatRelative(date, baseDate, options)
    : format(date, `dd MMM yyy @ HH:mm`);
}

export function formatDifference(date, baseDate, options) {
  return formatDistance(date, baseDate, options);
}

export function formatToISO(date, options) {
  return formatISO(date, options);
}

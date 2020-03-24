import { format } from 'date-fns';
import differenceInDays from "date-fns/differenceInDays";
import formatRelative from "date-fns/formatRelative";
import formatDistance from "date-fns/formatDistance";

export function relativeDate(date, baseDate, options) {
  return Math.abs(differenceInDays(date, baseDate)) < 6
    ? formatRelative(date, baseDate, options)
    : format(date, `yyyy.MM.dd в HH:mm`)
}

export function formatDifference(date, baseDate, options) {
  return formatDistance(date, baseDate, options);
}
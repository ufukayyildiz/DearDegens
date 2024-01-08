import { ClassValue, clsx } from "clsx"
import { formatDistanceToNowStrict } from "date-fns"
import locale from "date-fns/locale/en-US"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}} min",
  xMinutes: "{{count}} min",
  aboutXHours: "{{count}} hours",
  xHours: "{{count}} hours",
  xDays: "{{count}} days",
  aboutXWeeks: "{{count}} weeks",
  xWeeks: "{{count}} weeks",
  aboutXMonths: "{{count}} months",
  xMonths: "{{count}} months",
  aboutXYears: "{{count}} years",
  xYears: "{{count}} years",
  overXYears: "{{count}} years",
  almostXYears: "{{count}} years",
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result
    } else {
      if (result === "just now") return result
      return result + " ago"
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  if (typeof date === "string") {
    // Parse the input string into a Date object
    const parsedDate = new Date(date)

    // Check if the parsed date is valid
    if (!isNaN(parsedDate.getTime())) {
      date = parsedDate
    } else {
      // Handle invalid date input
      return "Invalid date"
    }
  }
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}

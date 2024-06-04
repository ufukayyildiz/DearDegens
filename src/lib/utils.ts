import { ClassValue, clsx } from "clsx"
import { formatDistanceToNowStrict } from "date-fns"
import Resizer from "react-image-file-resizer"
import locale from "date-fns/locale/en-US"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const currentDate = new Date()
export const currentYear = currentDate.getFullYear()

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

export function formatDateFromTimestamp(timestamp: Date) {
  const date = new Date(timestamp)

  const day = date.getDate()
  const month = date.toLocaleString("default", { month: "short" })
  const hour = date.getHours()
  const minute = date.getMinutes()

  const formattedDate = `${day} ${month} ${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`

  return formattedDate
}

export const resizeFile = (file: any) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      800,
      800,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri)
      },
      "file"
    )
  })

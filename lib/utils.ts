import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getNextDay = (day: string): Date => {
  const days: { [key: string]: number } = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 0,
  }
  const dayIndex = days[day.toLowerCase()]
  const today = new Date()
  const resultDate = new Date(today.getTime())
  resultDate.setDate(today.getDate() + ((dayIndex + 7 - today.getDay()) % 7))
  return resultDate
}

export const formatGoogleCalendarDate = (date: Date, time: string): string => {
  const [hours, minutes] = time.split(":").map(Number)
  date.setHours(hours, minutes, 0, 0)
  return date.toISOString().replace(/-|:|"..*$/g, "")
}


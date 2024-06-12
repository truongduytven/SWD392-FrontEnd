import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice (value: number): string {
  return new Intl.NumberFormat('vi-VN').format(value) + 'đ'
}

export function formatDate(date: Date) {
  return date.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function calculateDuration(startTime:string, endTime:string) {
  // Parse the start and end time
  const startParts = startTime.split(':');
  const endParts = endTime.split(':');

  const startHours = parseInt(startParts[0], 10);
  const startMinutes = parseInt(startParts[1], 10);
  const endHours = parseInt(endParts[0], 10);
  const endMinutes = parseInt(endParts[1], 10);

  // Convert both times to minutes since midnight
  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  // Calculate the difference in minutes
  let differenceInMinutes: number;
  if (endTotalMinutes >= startTotalMinutes) {
      differenceInMinutes = endTotalMinutes - startTotalMinutes;
  } else {
      // If the end time is earlier in the day than the start time, it means the end time is on the next day
      differenceInMinutes = (endTotalMinutes + 24 * 60) - startTotalMinutes;
  }

  // Convert the difference back to hours and minutes
  const diffHours = Math.floor(differenceInMinutes / 60);
  const diffMinutes = differenceInMinutes % 60;

  // Format the result as HH:MM
  const formattedDiffHours = diffHours.toString().padStart(2, '0');
  const formattedDiffMinutes = diffMinutes.toString().padStart(2, '0');

  return `${formattedDiffHours}h ${formattedDiffMinutes}p`;
}

interface City {
  cityID: string;
  cityName: string;
}

// Define types for arrays
type CitiesArray = City[];

// Function to find city name by ID
export function findCityNameByID(cityID: string, cities: CitiesArray): string {
  const city = cities.find(city => city.cityID === cityID);
  return city ? city.cityName : "City not found";
}


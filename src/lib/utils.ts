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
  const startDateTime = new Date(`01/01/1970 ${startTime}`);
  const endDateTime = new Date(`01/01/1970 ${endTime}`);

  const durationInMs = endDateTime.getTime() - startDateTime.getTime();
  const durationInMinutes = Math.floor(durationInMs / (1000 * 60));

  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;
  const durationFormatted = `${hours}h ${minutes}p`;

  return durationFormatted;
}
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const twSelector = (pseudo: string, target: string) =>
  target
    .split(' ')
    .map((str) => `${pseudo}:${str}`)
    .join(' ');

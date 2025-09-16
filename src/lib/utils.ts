import type { ClassValue } from 'clsx';
import { TZDate } from '@date-fns/tz';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getCurrentDt = () => new TZDate(new Date(), 'Asia/Tokyo');

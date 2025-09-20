import { z } from 'zod';

const envSchema = z.object({
  DEBUG: z.string().transform((value) => value === 'true'),
  NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: z.string(),
});

const parsedEnv = envSchema.safeParse({
  DEBUG: process.env.DEBUG,
  NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
});

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;

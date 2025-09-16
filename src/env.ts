import { z } from 'zod';

const envSchema = z.object({
  DEBUG: z.string().transform((value) => value === 'true'),
  NEON_DATABASE_URL: z.string(),
  RESEND_API_KEY: z.string(),
  RESEND_FROM: z.string(),
  RESEND_ADMIN: z.string(),
  MICROCMS_SERVICE_DOMAIN: z.string(),
  MICROCMS_API_KEY: z.string(),
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string(),
  RECAPTCHA_SECRET_KEY: z.string(),
  NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: z.string(),
});

const parsedEnv = envSchema.safeParse({
  DEBUG: process.env.DEBUG,
  NEON_DATABASE_URL: process.env.NEON_DATABASE_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM: process.env.RESEND_FROM,
  RESEND_ADMIN: process.env.RESEND_ADMIN,
  MICROCMS_SERVICE_DOMAIN: process.env.MICROCMS_SERVICE_DOMAIN,
  MICROCMS_API_KEY: process.env.MICROCMS_API_KEY,
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
});

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;

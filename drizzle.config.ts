import { env } from '@/env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  breakpoints: true,
  dbCredentials: {
    url: env.NEON_DATABASE_URL,
  },
  migrations: {
    schema: '●●●',
  },
});

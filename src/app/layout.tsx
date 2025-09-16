import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { env } from '@/env';
import { cn } from '@/lib/utils';
import { GoogleTagManager } from '@next/third-parties/google';

import '@/styles/globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  preload: false,
  display: 'swap',
  fallback: ['Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'Simple Calculator',
  description: 'シンプルな電卓アプリです。',
  keywords: ['Yoshi0518', 'Simple', 'Calculator', 'シンプル', '電卓'],
  openGraph: {
    title: 'Simple Calculator',
    description: 'シンプルな電卓アプリです。',
    url: 'https://simcal.yoshi0518.com',
    siteName: 'Simple Calculator',
  },
  robots: {
    index: !env.DEBUG, // falseでnoindex
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="ja"
      className={cn(notoSansJP.className, 'select-none')}
    >
      <body className="text-gray-600">
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
          {children}
        </main>
      </body>
      <GoogleTagManager gtmId={env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID} />
    </html>
  );
};

export default RootLayout;

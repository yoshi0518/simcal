import type { RecaptchaResultType } from '@/types/recaptcha';
import { env } from '@/env';

export const verifyRecaptcha = async (recaptchaToken: string) => {
  if (!recaptchaToken) return { status: false, message: 'reCAPTCHAトークンがありません' };

  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
  };

  if (env.DEBUG) console.log('reCAPTCHA検証リクエスト', request);

  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, request);
  if (!response.ok) return { status: false, message: 'reCAPTCHA検証失敗' };

  const data = (await response.json()) as RecaptchaResultType;

  if (env.DEBUG) console.log('reCAPTCHA検証レスポンス', data);

  if (!data.success || typeof data.score !== 'number' || data.score < 0.5)
    return { status: false, message: 'reCAPTCHA検証失敗' };

  return { status: true, message: 'reCAPTCHA検証成功' };
};

import type { SendMailType } from '@/types/resend';
import { env } from '@/env';
import { Resend } from 'resend';

export const sendMail = async (request: SendMailType) => {
  if (env.DEBUG) console.log('メール送信リクエスト', request);

  const resend = new Resend(env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send(request);

  if (error) {
    return { status: false, message: 'メール送信失敗' };
  }

  return { status: true, message: 'メール送信成功', id: data.id };
};

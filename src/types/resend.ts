export type SendMailType = {
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  replyTo?: string[];
  subject: string;
  text: string;
  tags?: {
    name: string;
    value: string;
  }[];
};

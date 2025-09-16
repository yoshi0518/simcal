// https://developers.google.com/recaptcha/docs/v3?hl=ja#site_verify_response
export type RecaptchaResultType = {
  'success': boolean;
  'score': number;
  'action': string;
  'challenge_ts': string;
  'hostname': string;
  'error-codes'?: string[];
};

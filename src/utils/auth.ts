import type { AuthError } from 'firebase/auth';

/** when error code `auth/invalid-email` returns `auth.invalid-email` */
export const getTranslationKey = (error: AuthError) => error.code.replace('/', '.');

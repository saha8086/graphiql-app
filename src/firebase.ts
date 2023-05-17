import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  connectAuthEmulator,
  indexedDBLocalPersistence,
  browserPopupRedirectResolver,
  prodErrorMap,
  debugErrorMap,
} from 'firebase/auth';

const app = initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  projectId: import.meta.env.VITE_PROJECT_ID,
  ...(import.meta.env.PROD
    ? {
        appId: import.meta.env.VITE_APP_ID,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        databaseURL: import.meta.env.VITE_DATABASE_URL,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,

        measurementId: import.meta.env.VITE_MEASUREMENT_ID,
      }
    : {
        // Do not use production credentials in development mode
      }),
});

export const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence,
  ...(import.meta.env.PROD
    ? {
        popupRedirectResolver: undefined, // neither `signInWithPopup` or `signInWithRedirect` are being used.
        errorMap: prodErrorMap,
      }
    : {
        popupRedirectResolver: browserPopupRedirectResolver,
        errorMap: debugErrorMap,
      }),
});

if (import.meta.env.DEV) {
  // Do not use with production credentials as emulator traffic is not encrypted.
  connectAuthEmulator(auth, 'http://localhost:9099');
}

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

// todo: https://github.com/saha8086/graphiql-app/issues/1
void i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      ru: {
        translation: translationRU,
      },
    },
    debug: import.meta.env.DEV,
    fallbackLng: 'en',
    returnNull: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;

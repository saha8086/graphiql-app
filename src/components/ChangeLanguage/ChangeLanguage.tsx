import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export interface ChangeLanguageProps {
  className?: string;
}

export const ChangeLanguage: FC<ChangeLanguageProps> = (props) => {
  const { t, i18n } = useTranslation();

  const onClick = useCallback(() => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    void i18n.changeLanguage(newLang);
  }, [i18n]);

  return (
    <button {...props} type="button" onClick={onClick}>
      {t('change-language')}
    </button>
  );
};

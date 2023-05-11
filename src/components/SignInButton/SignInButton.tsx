import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export interface SignInButtonProps {
  className?: string;
}

// todo: SignInButton
export const SignInButton: FC<SignInButtonProps> = (props) => {
  const { t } = useTranslation();

  return (
    <button {...props} type="button">
      {t('sign-in-button')}
    </button>
  );
};

import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export interface SignInButtonProps {
  className?: string;
}

// todo: SignInButton
export const SignInButton: FC<SignInButtonProps> = (props) => {
  const { t } = useTranslation();

  return (
    <button {...props} type="button">
      <Link to="/sign-in">{t('sign-in')}</Link>
    </button>
  );
};

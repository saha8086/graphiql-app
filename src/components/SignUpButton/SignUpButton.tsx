import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export interface SignUpButtonProps {
  className?: string;
}

// todo: SignUpButton
export const SignUpButton: FC<SignUpButtonProps> = (props) => {
  const { t } = useTranslation();

  return (
    <button {...props} type="button">
      <Link to="/sign-up">{t('sign-up-button')}</Link>
    </button>
  );
};

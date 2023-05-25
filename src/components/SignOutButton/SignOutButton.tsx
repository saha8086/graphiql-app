import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export interface SignOutButtonProps {
  className?: string;
  onClick?: () => void;
}

// todo: https://github.com/saha8086/graphiql-app/issues/18
export const SignOutButton: FC<SignOutButtonProps> = (props) => {
  const { t } = useTranslation();

  return (
    <button {...props} type="button">
      <Link to="/">{t('sign-out-button')}</Link>
    </button>
  );
};

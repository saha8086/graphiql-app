import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export interface SignUpButtonProps {
  className?: string;
}

// todo: SignUpButton
export const SignUpButton: FC<SignUpButtonProps> = (props) => {
  const { t } = useTranslation();

  return (
    <button {...props} type="button">
      {t('sign-up-button')}
    </button>
  );
};

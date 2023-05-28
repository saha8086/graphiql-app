import { FC } from 'react';

import { AuthForm } from '@components/AuthForm/AuthForm';
import { useSignInWithEmailAndPassword } from '@hooks/authentication';
import { useTranslation } from 'react-i18next';
import { Center } from '@chakra-ui/react';

const SignInPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Center className="flex-col p-4">
      <h2 className="font-bold text-lg">{t('sign-in')}</h2>
      <AuthForm useAuth={useSignInWithEmailAndPassword} />
    </Center>
  );
};

export default SignInPage;

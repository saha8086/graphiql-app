import { FC } from 'react';

import { AuthForm } from '@components/AuthForm/AuthForm';
import { useCreateUserWithEmailAndPassword } from '@hooks/authentication';
import { useTranslation } from 'react-i18next';
import { Center } from '@chakra-ui/react';

const SignUpPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Center className="flex-col p-4">
      <h2 className="font-bold text-lg">{t('sign-up')}</h2>
      <AuthForm useAuth={useCreateUserWithEmailAndPassword} />
    </Center>
  );
};

export default SignUpPage;

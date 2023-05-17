import { FC } from 'react';

import { AuthForm } from '@components/AuthForm/AuthForm';
import { useSignInWithEmailAndPassword } from '@hooks/authentication';

const SignInPage: FC = () => {
  return (
    <div>
      <AuthForm useAuth={useSignInWithEmailAndPassword} />
    </div>
  );
};

export default SignInPage;

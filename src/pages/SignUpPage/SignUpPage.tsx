import { FC } from 'react';

import { AuthForm } from '@components/AuthForm/AuthForm';
import { useCreateUserWithEmailAndPassword } from '@hooks/authentication';

const SignUpPage: FC = () => {
  return (
    <div>
      <AuthForm useAuth={useCreateUserWithEmailAndPassword} />
    </div>
  );
};

export default SignUpPage;

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from '@hooks/authentication';
import { getTranslationKey } from '@utils/auth';

export interface AuthFormProps {
  useAuth: typeof useSignInWithEmailAndPassword | typeof useCreateUserWithEmailAndPassword;
}

export interface AuthFormData {
  email: string;
  password: string;
}

export const AuthForm: FC<AuthFormProps> = ({ useAuth }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [auth, credentials, loading, error] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>();

  if (credentials) {
    navigate('/');
  }

  const type = String(
    new Map([
      [useSignInWithEmailAndPassword, 'login'],
      [useCreateUserWithEmailAndPassword, 'register'],
    ]).get(useAuth)
  );

  return (
    <form
      className="flex flex-col justify-between items-center [&>*:nth-child(odd)]:my-4"
      onSubmit={handleSubmit(async (data) => {
        const credentials = await auth(data.email, data.password);
        if (credentials) {
          navigate('/');
        }
      })}
    >
      <FormControl isInvalid={Boolean(errors.email)}>
        <FormLabel>{t(`auth-form.email`)}</FormLabel>
        <Input
          type="email"
          autoComplete="email"
          {...register('email', {
            required: t('auth-form.validate.required'),
            pattern: {
              value: /\w+@\w+\.\w+/g,
              message: t('auth-form.validate.email.pattern'),
            },
          })}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.password)}>
        <FormLabel>{t(`auth-form.password`)}</FormLabel>
        <Input
          type="password"
          autoComplete={type === 'login' ? 'current-password' : 'new-password'}
          {...register('password', {
            required: t('auth-form.validate.required'),
            minLength: {
              value: 8,
              message: t('auth-form.validate.password.minLength', { count: 8 }),
            },
            pattern: {
              value: /(?=.*\p{Letter})(?=.*\p{Number})(?=.*(\p{Symbol}|\p{Punctuation})).+/gu,
              message: t('auth-form.validate.password.pattern'),
            },
          })}
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{t(getTranslationKey(error))}</AlertTitle>
        </Alert>
      )}
      {credentials && (
        <Alert status="error">
          <AlertIcon />
        </Alert>
      )}

      <Button
        className="rounded border p-2 bg-blue-100 dark:bg-blue-950"
        type="submit"
        isLoading={loading}
        background="bg-blue-100 dark:bg-blue-950"
      >
        {t(`auth-form.${type}.submit`)}
      </Button>
    </form>
  );
};

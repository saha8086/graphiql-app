import * as firebaseHooks from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

export const useAuth = () => {
  const [authorized] = firebaseHooks.useAuthState(auth);
  const [signOut] = firebaseHooks.useSignOut(auth);
  return [Boolean(authorized), signOut] as const;
};

export const useIdToken = () => firebaseHooks.useIdToken(auth);

export const useSignInWithEmailAndPassword = () =>
  firebaseHooks.useSignInWithEmailAndPassword(auth);

export const useCreateUserWithEmailAndPassword = () =>
  firebaseHooks.useCreateUserWithEmailAndPassword(auth, {
    sendEmailVerification: true,
  });

export const useUpdateEmail = () => firebaseHooks.useUpdateEmail(auth);

export const useUpdatePassword = () => firebaseHooks.useUpdatePassword(auth);

export const useUpdateProfile = () => firebaseHooks.useUpdateProfile(auth);

export const useVerifyBeforeUpdateEmail = () => firebaseHooks.useVerifyBeforeUpdateEmail(auth);

export const useSendPasswordResetEmail = () => firebaseHooks.useSendPasswordResetEmail(auth);

export const useDeleteUser = () => firebaseHooks.useDeleteUser(auth);

import { FC } from 'react';

import { useAuth } from '@hooks/authentication';
import { SignOutButton } from '@components/SignOutButton/SignOutButton';
import { SignInButton } from '@components/SignInButton/SignInButton';
import { SignUpButton } from '@components/SignUpButton/SignUpButton';
import { ChangeLanguage } from '@components/ChangeLanguage/ChangeLanguage';
import { GraphiQlButton } from '@components/GraphiQlButton/GraphiQlButton';

export const Header: FC = () => {
  const [authorized, signOut] = useAuth();

  const buttonClassName =
    'border rounded p-2 border-white hover:bg-slate-300 dark:hover:bg-slate-700';

  return (
    <header className="sticky transition-all flex justify-end w-screen z-10 top-0 p-4 bg-slate-200 dark:bg-slate-800">
      {authorized ? (
        <>
          <SignOutButton className={buttonClassName} onClick={signOut} />
          <GraphiQlButton className={`${buttonClassName} mx-4`} />
        </>
      ) : (
        <div>
          <SignInButton className={buttonClassName} />
          <SignUpButton className={`${buttonClassName} mx-4`} />
        </div>
      )}
      <ChangeLanguage className={buttonClassName} />
    </header>
  );
};

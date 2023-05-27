import { FC } from 'react';

import { useAuth } from '@hooks/authentication';
import { SignOutButton } from '@components/SignOutButton/SignOutButton';
import { SignInButton } from '@components/SignInButton/SignInButton';
import { SignUpButton } from '@components/SignUpButton/SignUpButton';
import { ChangeLanguage } from '@components/ChangeLanguage/ChangeLanguage';
import { GraphiQlButton } from '@components/GraphiQlButton/GraphiQlButton';

import styles from './Header.module.css';

export const Header: FC = () => {
  const [authorized, signOut] = useAuth();

  return (
    <header className={styles.header}>
      {authorized ? (
        <>
          <SignOutButton className={styles.button} onClick={signOut} />
          <GraphiQlButton className={styles.button} />
        </>
      ) : (
        <>
          <SignInButton className={styles.button} />
          <SignUpButton className={styles.button} />
        </>
      )}
      <ChangeLanguage className={styles.button} />
    </header>
  );
};

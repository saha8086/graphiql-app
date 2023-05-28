import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '@hooks/authentication';
import { SignOutButton } from '@components/SignOutButton/SignOutButton';
import { SignInButton } from '@components/SignInButton/SignInButton';
import { SignUpButton } from '@components/SignUpButton/SignUpButton';
import { ChangeLanguage } from '@components/ChangeLanguage/ChangeLanguage';
import { GraphiQlButton } from '@components/GraphiQlButton/GraphiQlButton';

import styles from './Header.module.css';

import GraphiQL from '/GraphiQL.svg';

export const Header: FC = () => {
  const [authorized, signOut] = useAuth();

  return (
    <header className={styles.header}>
      <h1 className="self-center font-bold hover:text-blue-500 cursor-pointer">
        <Link to="/">
          <img src={GraphiQL} alt="GraphiQL" className="h-8 dark:invert" />
        </Link>
      </h1>
      <div className="space-x-4">
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
      </div>
    </header>
  );
};

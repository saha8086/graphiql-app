import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import reactLogo from 'src/assets/react.svg';
import viteLogo from '/vite.svg';

import './WelcomePage.css';

const linkClassName = 'font-medium text-[#646cff] hover:text-[#747bff] dark:hover:text-[#535bf2]';

// todo: https://github.com/saha8086/graphiql-app/issues/6
const WelcomePage: FC = () => {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();

  return (
    <>
      <div className="flex place-items-center justify-around">
        <a className={linkClassName} href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a className={linkClassName} href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-[3.2rem] leading-[1.1]">Vite + React</h1>
      <div className="p-8">
        <button className="btn" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          {t('vite-welcome.edit')} <code>src/App.tsx</code> {t('vite-welcome.and')} save to test HMR
        </p>
      </div>
      <p className="text-gray-[#888]">Click on the Vite and React logos to learn more</p>
    </>
  );
};

export default WelcomePage;

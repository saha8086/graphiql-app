import { FC } from 'react';

import { Header } from 'src/components/Header/Header';
import { Footer } from 'src/components/Footer/Footer';

import { Outlet } from 'react-router-dom';

const App: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;

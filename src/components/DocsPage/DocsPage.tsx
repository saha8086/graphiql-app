import { store } from '@app/store';
import { FC, ReactNode } from 'react';

type DocsPageProps = {
  name: string;
  children: ReactNode;
  goBack?: boolean;
};

const DocsPage: FC<DocsPageProps> = ({ name, children, goBack }) => {
  const pages = store.getState().docsPages.openedPages;
  return (
    <div key={name}>
      {goBack && (
        <button
          className="gray-text back"
          onClick={() => store.dispatch({ type: 'docsPages/goBack' })}
        >
          {'<'}
          {pages[pages.length - 2].name}
        </button>
      )}
      <h3 className="font-bold text-2xl">{name}</h3>
      {children}
    </div>
  );
};

export default DocsPage;

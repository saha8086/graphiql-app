import GraphiQlDocs from '@components/GraphiQlDocs/GraphiQlDocs';
import { useAppSelector } from '@hooks/redux';
import { selectBaseUrl } from '@pages/GraphQLPage/components/InputURL/InputURL.slice';
import { useIntrospectionQuery } from '@services/graphql.service';
import { getClientSchema } from '@utils/graphql';
import { GraphQLSchema } from 'graphql';
import { FC, useEffect, useState, ReactNode } from 'react';
import { VscFile } from 'react-icons/vsc';

export interface GraphiQlSpaceProps {
  children: ReactNode;
}

export const GraphiQlSpace: FC<GraphiQlSpaceProps> = ({ children }) => {
  const [schema, setSchema] = useState<GraphQLSchema>();
  const [docsDisplay, setDocsDisplay] = useState<boolean>(false);

  const baseUrl = useAppSelector(selectBaseUrl);
  const { currentData } = useIntrospectionQuery({ baseUrl });

  useEffect(() => {
    if (currentData) {
      setSchema(getClientSchema(currentData));
    }
  }, [currentData]);

  return (
    <>
      <div className="sticky h-screen flex flex-row float-left">
        <aside className="w-[55px] flex flex-col dark:bg-slate-700">
          <button
            aria-label="Documentation"
            onClick={() => setDocsDisplay(!docsDisplay)}
            className="mx-auto mt-5 dark:bg-slate-800 w-[35px] h-[35px] flex justify-center items-center rounded-lg hover:bg-slate-300 ease-linear duration-150"
          >
            <VscFile className="text-2xl" />
          </button>
        </aside>
        {docsDisplay && schema && <GraphiQlDocs schema={schema} />}
      </div>
      {children}
    </>
  );
};

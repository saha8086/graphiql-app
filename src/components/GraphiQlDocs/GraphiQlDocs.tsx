import { GraphQLSchema } from 'graphql';
import { FC } from 'react';

import './GraphiQlDocs.css';

import expandTree from './Expander/Expander';
import { useAppSelector } from '@hooks/redux';
import DocsPage from '@components/DocsPage/DocsPage';
import { store } from '@app/store';

const firstPage = (
  <DocsPage name="Docs">
    <p>A GraphQL schema provides a root type for each kind of operation.</p>
    <h3 className="my-2 font-semibold">Root Types</h3>
    <p className="blue-text">
      query:{' '}
      <span className="yellow-text" onClick={() => expandTree(store.getState().docsPages.schema)}>
        Query
      </span>
    </p>
  </DocsPage>
);

type GraphiQlDocsProps = {
  schema: GraphQLSchema;
};

const GraphiQlDocs: FC<GraphiQlDocsProps> = ({ schema }) => {
  const fields = schema.getQueryType()?.getFields() as object;
  store.dispatch({ type: 'docsPages/setSchema', payload: fields });
  const pagesList = useAppSelector((state) => state.docsPages.openedPages);

  return (
    <div className="docs bg-white min-w-[200px] max-w-[400px] flex flex-col grow-[0.1] shrink-[1] p-2 pr-[50px] overflow-y-scroll">
      {schema && pagesList[pagesList.length - 1].node}
    </div>
  );
};

export default GraphiQlDocs;
export { firstPage };

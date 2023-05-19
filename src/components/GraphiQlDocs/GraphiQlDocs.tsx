import { GraphQLFieldMap, GraphQLSchema } from 'graphql';
import { FC } from 'react';

import './GraphiQlDocs.css';

import expandTree from './Expander';

type GraphiQlDocsProps = {
  schema: GraphQLSchema;
};

const GraphiQlDocs: FC<GraphiQlDocsProps> = ({ schema }) => {
  return (
    <div className="docs bg-white min-w-[200px] flex flex-col grow-[0.1] shrink-[1] p-2 overflow-y-scroll">
      <h2 className="font-bold text-2xl">Docs</h2>
      {schema &&
        (() => {
          console.log(schema.getQueryType()?.getFields());
          const fields = schema.getQueryType()?.getFields();
          const expanded = expandTree(fields);
          return expanded;
        })()}
    </div>
  );
};

export default GraphiQlDocs;

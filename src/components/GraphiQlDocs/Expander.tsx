import { store } from '@app/store';
import { Divider } from '@chakra-ui/react';
import DocsPage from '@components/DocsPage/DocsPage';
import { ReactNode } from 'react';

type QueryType = {
  args: Argument[];
  astNode: unknown;
  deprecationReason: unknown;
  description: string;
  extensions: object;
  name: string;
  resolve: unknown;
  subscribe: unknown;
  type: ReturnType;
};

type ReturnType = {
  _fields: object;
  name: string;
};

type ArgType = {
  description: string;
  name: string;
};

type IdType = {
  ofType: ArgType;
};

type Argument = {
  astNode: unknown;
  deprecationReason: unknown;
  defaultValue: unknown;
  description: string;
  extensions: object;
  name: string;
  type: ArgType | IdType;
};

const expandArgs = (args: Argument[]): ReactNode => {
  const argsNode = (
    <>
      {args.map((arg) => (
        <span className="red-text" key={arg.name}>
          {`${arg.name}: `}

          {arg.name === 'ids' ? (
            <span className="gray-text">
              {'['}
              {<span className="yellow-text">{'ID'}</span>}
              {'!]!'}
            </span>
          ) : (
            <span className="yellow-text">
              {(arg.type as ArgType).name
                ? (arg.type as ArgType).name
                : (arg.type as IdType).ofType.name}
              {args.length > 1 && '\n'}
            </span>
          )}
        </span>
      ))}
    </>
  );
  if (args.length > 1) {
    return <pre>{argsNode}</pre>;
  }
  return argsNode;
};

const openPage = (name: string, node: ReactNode) => {
  store.dispatch({
    type: 'docsPages/openPage',
    payload: {
      name,
      node: (
        <DocsPage name={name} goBack>
          {node}
        </DocsPage>
      ),
    },
  });
};

const expandTree = (TreeNode: object | undefined): void => {
  if (!TreeNode) {
    return;
  }
  const entries = Object.entries(TreeNode);
  const keys = Object.keys(TreeNode);
  const result: ReactNode[] = [];
  if (!keys.includes('type')) {
    entries.forEach((entry: [string, unknown]) => {
      const currentNode = entry[1] as QueryType;
      const reactNode = (
        <div key={currentNode.name} className="mt-[16px]">
          <span>
            <span className="queryType">{currentNode.name}</span>
            <span className="gray-text">{'('}</span>
            {expandArgs(currentNode.args)}
            <span className="gray-text">{'): '}</span>
            <span className="yellow-text">{currentNode.type.name}</span>
          </span>
          <p className="gray-text my-[12px]">{currentNode.description}</p>
          <Divider />
        </div>
      );
      result.push(reactNode);
    });
  }
  openPage('Query', result);
};

export default expandTree;

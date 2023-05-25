import { store } from '@app/store';
import { Divider } from '@chakra-ui/react';
import DocsPage from '@components/DocsPage/DocsPage';
import { FC, Fragment, ReactNode } from 'react';
import {
  ArgType,
  Argument,
  IdType,
  InBracesProps,
  IterateObjArgs,
  IterateObjCallBack,
  QueryType,
  ReturnType,
  ReturnTypeArray,
} from './ExpanderTypes';

const expandArgs = (args: Argument[]): ReactNode => {
  const argsNode = (
    <>
      {args.map((arg) => (
        <span className="red-text" key={arg.name}>
          {`${arg.name}: `}

          {arg.name === 'ids' ? (
            <span className="gray-text" onClick={() => expandType(arg.type as ReturnType)}>
              <Wrapper startBrace="[" endBrace="!]!">
                {<span className="yellow-text">{'ID'}</span>}
              </Wrapper>
            </span>
          ) : (
            <span className="yellow-text" onClick={() => expandType(arg.type as ReturnType)}>
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

const openPage = (name: string, node: ReactNode): void => {
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

const Wrapper: FC<InBracesProps> = ({ startBrace, children, endBrace }) => {
  return (
    <>
      {' '}
      <span className="gray-text">{startBrace}</span>
      {children}
      <span className="gray-text">{endBrace}</span>
    </>
  );
};

const isOfType = (node: ReturnType | ReturnTypeArray): ReturnType => {
  return (node as ReturnTypeArray).ofType as ReturnType;
};

const isDoubleOfType = (node: ReturnType | ReturnTypeArray) => {
  return (
    isOfType(node) && (((node as ReturnTypeArray).ofType as ReturnTypeArray).ofType as ReturnType)
  );
};

const expandType = (typeNode: ReturnType | ReturnTypeArray): void => {
  let nextPageName = '';
  let pageToDisplay: ReactNode[];
  const fields: object | undefined = (typeNode as ReturnType)._fields;
  if (fields) {
    nextPageName = (typeNode as ReturnType).name;
    // if true => composed type
    pageToDisplay = iterateObject((args: IterateObjArgs) => {
      args.result.push(<p className="my-2 gray-text font-bold">Fields</p>);
      args.entries.forEach((entry: [string, unknown]) => {
        const currentNode = entry[1] as ReturnType;
        const typeOf = currentNode.type && isOfType(currentNode.type);
        const doubleTypeOf = currentNode.type && isDoubleOfType(currentNode.type);
        const type = (currentNode.type as ReturnType).name;
        const resultNode = (
          <Fragment key={currentNode.name}>
            <div className="pl-2">
              <span className="blue-text">
                {currentNode.name}:{' '}
                <span
                  className="yellow-text"
                  onClick={() => expandType(currentNode.type as ReturnType)}
                >
                  {doubleTypeOf ? (
                    <Wrapper startBrace="[" endBrace="]!">
                      {doubleTypeOf.name}
                    </Wrapper>
                  ) : typeOf ? (
                    <Wrapper startBrace="[" endBrace="]">
                      {typeOf.name}
                    </Wrapper>
                  ) : (
                    type
                  )}
                </span>
              </span>
              <p className="gray-text my-[12px]">{currentNode.description}</p>
            </div>
          </Fragment>
        );
        args.result.push(resultNode);
      });
    }, fields);
  } else {
    //else it's an array type
    const typeOf = isDoubleOfType(typeNode) || isOfType(typeNode);
    if (typeOf) {
      expandType(typeOf);
      return;
    }
    // else it's a basic type aka string, int etc...
    const node = typeNode as ReturnType;
    nextPageName = node.name;
    pageToDisplay = [
      <p key={node.name} className="gray-text">
        {node.description}
      </p>,
    ];
  }

  openPage(nextPageName, pageToDisplay);
};

const iterateObject = (callBack: IterateObjCallBack, node: object | undefined): ReactNode[] => {
  if (!node) {
    return [];
  }
  const entries = Object.entries(node);
  const keys = Object.keys(node);
  const result: ReactNode[] = [];
  callBack({ keys, entries, result });
  return result;
};

const expandTree = (TreeNode: object | undefined): void => {
  const result = iterateObject((args: IterateObjArgs) => {
    if (!args.keys.includes('type')) {
      args.entries.forEach((entry: [string, unknown]) => {
        const currentNode = entry[1] as QueryType;
        const reactNode = (
          <div key={currentNode.name} className="mt-[16px]">
            <span>
              <span className="queryType">{currentNode.name}</span>
              <Wrapper startBrace="(" endBrace="): ">
                {expandArgs(currentNode.args)}
              </Wrapper>
              <span className="yellow-text" onClick={() => expandType(currentNode.type)}>
                {isOfType(currentNode.type) ? (
                  <Wrapper startBrace="[" endBrace="]">
                    {((currentNode.type as ReturnTypeArray).ofType as ReturnType).name}
                  </Wrapper>
                ) : (
                  (currentNode.type as ReturnType).name
                )}
              </span>
            </span>
            <p className="gray-text my-[12px]">{currentNode.description}</p>
            <Divider />
          </div>
        );
        args.result.push(reactNode);
      });
    }
  }, TreeNode);
  openPage('Query', result);
};

export default expandTree;

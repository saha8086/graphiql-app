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
  type: ReturnType | ReturnTypeArray;
};

type ReturnType = {
  _fields?: object;
  name: string;
  description: string;
  type?: ReturnType | ReturnTypeArray;
};

type ReturnTypeArray = {
  ofType: ReturnType | ReturnTypeArray;
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

type IterateObjArgs = {
  keys: string[];
  entries: [string, unknown][];
  result: ReactNode[];
};

type InBracesProps = {
  startBrace: string;
  endBrace: string;
  children: ReactNode;
};

type IterateObjCallBack = (args: IterateObjArgs) => void;

export type {
  QueryType,
  IterateObjCallBack,
  ReturnType,
  Argument,
  ArgType,
  IdType,
  IterateObjArgs,
  ReturnTypeArray,
  InBracesProps,
};

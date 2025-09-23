import type { GraphQLFormattedError } from 'graphql';

export interface GraphQLResponseData<T extends object> {
  // https://spec.graphql.org/October2021/#sec-Data
  data: T;
}

export interface GraphQLResponseErrors {
  // https://spec.graphql.org/October2021/#sec-Errors.Request-errors
  errors: GraphQLFormattedError[];
}

export interface GraphQLResponseFieldErrors<T extends object> {
  data: T | null;
  // https://spec.graphql.org/October2021/#sec-Errors.Field-errors
  errors: GraphQLFormattedError[];
}

// https://spec.graphql.org/October2021/#sec-Response
export type GraphQLResponse<T extends object = Record<string, unknown>> =
  | GraphQLResponseData<T>
  | GraphQLResponseErrors
  | GraphQLResponseFieldErrors<T>;

import {
  GraphQLResponse,
  GraphQLResponseData,
  GraphQLResponseErrors,
  GraphQLResponseFieldErrors,
} from '@interfaces/graphql';
import {
  validate,
  parse,
  validateSchema,
  buildClientSchema,
  IntrospectionQuery,
  GraphQLSchema,
  GraphQLError,
} from 'graphql';

const buildedSchemas = new WeakMap<IntrospectionQuery, GraphQLSchema>();

/** @throws readonly GraphQLError[] */
export const getClientSchema = (introspection: IntrospectionQuery) => {
  let schema = buildedSchemas.get(introspection);

  if (schema) {
    return schema;
  }

  schema = buildClientSchema(introspection);

  const errors = validateSchema(schema);
  if (errors.length) {
    throw errors;
  }

  buildedSchemas.set(introspection, schema);

  return schema;
};

export const validateGraphQLSync = (introspection: IntrospectionQuery, source: string) => {
  let errors: readonly GraphQLError[];

  try {
    errors = validate(getClientSchema(introspection), parse(source));
  } catch (error) {
    errors = Array.isArray(error) ? error : [error];
  }

  return errors.length ? errors.map((e) => e.toJSON()) : undefined;
};

export const isResponseData = <T extends object = Record<string, unknown>>(
  response: GraphQLResponse<T>
): response is GraphQLResponseData<T> =>
  !('errors' in response) && response.data && typeof response.data === 'object';

export const isResponseErrors = (response: GraphQLResponse): response is GraphQLResponseErrors =>
  !isResponseData(response) &&
  Array.isArray(response.errors) &&
  // https://spec.graphql.org/draft/#sec-Errors.Error-Result-Format
  response.errors.every((error) => typeof error.message === 'string');

export const isResponseFieldErrors = <T extends object = Record<string, unknown>>(
  response: GraphQLResponse<T>
): response is GraphQLResponseFieldErrors<T> =>
  'data' in response &&
  'errors' in response &&
  typeof response.data === 'object' &&
  Array.isArray(response.errors) &&
  // https://spec.graphql.org/draft/#sec-Errors.Error-Result-Format
  response.errors.every((error) => typeof error.message === 'string');

/** @summary Some APIs use "data with errors" to describe response errors. This is not conformant to the GraphQL specification. */
export const isDataWithErrors = (
  response: GraphQLResponse<GraphQLResponseErrors>
): response is GraphQLResponseData<GraphQLResponseErrors> =>
  isResponseData(response) && isResponseErrors(response.data);

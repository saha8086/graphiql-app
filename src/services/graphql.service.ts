import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IntrospectionQuery, getIntrospectionQuery } from 'graphql';
import type { GraphQLResponseData } from '@interfaces/graphql';
import { Draft } from '@reduxjs/toolkit';

interface ApiRequest {
  baseUrl: string;
  query: string;
  variables?: object;
}

export const graphqlApi = createApi({
  reducerPath: 'graphqlApi',

  baseQuery: fetchBaseQuery({
    baseUrl: '',
    // https://github.com/graphql/graphql-over-http/blob/main/spec/GraphQLOverHTTP.md#post
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // https://github.com/graphql/graphql-over-http/blob/main/spec/GraphQLOverHTTP.md#accept
      Accept: 'application/graphql-response+json',
    },
  }),

  endpoints: (builder) => ({
    graphQL: builder.query<GraphQLResponseData<Record<string, unknown>>, ApiRequest>({
      query: ({ baseUrl, query, variables }) => ({
        url: baseUrl,
        body: {
          query,
          variables,
        },
      }),
    }),

    introspection: builder.query({
      query: ({ baseUrl }: Pick<ApiRequest, 'baseUrl'>) => ({
        url: baseUrl,
        body: {
          query: getIntrospectionQuery(),
        },
      }),

      transformResponse: (baseQueryReturnValue: GraphQLResponseData<Draft<IntrospectionQuery>>) =>
        baseQueryReturnValue.data,
    }),
  }),
});

export const introspectionMatchFulfilled = graphqlApi.endpoints.introspection.matchFulfilled;

export const {
  useGraphQLQuery,
  useLazyGraphQLQuery,
  useIntrospectionQuery,
  useLazyIntrospectionQuery,
} = graphqlApi;

import GraphiQlDocs from '@components/GraphiQlDocs/GraphiQlDocs';
import ApiEndpoint from '@consts/ApiEndpoint';
import {
  IntrospectionQuery,
  buildClientSchema,
  getIntrospectionQuery,
  GraphQLSchema,
} from 'graphql';
import { FC, useEffect, useState } from 'react';

type IntrospectionType = ReturnType<typeof getIntrospectionQuery>;

type FetcherType = {
  query: IntrospectionType;
};

interface ApiResponse {
  data: {
    data: IntrospectionQuery;
  } | null;
}

function fetcher(params: FetcherType): Promise<ApiResponse> {
  return fetch(ApiEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (responseBody) {
      try {
        const data = JSON.parse(responseBody) as ApiResponse['data'];
        return { data };
      } catch (e) {
        return { data: null };
      }
    });
}

export const GraphiQlSpace: FC = () => {
  const [schema, setSchema] = useState<GraphQLSchema>();
  const [docsDisplay, setDocsDisplay] = useState<boolean>(false);

  useEffect(() => {
    const IntrospectionQuery: FetcherType = { query: getIntrospectionQuery() };
    fetcher(IntrospectionQuery)
      .then((result) => result.data && setSchema(buildClientSchema(result.data.data)))
      .catch((err) => console.log('failed', err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="text-6xl font-bold underline mb-4">GraphQL Page</h1>
      <div className="h-[71vh] flex flex-row bg-red-50">
        <aside className="w-[55px] bg-white flex flex-col ">
          <button
            onClick={() => setDocsDisplay(!docsDisplay)}
            className="mx-auto mt-5 bg-white w-[35px] h-[35px] flex justify-center items-center rounded-lg hover:bg-slate-300 ease-linear duration-150"
          >
            <svg height="1.5em" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <title>Documentation</title>
              <path
                d="M0.75 3C0.75 4.24264 1.75736 5.25 3 5.25H17.25M0.75 3C0.75 1.75736 1.75736 0.75 3 0.75H16.25C16.8023 0.75 17.25 1.19772 17.25 1.75V5.25M0.75 3V21C0.75 22.2426 1.75736 23.25 3 23.25H18.25C18.8023 23.25 19.25 22.8023 19.25 22.25V6.25C19.25 5.69771 18.8023 5.25 18.25 5.25H17.25"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line x1="13" y1="11.75" x2="6" y2="11.75" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </aside>
        {docsDisplay && schema && <GraphiQlDocs schema={schema} />}
      </div>
    </>
  );
};

import { FC, useRef, useCallback } from 'react';

import { EditorRef } from '@components/Editor/Editor';
import { useAppSelector } from '@hooks/redux';
import { useLazyGraphQLQuery, useLazyIntrospectionQuery } from '@services/graphql.service';
import { validateGraphQLSync } from '@utils/graphql';
import { useViewportWidth } from '@hooks/responsive';

import { selectBaseUrl } from './components/InputURL/InputURL.slice';
import { Desktop } from './layouts/Desktop';
import { Mobile } from './layouts/Mobile';

const GraphQLPage: FC = () => {
  const [callApi, { error: errorResponse, data: response, isLoading }] = useLazyGraphQLQuery();
  const [getIntrospection] = useLazyIntrospectionQuery();

  const baseUrl = useAppSelector(selectBaseUrl);

  const action = useRef<ReturnType<typeof callApi>>();

  const queryEditorRef = useRef<EditorRef>(null);
  const variablesEditorRef = useRef<EditorRef>(null);

  const onRunClick = useCallback(async () => {
    const query = queryEditorRef.current?.view?.state?.doc?.toJSON();
    const variables = variablesEditorRef.current?.view?.state?.doc?.toJSON();

    if (!query?.some((line) => line.trim()) || !baseUrl) {
      return;
    }

    action.current?.abort();

    try {
      const introspection = await getIntrospection({ baseUrl }, true).unwrap();

      const errors = validateGraphQLSync(introspection, query.join('\n'));
      if (errors) {
        throw errors;
      }

      action.current = callApi({
        query: query.join('\n'),
        baseUrl,
        variables: JSON.parse(variables?.join('\n') || '') as unknown as object,
      });
    } catch (error) {
      if (Array.isArray(error)) {
        error.forEach((e) => console.error(e));
        return;
      }
      console.error(error);
    }
  }, [baseUrl, callApi, getIntrospection]);

  const responsive = useViewportWidth();

  const Layout = responsive.isMobile ? Mobile : Desktop;

  return (
    <Layout
      isLoading={isLoading}
      onRunClick={onRunClick}
      queryEditorRef={queryEditorRef}
      variablesEditorRef={variablesEditorRef}
      response={response}
      errorResponse={errorResponse}
    />
  );
};

export default GraphQLPage;

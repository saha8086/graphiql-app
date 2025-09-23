import type { Ref } from 'react';
import type { EditorRef } from '@components/Editor/Editor';
import type { GraphQLResponseData } from '@interfaces/graphql';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export interface LayoutProps {
  isLoading: boolean;
  onRunClick: () => void;
  queryEditorRef: Ref<EditorRef>;
  variablesEditorRef: Ref<EditorRef>;
  response: GraphQLResponseData<Record<string, unknown>> | undefined;
  errorResponse: FetchBaseQueryError | SerializedError | undefined;
}

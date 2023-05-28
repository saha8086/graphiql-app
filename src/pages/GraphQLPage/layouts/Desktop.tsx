import { FC } from 'react';
import { Box, SimpleGrid, HStack } from '@chakra-ui/react';

import { HeadersEditor } from '@components/HeadersEditor/HeadersEditor';
import { InputURL } from '@pages/GraphQLPage/components/InputURL/InputURL';

import { RequestEditor } from '../components/RequestEditor/RequestEditor';
import { ResponseViewer } from '../components/ResponseViewer/ResponseViewer';
import { LayoutProps } from './types';
import { VariablesEditor } from '../components/VariablesEditor/VariablesEditor';
import { PlayButton } from '../components/PlayButton/PlayButton';

const className = 'rounded border xl:min-h-[20rem]';

export const Desktop: FC<LayoutProps> = ({
  isLoading,
  onRunClick,
  queryEditorRef,
  variablesEditorRef,
  response,
  errorResponse,
}) => (
  <SimpleGrid columns={2} spacing={4} className="p-5">
    <Box>
      <HStack className="p-1">
        <InputURL />

        <PlayButton isLoading={isLoading} onRunClick={onRunClick} />
      </HStack>

      <RequestEditor
        ref={queryEditorRef}
        editorClassName={`${className} border-black dark:border-white`}
      />
      <HeadersEditor onSubmit={console.log} />
      <VariablesEditor ref={variablesEditorRef} className={className} />
    </Box>

    <ResponseViewer value={response ?? errorResponse} editorClassName={className} />
  </SimpleGrid>
);

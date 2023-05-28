import { FC } from 'react';
import { Box, SimpleGrid, HStack, Divider } from '@chakra-ui/react';

import { HeadersEditor } from '@components/HeadersEditor/HeadersEditor';
import { InputURL } from '@pages/GraphQLPage/components/InputURL/InputURL';

import { RequestEditor } from '../components/RequestEditor/RequestEditor';
import { ResponseViewer } from '../components/ResponseViewer/ResponseViewer';
import { LayoutProps } from './types';
import { VariablesEditor } from '../components/VariablesEditor/VariablesEditor';
import { PlayButton } from '../components/PlayButton/PlayButton';

const className = 'rounded border xl:min-h-[20rem]';

export const Mobile: FC<LayoutProps> = ({
  isLoading,
  onRunClick,
  queryEditorRef,
  variablesEditorRef,
  response,
  errorResponse,
}) => (
  <SimpleGrid columns={1} spacing={8} className="p-3">
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

    <Divider orientation="horizontal" />

    <ResponseViewer value={response ?? errorResponse} editorClassName={className} />
  </SimpleGrid>
);

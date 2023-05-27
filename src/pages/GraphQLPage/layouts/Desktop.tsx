import { FC } from 'react';
import { Button, Box, SimpleGrid, HStack } from '@chakra-ui/react';
import { VscPlay } from 'react-icons/vsc';

import { Editor } from '@components/Editor/Editor';
import { HeadersEditor } from '@components/HeadersEditor/HeadersEditor';
import { InputURL } from '@pages/GraphQLPage/components/InputURL/InputURL';

import { RequestEditor } from '../components/RequestEditor/RequestEditor';
import { ResponseViewer } from '../components/ResponseViewer/ResponseViewer';
import { LayoutProps } from './types';

const className = 'rounded border xl:min-h-[20rem]';

export const Desktop: FC<LayoutProps> = ({
  isLoading,
  onRunClick,
  queryEditorRef,
  variablesEditorRef,
  response,
  errorResponse,
}) => (
  <SimpleGrid columns={2} spacing={4} className="p-4">
    <Box>
      <HStack className="p-1">
        <InputURL />

        <Button isLoading={isLoading} onClick={onRunClick}>
          <VscPlay className="text-base" />
        </Button>
      </HStack>

      <RequestEditor
        ref={queryEditorRef}
        editorClassName={`${className} border-black dark:border-white`}
      />
      <HeadersEditor onSubmit={console.log} />
      <Editor value="" ref={variablesEditorRef} lang="json" className={className} />
    </Box>

    <ResponseViewer value={response ?? errorResponse} editorClassName={className} />
  </SimpleGrid>
);

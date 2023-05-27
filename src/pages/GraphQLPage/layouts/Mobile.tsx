import { FC } from 'react';
import { Button, Box, SimpleGrid, HStack, Divider } from '@chakra-ui/react';
import { VscPlay } from 'react-icons/vsc';

import { Editor } from '@components/Editor/Editor';
import { HeadersEditor } from '@components/HeadersEditor/HeadersEditor';
import { InputURL } from '@pages/GraphQLPage/components/InputURL/InputURL';

import { RequestEditor } from '../components/RequestEditor/RequestEditor';
import { ResponseViewer } from '../components/ResponseViewer/ResponseViewer';
import { LayoutProps } from './types';

const className = 'rounded border xl:min-h-[20rem]';

export const Mobile: FC<LayoutProps> = ({
  isLoading,
  onRunClick,
  queryEditorRef,
  variablesEditorRef,
  response,
  errorResponse,
}) => (
  <SimpleGrid columns={1} spacing={8} className="p-8">
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

    <Divider orientation="horizontal" />

    <ResponseViewer value={response ?? errorResponse} editorClassName={className} />
  </SimpleGrid>
);

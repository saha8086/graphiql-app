import { FC } from 'react';
import { Box, SimpleGrid, HStack } from '@chakra-ui/react';

import { HeadersEditor } from '@components/HeadersEditor/HeadersEditor';
import { InputURL } from '@pages/GraphQLPage/components/InputURL/InputURL';

import { RequestEditor } from '../components/RequestEditor/RequestEditor';
import { ResponseViewer } from '../components/ResponseViewer/ResponseViewer';
import { LayoutProps } from './types';
import { VariablesEditor } from '../components/VariablesEditor/VariablesEditor';
import { PlayButton } from '../components/PlayButton/PlayButton';
import { GraphiQlSpace } from '@components/GraphiQlSpace/GraphiQlSpace';
import { Dimensions } from '@components/Editor/Editor';

const className = 'rounded border';

const dimensions = {
  minHeight: '20vh',
  maxHeight: '30vh',
} as const satisfies Dimensions;

export const Desktop: FC<LayoutProps> = ({
  isLoading,
  onRunClick,
  queryEditorRef,
  variablesEditorRef,
  response,
  errorResponse,
}) => (
  <GraphiQlSpace>
    <SimpleGrid columns={2} spacing={4} className="p-5">
      <Box>
        <HStack className="p-1">
          <InputURL />

          <PlayButton isLoading={isLoading} onRunClick={onRunClick} />
        </HStack>

        <RequestEditor
          ref={queryEditorRef}
          editorClassName={`${className} border-black dark:border-white`}
          {...dimensions}
        />
        <HeadersEditor onSubmit={console.log} />
        <VariablesEditor ref={variablesEditorRef} className={className} {...dimensions} />
      </Box>

      <ResponseViewer
        value={response ?? errorResponse}
        editorClassName={className}
        {...dimensions}
      />
    </SimpleGrid>
  </GraphiQlSpace>
);

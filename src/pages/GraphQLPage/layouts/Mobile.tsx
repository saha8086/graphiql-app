import { FC } from 'react';
import { Box, SimpleGrid, HStack, Divider } from '@chakra-ui/react';

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
  minHeight: '10vh',
  maxHeight: '20vh',
} as const satisfies Dimensions;

export const Mobile: FC<LayoutProps> = ({
  isLoading,
  onRunClick,
  queryEditorRef,
  variablesEditorRef,
  response,
  errorResponse,
}) => (
  <GraphiQlSpace>
    <SimpleGrid columns={1} spacing={8} className="p-3">
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

      <Divider orientation="horizontal" />

      <ResponseViewer
        value={response ?? errorResponse}
        editorClassName={className}
        {...dimensions}
      />
    </SimpleGrid>
  </GraphiQlSpace>
);

import { forwardRef } from 'react';

import { Editor, EditorRef } from '@components/Editor/Editor';
import { useTranslation } from 'react-i18next';
import { Box } from '@chakra-ui/react';

export interface RequestEditorProps {
  boxClassName?: string;
  editorClassName?: string;
}

export const RequestEditor = forwardRef<EditorRef, RequestEditorProps>(
  ({ boxClassName, editorClassName }, ref) => {
    const { t } = useTranslation();

    return (
      <Box className={boxClassName}>
        <h2>{t('request')}</h2>
        <Editor
          value=""
          ref={ref}
          showLineNumbers
          showActiveLine
          foldGutter
          lang="graphql"
          className={editorClassName}
          aria-label={t('request')}
        />
      </Box>
    );
  }
);

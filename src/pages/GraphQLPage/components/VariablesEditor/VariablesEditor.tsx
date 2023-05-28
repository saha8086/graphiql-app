import { forwardRef } from 'react';

import { Editor, EditorRef } from '@components/Editor/Editor';
import { useTranslation } from 'react-i18next';
import { Box } from '@chakra-ui/react';

export interface VariablesEditorProps {
  className?: string;
}

export const VariablesEditor = forwardRef<EditorRef, VariablesEditorProps>(({ className }, ref) => {
  const { t } = useTranslation();

  return (
    <Box>
      <h2>{t('variables')}</h2>
      <Editor value="" ref={ref} lang="json" className={className} aria-label={t('variables')} />
    </Box>
  );
});

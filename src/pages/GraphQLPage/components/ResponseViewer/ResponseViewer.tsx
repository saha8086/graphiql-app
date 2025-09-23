import type { FC } from 'react';

import { Dimensions, Editor } from '@components/Editor/Editor';
import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export interface ResponseViewerProps extends Dimensions {
  value: object | undefined;
  boxClassName?: string;
  editorClassName?: string;
}

export const ResponseViewer: FC<ResponseViewerProps> = ({
  value,
  boxClassName,
  editorClassName,
  ...dimensions
}) => {
  const { t } = useTranslation();

  return (
    <Box className={boxClassName}>
      <h2>{t('response')}</h2>
      <Editor
        value={value ? JSON.stringify(value, undefined, 2) : ''}
        readOnly
        lang="json"
        className={editorClassName}
        aria-label={t('response')}
        {...dimensions}
      />
    </Box>
  );
};

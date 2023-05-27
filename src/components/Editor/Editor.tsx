import { forwardRef } from 'react';
import CodeMirror, { ReactCodeMirrorRef, BasicSetupOptions } from '@uiw/react-codemirror';
import { useColorModePreference } from '@chakra-ui/media-query';
import { EditorLang, EDITOR_LANGUAGES, EDITOR_THEMES } from '@consts/editor';

export interface EditorProps {
  className?: string;
  lang?: EditorLang;
  readOnly?: boolean;
  showActiveLine?: boolean;
  showLineNumbers?: boolean;
  foldGutter?: boolean;
  tabWidth?: number;
  value: string;
}

export const Editor = forwardRef<ReactCodeMirrorRef, EditorProps>(
  (
    {
      className,
      lang,
      readOnly,
      showActiveLine = false,
      showLineNumbers = false,
      foldGutter = false,
      tabWidth = 2,
      value,
    },
    ref
  ) => {
    const theme = useColorModePreference();

    const basicSetup: BasicSetupOptions = {
      highlightActiveLine: showActiveLine,
      lineNumbers: showLineNumbers,
      tabSize: tabWidth,
      foldGutter,
    };

    return (
      <CodeMirror
        basicSetup={basicSetup}
        className={className}
        editable={!readOnly}
        extensions={lang && EDITOR_LANGUAGES[lang]}
        readOnly={readOnly}
        ref={ref}
        theme={EDITOR_THEMES[theme ?? 'light']}
        value={value}
        maxHeight="100vh"
      />
    );
  }
);

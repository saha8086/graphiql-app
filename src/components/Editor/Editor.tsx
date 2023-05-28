import { forwardRef } from 'react';
import CodeMirror, { ReactCodeMirrorRef, BasicSetupOptions } from '@uiw/react-codemirror';
import { useColorModePreference } from '@chakra-ui/media-query';
import { EditorLang, EDITOR_LANGUAGES, EDITOR_THEMES } from '@consts/editor';
import { DistanceUnit } from '@interfaces/theme';

export interface Dimensions {
  height?: DistanceUnit;
  minHeight?: DistanceUnit;
  maxHeight?: DistanceUnit;
  width?: DistanceUnit;
  minWidth?: DistanceUnit;
  maxWidth?: DistanceUnit;
}

export interface EditorProps extends Dimensions {
  className?: string;
  lang?: EditorLang;
  readOnly?: boolean;
  showActiveLine?: boolean;
  showLineNumbers?: boolean;
  foldGutter?: boolean;
  tabWidth?: number;
  value: string;
  'aria-label': string;
}

export type EditorRef = ReactCodeMirrorRef;

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
      'aria-label': label,
      ...dimensions
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
        {...dimensions}
        basicSetup={basicSetup}
        className={className}
        editable={!readOnly}
        extensions={lang && EDITOR_LANGUAGES[lang]}
        readOnly={readOnly}
        ref={ref}
        theme={EDITOR_THEMES[theme ?? 'light']}
        value={value}
        role="textbox"
        aria-multiline
        aria-label={label}
      />
    );
  }
);

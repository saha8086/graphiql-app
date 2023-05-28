import { createTheme, Settings } from '@uiw/codemirror-themes';
import { json } from '@codemirror/lang-json';
import { tags } from '@lezer/highlight';
import { StreamLanguage, StringStream } from '@codemirror/language';
import type { Extension } from '@codemirror/state';

import { joinRegExp } from '@utils/regexp';
import styles from '@components/Editor/Editor.module.css';
import type { ColorType, ThemeType } from '@interfaces/theme';

const commonSettings = {
  fontFamily: 'monospace',
} as const satisfies Settings;

type ColorSettings = Record<keyof Settings, ColorType>;

const themeSpecificSettings = {
  light: {
    caret: '#444',
  },
  dark: {
    caret: '#AAA',
  },
} as const satisfies Record<ThemeType, Partial<ColorSettings>>;

const create = (theme: ThemeType) => ({
  [theme]: createTheme({
    theme,
    settings: {
      ...commonSettings,
      ...themeSpecificSettings[theme],
    },
    styles: [
      { tag: tags.lineComment, class: styles.lineComment },
      { tag: tags.variableName, class: styles.variableName },
      { tag: tags.typeName, class: styles.typeName },
      { tag: tags.propertyName, class: styles.propertyName },
      { tag: tags.attributeName, class: styles.attributeName },
      { tag: tags.className, class: styles.className },
      { tag: tags.string, class: styles.string },
      { tag: tags.number, class: styles.number },
      { tag: tags.bool, class: styles.bool },
      { tag: tags.keyword, class: styles.keyword },
      { tag: tags.operator, class: styles.operator },
      { tag: tags.punctuation, class: styles.punctuation },
      { tag: tags.invalid, class: styles.invalid },
      { tag: tags.function(tags.variableName), class: styles.variableNameFunction },
    ],
  }),
});

export const EDITOR_THEMES = {
  ...create('light'),
  ...create('dark'),
} as { readonly [K in ThemeType]: Extension };

// https://spec.graphql.org/October2021/#SourceCharacter
const sourceCharacter = /[\t\n\r\u0020-\uFFFF]/;

// https://spec.graphql.org/October2021/#Comment
const comment = /^#[\t\u0020-\uFFFF]*/;

// https://spec.graphql.org/October2021/#StringValue
const stringValue = [/^""(?!")/, /^"[^"]+?"/, /^"""[\s\S]*(?<!\\)"""/] as const;

// https://spec.graphql.org/October2021/#IntegerPart
const integerPart = /^-?(0|[1-9]\d*)/;

// https://spec.graphql.org/October2021/#IntValue
const numberLookahead = /(?![\w.])/;
const intValue = joinRegExp(integerPart, numberLookahead);

// https://spec.graphql.org/October2021/#FractionalPart
const fractionalPart = /\.\d+/;

// https://spec.graphql.org/October2021/#ExponentPart
const exponentPart = /[eE][+-]?\d+/;

// https://spec.graphql.org/October2021/#FloatValue
const floatValue = [
  joinRegExp(integerPart, fractionalPart, exponentPart, numberLookahead),
  joinRegExp(integerPart, fractionalPart, numberLookahead),
  joinRegExp(integerPart, exponentPart, numberLookahead),
] as const;

// https://spec.graphql.org/October2021/#BooleanValue
const booleanValue = /^(true|false)/;

// https://spec.graphql.org/October2021/#Name
const name = /[_a-zA-Z]\w*/;

//https://spec.graphql.org/October2021/#Directive
const directive = joinRegExp(/^@/, name);

// https://spec.graphql.org/October2021/#Variable
const variable = joinRegExp(/^\$/, name);

// https://spec.graphql.org/October2021/#sec-Scalars.Built-in-Scalars
const builtInScalars = /^(Int|Float|String|Boolean|ID)/;

// https://spec.graphql.org/October2021/#Punctuator
// ! $ & ( ) ... : = @ [ ] { | }
const punctuator = /^(!|\$|&|\(|\)|\.\.\.|:|=|@|\[|\]|\{|\||\})/;

// https://spec.graphql.org/October2021/#sec-Language.Arguments
const Arguments = joinRegExp(/^/, name, /(?=\s*:\s*.+)/);

// https://spec.graphql.org/October2021/#FieldDefinition
const field = joinRegExp(/^/, name, /(?=\()/);

/**
 * @linkExample https://regex101.com/r/AIrIsK/1
 * @description to get keywords run `[...new Set([...document.querySelectorAll('.token.keyword')].map((e) => e.innerText))].join('|');` query on https://spec.graphql.org/October2021/ site
 */
const keyword =
  /^(?<!\S)(?<=\s?)(mutation|query|fragment|on|type|schema|enum|scalar|extend|interface|implements|union|input|directive|repeatable|subscription|null)(?=\s)/;

interface StreamParserState {
  // same as /^"""[\s\S]*(?<!\\)"""/ see example https://regex101.com/r/rXUUd8/1
  blockString: boolean;
  keyword: boolean | RegExpMatchArray | null;
}

type ExcludeKeysByType<Type, TypeToExclude> = {
  [Key in keyof Type]: Type[Key] extends TypeToExclude ? never : Key;
}[keyof Type];

type Tags = ExcludeKeysByType<typeof tags, CallableFunction>;

type ModifierSuffix = Exclude<keyof typeof tags, Tags>;

/** @example ```tags.function(tags.variableName)``` matches `"variableName.function"` */
type SuffixedTags = `${Tags}.${ModifierSuffix}`;

type TokenType = Tags | SuffixedTags;

const statefullToken = (stream: StringStream, state: StreamParserState): TokenType | null => {
  const { blockString, keyword } = state;

  if (blockString) {
    if (stream.match(/^.*(?<!\\)"""/)) {
      state.blockString = false;
    } else {
      stream.skipToEnd();
    }
    return 'string';
  }

  if (Array.isArray(keyword)) {
    if (stream.match(/^\s/)) {
      return null;
    }

    // https://spec.graphql.org/October2021/#TypeDefinition
    // https://spec.graphql.org/October2021/#TypeCondition
    const keywordIsTypeDefinition = [
      'scalar',
      'type',
      'interface',
      'union',
      'enum',
      'input',
      'on',
    ].some((word) => word === keyword[0]);

    state.keyword = null;

    if (keywordIsTypeDefinition && stream.match(name)) {
      return 'className';
    }
  }

  return null;
};

const graphqlLang = StreamLanguage.define<StreamParserState>({
  startState: () => ({
    blockString: false,
    keyword: null,
  }),

  token: (stream, state): TokenType | null => {
    if (Object.values(state).some(Boolean)) {
      return statefullToken(stream, state);
    }

    if (stream.eatSpace()) {
      return null;
    }

    if (stream.match(comment)) {
      return 'lineComment';
    }

    for (const singleLineString of stringValue) {
      if (stream.match(singleLineString)) {
        return 'string';
      }
    }

    if (stream.match(/^""".*?(?!""")/)) {
      state.blockString = true;
      return 'string';
    }

    if (stream.match(intValue)) {
      return 'number';
    }

    for (const pattern of floatValue) {
      if (stream.match(pattern)) {
        return 'number';
      }
    }

    if (stream.match(booleanValue)) {
      return 'bool';
    }

    if (stream.match(builtInScalars)) {
      return 'typeName';
    }

    if (stream.match(directive)) {
      return 'variableName.function';
    }

    if (stream.match(variable)) {
      return 'variableName';
    }

    state.keyword = stream.match(keyword);
    if (state.keyword) {
      return 'keyword';
    }

    // https://spec.graphql.org/October2021/#sec-Language.Fragments
    // Fragments are consumed by using the spread operator (...)
    if (stream.match(/^\.\.\./)) {
      return 'operator';
    }

    if (stream.match(field)) {
      return 'propertyName';
    }

    if (stream.match(Arguments)) {
      return 'attributeName';
    }

    if (stream.match(punctuator)) {
      return 'punctuation';
    }

    // skip unknown word
    if (stream.match(/^\w+/)) {
      return null;
    }

    if (stream.eat(sourceCharacter)) {
      return null;
    }

    stream.next();

    return 'invalid';
  },
});

export const EDITOR_LANGUAGES = {
  json: [json()] as Extension[],
  graphql: [graphqlLang] as Extension[],
} as const;

export type EditorLang = keyof typeof EDITOR_LANGUAGES;

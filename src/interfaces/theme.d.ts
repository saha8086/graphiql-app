export type ThemeType = 'light' | 'dark';

export type ColorType =
  | `#${number | Uppercase<string>}` // color `#AAA` is same as `#0A0A0A`
  | `rgb(${number}, ${number}, ${number})`
  | `rgba(${number}, ${number}, ${number}, ${number})`;

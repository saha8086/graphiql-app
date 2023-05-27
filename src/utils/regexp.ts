export const joinRegExp = (...args: readonly RegExp[]) => {
  const pattern = args.map((arg) => arg.source).join('');

  const uniqueFlags = new Set(args.flatMap((arg) => arg.flags.split('')));

  return new RegExp(pattern, [...uniqueFlags].join(''));
};

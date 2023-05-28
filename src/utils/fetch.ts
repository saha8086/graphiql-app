const validator = new Headers();

export const isValidHeaderEntry = ([name, value]: [string, string]) => {
  try {
    // If the given name is not the name of an HTTP header, this method throws a TypeError.
    validator.set(name, value);
    return true;
  } catch (_) {
    return false;
  }
};

export const validateHeaders = (headers: HeadersInit): HeadersInit => {
  if (headers instanceof Headers) {
    // assume that instances of Headers are valid
    return headers;
  }

  if (Array.isArray(headers)) {
    return headers.filter(isValidHeaderEntry);
  }

  return Object.fromEntries(Object.entries(headers).filter(isValidHeaderEntry));
};

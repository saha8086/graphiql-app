// https://www.iana.org/assignments/http-fields/http-fields.xhtml
export const HEADERS = [
  // https://fetch.spec.whatwg.org/#no-cors-safelisted-request-header-name
  `Accept`,
  `Accept-Language`,
  `Content-Language`,
  `Content-Type`,
  // https://fetch.spec.whatwg.org/#cors-non-wildcard-request-header-name
  `Authorization`,
];

// https://fetch.spec.whatwg.org/#cors-safelisted-request-header
export const HEADER_MAX_LENGTH = 128;

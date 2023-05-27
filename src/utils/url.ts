export type ProtocolType = 'https:'; // todo: add `wss:` support

export const validateURL = (url: string, protocol: ProtocolType = 'https:') => {
  try {
    const valid = new URL(url);
    return valid.protocol === protocol ? url : undefined;
  } catch (_) {
    return;
  }
};

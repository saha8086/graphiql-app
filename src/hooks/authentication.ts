import { useState } from 'react';

// todo: add useAuth hook that returns [authorized, signOut] or similar
export const useAuth = () => {
  const [authorized, setAuthorized] = useState(true);
  const signOut = () => setAuthorized(false);
  return [authorized, signOut] as const;
};

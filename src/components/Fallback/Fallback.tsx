import { FC } from 'react';

export interface FallbackProps {
  error: Error;
}

export const Fallback: FC<FallbackProps> = ({ error }) => {
  return (
    <div role="alert" className="w-full h-full">
      {error.message}
    </div>
  );
};

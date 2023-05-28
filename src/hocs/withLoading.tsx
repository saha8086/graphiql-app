import { FC, Suspense } from 'react';

import { Loading } from '@components/Loading/Loading';

export const withLoading =
  <Props extends object>(Component: FC<Props>) =>
  (props: Props) =>
    (
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    );

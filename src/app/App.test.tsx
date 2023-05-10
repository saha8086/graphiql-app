import { describe, it } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { routes } from 'src/routes/router';

describe('App', () => {
  it('Renders hello world', async () => {
    const router = createMemoryRouter(routes);
    const { getByRole } = render(<RouterProvider router={router} />);

    await waitFor(() =>
      expect(
        getByRole('heading', {
          level: 1,
        })
      ).toHaveTextContent('Hello World')
    );
  });

  it('Renders not found if invalid path', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/not-existing-route'] });

    const { getByRole } = render(<RouterProvider router={router} />);

    await waitFor(() =>
      expect(
        getByRole('heading', {
          level: 1,
        })
      ).toHaveTextContent('Not Found')
    );
  });
});

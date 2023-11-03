import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

function renderWithRouter(component, route = '/') {
  // Set the initial route to the provided value (default: '/')
  const initialEntries = [route];

  return render(
    <MemoryRouter initialEntries={initialEntries} initialIndex={0}>
      {component}
    </MemoryRouter>
  );
}

export default renderWithRouter;

import { render, screen } from '@testing-library/react';
import App from '../App';

test('should render app, navbar, and footer', () => {
  render(<App />);

  expect(screen.getByTestId("navbar")).toBeInTheDocument();
  expect(screen.getByTestId("hero-text")).toBeInTheDocument();
  expect(screen.getByTestId("footer")).toBeInTheDocument();
});

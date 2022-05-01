import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Rick and Morty Characters', () => {
  render(<App />);
  const linkElement = screen.getByText(/Rick and Morty Characters/i);
  expect(linkElement).toBeInTheDocument();
});

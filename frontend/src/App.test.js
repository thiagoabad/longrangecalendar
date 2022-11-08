import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Edit button', () => {
  render(<App />);
  const editButton = screen.getByText(/Edit/i);
  expect(editButton).toBeInTheDocument();
});

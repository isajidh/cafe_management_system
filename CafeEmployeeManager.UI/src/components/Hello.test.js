import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Hello from './Hello';

test('renders greeting message', () => {
  const { getByText } = render(<Hello name="World" />);
  const greetingElement = getByText(/Hello, World!/i);
  expect(greetingElement).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import App from './containers/App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('First test', () => {
  it("should fail", () => {
    expect(1 + 1).toBe(2);
  });
});

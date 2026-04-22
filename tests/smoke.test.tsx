import { render, screen } from '@testing-library/react';

describe('test environment', () => {
  it('renders a simple React element', () => {
    render(<div>Hello</div>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});


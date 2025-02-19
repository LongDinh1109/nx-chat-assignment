import * as React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Button from '../../components/Button';

describe('Button component', () => {
  afterEach(() => {
    cleanup();
  });
  it('renders correctly', () => {
    const { getByText } = render(
      <Button className="text-amber-200 font-bold">Click me</Button>
    );

    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('handles onClick event', () => {
    const handleClick = vi.fn();
    const { getByText } = render(<Button onClick={handleClick}>Send</Button>);
    expect(getByText('Send')).toBeInTheDocument();
    fireEvent.click(getByText('Send'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

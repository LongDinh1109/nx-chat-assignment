import * as React from 'react';
import { LoginForm } from '../../modules/AuthForm';
import { afterEach, beforeEach, describe, it, Mock, vi,expect } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useAppContext } from '../../context/AppContext';

vi.mock('../../context/AppContext', () => ({
  useAppContext: vi.fn(),
}));

describe('AuthForm', () => {
  const mockContext = {
    handleLogin: vi.fn(),
  };
  beforeEach(() => {
    (useAppContext as Mock).mockReturnValue(mockContext);
  });
  afterEach(() => {
    cleanup();
  });
  it('renders the form with the correct fields', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
  });

  it('handles login', () => {
    render(<LoginForm />);
    const usernameInput = screen.getByPlaceholderText('Username');
    const loginButton = screen.getByText('Sign in');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.click(loginButton);
    expect(mockContext.handleLogin).toHaveBeenCalledTimes(1);
  });
});

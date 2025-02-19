import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import { describe, it, vi, beforeEach, Mock, expect, afterEach } from 'vitest';
import Dashboard from '../../modules/Dashboard';
import { useAppContext } from '../../context/AppContext';

vi.mock('../../context/AppContext', () => ({
  useAppContext: vi.fn(),
}));

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('Dashboard component', () => {
  const mockContext = {
    handleLogout: vi.fn(),
    handleSelectReceiver: vi.fn(),
    handleSendMessage: vi.fn(),
    user: { id: 1, name: 'User1' },
    onlineUsers: [{ id: 2, name: 'User2' }],
    receiver: { id: 2, name: 'User2' },
    messages: [{ message: 'Hello', isSender: true, time: '10:00 AM' }],
  };

  beforeEach(() => {
    (useAppContext as Mock).mockReturnValue(mockContext);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the Dashboard component correctly', () => {
    render(<Dashboard />);
    expect(screen.getByText('Real-time Chat app')).toBeInTheDocument();
    expect(
      screen.getByText('Stay connected with instant, one-on-one messaging')
    ).toBeInTheDocument();
    expect(screen.getByText('Total Online Users:')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('Handles logout', () => {
    render(<Dashboard />);

    const logoutButton = screen.getByText('Sign out');
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);
    expect(mockContext.handleLogout).toHaveBeenCalledTimes(1);
  });

  it('Handles submit', () => {
    render(<Dashboard />);

    const messageInput = screen.getByPlaceholderText('Type your message here');
    const sendButton = screen.getByText('Send');
    expect(messageInput).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
    fireEvent.change(messageInput, { target: { value: 'Hello' } });
    fireEvent.click(sendButton);
    expect(mockContext.handleSendMessage).toHaveBeenCalledWith('Hello');
  });
});

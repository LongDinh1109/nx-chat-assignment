import * as React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import UserCard from '../../components/Card';

describe('Card', () => {
  afterEach(() => {
    cleanup();
  });
  it('renders the Card component correctly', () => {
    const { getByText } = render(
      <UserCard user={{ id: 1, username: 'User1', online: true }} className='123'/>
    );

    expect(getByText('User1')).toBeInTheDocument();
  });

    it('renders the Card with offline status', () => {
      const { getByText } = render(<UserCard user={{ id: 1, username: 'User1', online: false }} />);
      expect(getByText('User1')).toBeInTheDocument();
    });
});

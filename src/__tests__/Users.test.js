import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Users from '../components/Users';
import { fetchData } from '../services/userServices';

jest.mock('../services/userServices');

const mockData = [
  { id: 1, name: 'John Doe', date: '2025-05-01', monthlySpending: { '2025-05': 100 }, gender: 'male' },
  { id: 2, name: 'Jane Doe', date: '2025-05-01', monthlySpending: { '2025-05': 200 }, gender: 'female' },
];

beforeEach(() => {
  fetchData.mockResolvedValue(mockData);
});

test('renders Users component', async () => {
  render(<Users />);
  await waitFor(() => {
    const userCards = screen.getAllByTestId('user-card');
    expect(userCards.length).toBeGreaterThan(0);
  });
});

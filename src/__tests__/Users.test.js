import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import Users from '../components/users';
import { fetchData } from '../services/userServices';
import '@testing-library/jest-dom';

jest.mock('../services/userServices', () => ({
  fetchData: jest.fn(),
}));


describe('Users Component', () => {
  const mockData = [
    { customerId: 1, name: 'John Doe', date: '2023-01', spent: 100, gender: 'male' },
    { customerId: 2, name: 'Jane Doe', date: '2023-01', spent: 150, gender: 'female' },
  ];

  beforeEach(() => {
    fetchData.mockResolvedValue(mockData);
  });

  test('renders loading state initially', () => {
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();

  });
});

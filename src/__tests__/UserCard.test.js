import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from '../components/UserCard';
import '@testing-library/jest-dom';

const mockUser = {
  name: 'John Doe',
  date: '2025-05-01',
  monthlySpending: { '2025-05': 100, '2025-04': 150 },
  gender: 'male'
};

test('renders UserCard component', () => {
  render(<UserCard {...mockUser} />);
  const userCard = screen.getByTestId('user-card');
  expect(userCard).toBeInTheDocument();
});

test('displays user details correctly', () => {
  render(<UserCard {...mockUser} />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Total Spent in May 2025: $100')).toBeInTheDocument();
  expect(screen.getByText('Total Reward Point : 50')).toBeInTheDocument(); // Assuming RewardPoint(100) returns 10
});

test('updates spending and reward points on month change', () => {
  render(<UserCard {...mockUser} />);
  const select = screen.getByLabelText('Select Month');
  fireEvent.change(select, { target: { value: '2025-04' } });
  expect(screen.getByText('Total Spent in April 2025: $150')).toBeInTheDocument();
  expect(screen.getByText('Total Reward Point : 150')).toBeInTheDocument(); // Assuming RewardPoint(150) returns 15
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import UserCard from '../components/userCard';
import '@testing-library/jest-dom';

describe('UserCard Component', () => {
  test('renders male avatar when gender is male', () => {
    render(<UserCard name="John Doe" gender="male" />);
    const avatar = screen.getByAltText('avatar');
    expect(avatar).toHaveAttribute('src', 'avatarMale.jpg');
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('renders female avatar when gender is female', () => {
    render(<UserCard name="Jane Doe" gender="female" />);
    const avatar = screen.getByAltText('avatar');
    expect(avatar).toHaveAttribute('src', 'avatarFemale.jpg');
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  test('renders the correct name', () => {
    render(<UserCard name="Abhishek" gender="male" />);
    expect(screen.getByText('Abhishek')).toBeInTheDocument();
  });
});

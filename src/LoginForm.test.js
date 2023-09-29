import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import LoginForm from './components/LoginForm';

test('renders login form', () => {
  render(<LoginForm />);
  
  // Check if the form and its elements are rendered
  expect(screen.getByText('Login')).toBeInTheDocument();
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
});

test('validates form submission with empty fields', () => {
  render(<LoginForm />);
  const submitButton = screen.getByText('Login');
  
  // Simulate form submission without filling in fields
  fireEvent.click(submitButton);

  // Check if validation error message is displayed
  expect(screen.getByText('Both fields are required')).toBeInTheDocument();
  expect(screen.queryByText('Please enter a valid email address')).toBeNull();
  expect(screen.queryByText('Password must have at least one character')).toBeNull();
});

test('validates form submission with invalid login credentials', () => {
    render(<LoginForm />);
    const submitButton = screen.getByRole('button', { name: 'Login' });
  
    // Fill in invalid email and password
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'invalid-email' }, // Invalid email format
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '' }, // Empty password
    });
  
    // Simulate form submission
    fireEvent.click(submitButton);

    // Check if the appropriate error message is displayed
    waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
});
  
test('validates form submission with valid login credentials', () => {
  render(<LoginForm />);
  const submitButton = screen.getByText('Login');

  // Fill in valid email and password
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'eve.holt@reqres.in' },
  });
  fireEvent.change(screen.getByLabelText('Password'), {
    target: { value: 'cityslicka' },
  });

  // Simulate form submission
  fireEvent.click(submitButton);

  // Check if success message is displayed
  expect(screen.queryByText('Password must have at least one character')).toBeNull();
  expect(screen.queryByText('Both fields are required')).toBeNull();
  expect(screen.queryByText('Please enter a valid email address')).toBeNull();
});
import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState(''); 

  const isEmailValid = (email) => {
    // Email reger validation
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isFormValid = true; // Assume the form is valid by default

    // Validation checks
    if (!email && !password) {
        setError('Both fields are required');
        setStatus(''); 
        isFormValid = false;
    } else if (!email) {
        setError('Email is required');
        setStatus(''); 
        isFormValid = false;
    } else if (!isEmailValid(email)) {
        setError('Please enter a valid email address');
        setStatus(''); 
        isFormValid = false;
    } else if (password === '') {
        setError('Password is required');
        setStatus(''); 
        isFormValid = false;
    } 

    if (isFormValid) {
      // Send a POST request to REST
      try {
        const response = await fetch('https://reqres.in/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          // Handle success here
            console.log('Login successful');
            setStatus('Login successful'); 
            setError(''); // Clear the error message
        } else {
          // Handle fail here
            console.log('Login failed');
            setError('Login failed. Please check your credentials.');
            setStatus(''); 
        }
      } catch (error) {
        // Handle network errors
        console.log('An error occurred while processing your request.');
        setError('An error occurred while processing your request.');
        setStatus(''); 
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 my-8 p-6 bg-slate-100 shadow-lg rounded">
      <h2 className="text-1xl font-semibold mb-4">Login Form</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {status && <div className="text-green-500 mb-2">{status}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

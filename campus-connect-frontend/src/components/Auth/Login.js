// Import necessary modules
import React, { useState } from 'react';
import { loginUser } from '../../api';

const Login = () => {
  // State for user login data
  const [userData, setUserData] = useState({ email: '', password: '' });

  // Function to handle input changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Function to handle login
  const handleLogin = async () => {
    try {
      const response = await loginUser(userData);
      console.log(response); // Handle success
    } catch (error) {
      console.error(error.message); // Handle error
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Email input */}
      <label>Email:</label>
      <input type="email" name="email" onChange={handleChange} />

      {/* Password input */}
      <label>Password:</label>
      <input type="password" name="password" onChange={handleChange} />

      {/* Submit button */}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

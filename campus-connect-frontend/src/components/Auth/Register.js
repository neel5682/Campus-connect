// Import necessary modules
import React, { useState } from 'react';
import { registerUser } from '../../api';

const Register = () => {
  // State for user registration data
  const [userData, setUserData] = useState({ email: '', password: '' });

  // Function to handle input changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Function to handle registration
  const handleRegister = async () => {
    try {
      const response = await registerUser(userData);
      console.log(response); // Handle success
    } catch (error) {
      console.error(error.message); // Handle error
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>

        {/* Password input */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

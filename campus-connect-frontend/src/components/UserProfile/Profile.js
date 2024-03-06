// components/UserProfile/Profile.js
import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  // Assume you have a function to fetch user data from the backend
  const fetchUserData = async () => {
    // Fetch user data and set it to state
    // ...

    // Example data
    setUserData({
      username: 'JohnDoe',
      email: 'john.doe@example.com',
      // Add more fields as needed
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>User Profile</h2>
      {userData ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Username: {userData.username}</h5>
            <p className="card-text">Email: {userData.email}</p>
            {/* Add more fields as needed */}
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;

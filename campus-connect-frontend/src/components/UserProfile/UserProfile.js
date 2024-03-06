import axios from 'axios';
import React, { useState, useEffect } from 'react';
const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile');
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array ensures this effect runs only once on mount.

  return (
    <div>
      {profileData ? (
        // Render profile information
        <div>
          <h2>{profileData.name}'s Profile</h2>
          {/* Display other profile information */}
        </div>
      ) : (
        // Loading state
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default UserProfile;

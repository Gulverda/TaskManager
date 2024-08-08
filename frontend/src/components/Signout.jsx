import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signout({ token, setToken }) {
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await axios.post('http://localhost:5000/signout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToken('');
      navigate('/');
    } catch (error) {
      console.error('Signout failed', error);
    }
  };

  return (
    <div>
      <button onClick={handleSignout}>Sign Out</button>
    </div>
  );
}

export default Signout;

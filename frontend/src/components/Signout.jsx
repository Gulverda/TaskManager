import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signout({ token, setToken }) {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(response.data.msg);
      setToken('');  // Clear the token
      navigate('/login');
    } catch (error) {
      setMessage('Signout failed');
    }
  };

  return (
    <div>
      <button onClick={handleSignout}>Signout</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Signout;

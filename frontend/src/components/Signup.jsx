import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/Form.css';

function Signup({ toggleForm }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', { username, password, phoneNumber });
      setMessage(response.data.msg);
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Signup failed. Please try again.');
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSignup}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="for_grid" style={{marginTop: '38px'}}>
          <button className="sign" type="submit">Sign up</button>
          {message && <p>{message}</p>}
          <p className="signup">
            Already have an account? <button type="button" onClick={toggleForm} className="toggle-button">Sign in</button>
          </p>
        </div>
      </form>
    </>
  );
}

export default Signup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Signup from './Signup'; // Import Signup component
import '../CSS/Form.css';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSignup, setShowSignup] = useState(false); // State for toggling
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      setToken(response.data.access_token);
      navigate('/profile'); // Redirect to profile page on successful login
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleToggle = () => {
    setShowSignup(!showSignup);
  };

  return (
    <div className="form-container">
      <p className="title">{showSignup ? 'Sign Up' : 'Login'}</p>
      {showSignup ? (
        <Signup toggleForm={handleToggle} />
      ) : (
        <form className="form" onSubmit={handleLogin}>
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
            <div className="forgot">
              <button type="button" onClick={() => alert('Forgot Password Clicked!')} className="forgot-button">
                Forgot Password?
              </button>
            </div>
          </div>
          <div className="for_grid">
            <button className="sign" type="submit">Sign in</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p className="signup">
              Don't have an account? <button type="button" onClick={handleToggle} className="toggle-button">Sign up</button>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

export default Login;

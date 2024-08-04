import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Signout from './components/Signout';

function App() {
  const [token, setToken] = useState('');

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/signout" element={<Signout token={token} setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Signout from './components/Signout';
import AddTask from './components/AddTask';

function App() {
  const [token, setToken] = useState('');

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signout" element={<Signout token={token} setToken={setToken} />} />
        {token && <Route path="/addtask" element={<AddTask token={token} />} />}
        {/* Redirect to /login if no token */}
        {!token && <Route path="/" element={<Login setToken={setToken} />} />}
      </Routes>
    </div>
  );
}

export default App;

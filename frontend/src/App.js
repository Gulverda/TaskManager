import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Signout from './components/Signout';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList'; // Import TaskList component

function App() {
  const [token, setToken] = useState('');
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  const handleAddTaskClick = () => {
    navigate('/addtask');
  };

  return (
    <div>
      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={
            token ? (
              <div>
                <button onClick={handleAddTaskClick}>Add Task</button>
                <TaskList token={token} /> {/* TaskList shown */}
                <Signout token={token} setToken={setToken} />
              </div>
            ) : (
              <div>
                <button onClick={handleToggle}>
                  {showLogin ? 'Sign Up' : 'Sign In'}
                </button>
                {showLogin ? (
                  <Login setToken={setToken} />
                ) : (
                  <Signup />
                )}
              </div>
            )
          }
        />

        {/* Sign out route */}
        <Route
          path="/signout"
          element={<Signout token={token} setToken={setToken} />}
        />

        {/* Add task route */}
        <Route
          path="/addtask"
          element={
            token ? (
              <AddTask token={token} />
            ) : (
              <Login setToken={setToken} />
            )
          }
        />

        {/* Profile route */}
        <Route
          path="/profile"
          element={
            token ? (
              <div>
                <button onClick={handleAddTaskClick}>Add Task</button>
                <TaskList token={token} /> {/* TaskList shown */}
                <Signout token={token} setToken={setToken} />
              </div>
            ) : (
              <Login setToken={setToken} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;

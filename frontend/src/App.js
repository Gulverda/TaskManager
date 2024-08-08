import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
// import Signup from './components/Signup';
import Login from './components/Login';
import Signout from './components/Signout';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

function App() {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

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
                <button className="button" onClick={handleAddTaskClick}>Add Task</button>
                <TaskList token={token} />
                <Signout token={token} setToken={setToken} />
              </div>
            ) : (
              <Login setToken={setToken} />
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
                <button className="button" onClick={handleAddTaskClick}>Add Task</button>
                <TaskList token={token} />
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

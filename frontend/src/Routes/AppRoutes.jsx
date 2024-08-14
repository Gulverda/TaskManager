import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import Signout from '../components/Signout';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';

function AppRoutes() {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleAddTaskClick = () => {
    navigate('/addtask');
  };

  return (
    <div>
      <Routes>
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

        <Route
          path="/signout"
          element={<Signout token={token} setToken={setToken} />}
        />

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

        <Route
          path="/profile"
          element={
            token ? (
              <div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                <button className="button" onClick={handleAddTaskClick}>Add Task</button>
                <Signout token={token} setToken={setToken} />
                </div>
                <TaskList token={token} />
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

export default AppRoutes; // Renamed export

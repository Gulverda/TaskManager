import React from 'react';
import AppRoutes from './Routes/AppRoutes'; // Renamed to 'AppRoutes'
import './App.css';
import './CSS/Button.css';

function App() {
  return (
    <>
      <div className="relative">
        <h1 className="absolute">Task Manager</h1>
      </div>
      <AppRoutes />
    </>
  );
}

export default App;

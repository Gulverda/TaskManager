import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/AddTask.css';

function AddTask({ token }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    try {
      const response = await axios.post('http://localhost:5000/tasks', 
        { title, description }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.msg);
      setTitle('');
      setDescription('');
    } catch (error) {
      setMessage('Failed to add task.');
      if (error.response && error.response.data) {
        setMessage(error.response.data.msg);
      }
    }
  };

  const handleGoToProfile = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      {message && <p>{message}</p>}
      <button onClick={handleGoToProfile}>Go to Profile</button>
    </div>
  );
}

export default AddTask;

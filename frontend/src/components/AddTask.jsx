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
    <div className="add-task-container">
      <h2 className="add-task-title">Add Task</h2>
      <form className="add-task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          className="add-task-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="add-task-textarea"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="add-task-button">Add Task</button>
        {error && <p className="add-task-error">{error}</p>}
      </form>
      {message && <p className="add-task-message">{message}</p>}
      <button onClick={handleGoToProfile} className="add-task-profile-button">Go to Profile</button>
    </div>
  );
}

export default AddTask;

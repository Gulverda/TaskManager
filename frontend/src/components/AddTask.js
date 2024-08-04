import React, { useState } from 'react';
import axios from 'axios';

function AddTask({ token }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/tasks', 
        { title, description }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.msg);
    } catch (error) {
      setMessage(error.response.data.msg);
    }
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
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddTask;

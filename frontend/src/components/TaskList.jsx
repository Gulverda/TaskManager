import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function TaskList({ token }) {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      setMessage('Failed to fetch tasks.');
      if (error.response && error.response.data) {
        setMessage(error.response.data.msg);
      }
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
      setMessage('Task deleted successfully.');
    } catch (error) {
      setMessage('Failed to delete task.');
      if (error.response && error.response.data) {
        setMessage(error.response.data.msg);
      }
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleUpdate = async () => {
    if (!title.trim() || !description.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    try {
      await axios.put(`http://localhost:5000/tasks/${editingTask._id}`, 
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((task) =>
        task._id === editingTask._id ? { ...task, title, description } : task
      ));
      setEditingTask(null);
      setTitle('');
      setDescription('');
      setMessage('Task updated successfully.');
    } catch (error) {
      setMessage('Failed to update task.');
      if (error.response && error.response.data) {
        setMessage(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      {message && <p>{message}</p>}
      {tasks.map((task) => (
        <div key={task._id} style={{ marginBottom: '20px' }}>
          {editingTask && editingTask._id === task._id ? (
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => setEditingTask(null)}>Cancel</button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          ) : (
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;

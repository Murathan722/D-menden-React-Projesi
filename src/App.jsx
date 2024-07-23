import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleEditTask = (index) => {
    setIsEditing(true);
    setTask(tasks[index]);
    setCurrentTaskIndex(index);
  };

  const handleSaveTask = () => {
    const updatedTasks = tasks.map((t, index) => 
      index === currentTaskIndex ? task : t
    );
    setTasks(updatedTasks);
    setTask("");
    setIsEditing(false);
    setCurrentTaskIndex(null);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={task}
        onChange={handleInputChange}
        placeholder="Yeni bir görev ekle"
      />
      {isEditing ? (
        <button onClick={handleSaveTask}>Kaydet</button>
      ) : (
        <button onClick={handleAddTask}>Ekle</button>
      )}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => handleEditTask(index)}>Düzenle</button>
            <button onClick={() => handleDeleteTask(index)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

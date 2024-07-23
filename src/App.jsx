import "./App.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  loadTasks,
  addTask,
  deleteTask,
  startEditing,
  saveTask,
  updateCurrentTask,
} from "./redux/tasksSlice";

function App() {
  const { tasks, currentTask, isEditing } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      dispatch(loadTasks(storedTasks));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    dispatch(updateCurrentTask(e.target.value));
  };

  const handleAddTask = () => {
    if (currentTask.trim() !== "") {
      dispatch(addTask(currentTask));
    }
  };

  const handleSaveTask = () => {
    dispatch(saveTask());
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={currentTask}
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
            <button onClick={() => dispatch(startEditing(index))}>
              Düzenle
            </button>
            <button onClick={() => dispatch(deleteTask(index))}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

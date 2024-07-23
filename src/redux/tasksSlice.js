import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  currentTask: "",
  isEditing: false,
  currentTaskIndex: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    loadTasks(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action) {
      state.tasks.push(action.payload);
      state.currentTask = "";
    },
    deleteTask(state, action) {
      state.tasks.splice(action.payload, 1);
    },
    startEditing(state, action) {
      state.isEditing = true;
      state.currentTask = state.tasks[action.payload];
      state.currentTaskIndex = action.payload;
    },
    saveTask(state) {
      state.tasks[state.currentTaskIndex] = state.currentTask;
      state.currentTask = "";
      state.isEditing = false;
      state.currentTaskIndex = null;
    },
    updateCurrentTask(state, action) {
      state.currentTask = action.payload;
    },
  },
});

export const {
  loadTasks,
  addTask,
  deleteTask,
  startEditing,
  saveTask,
  updateCurrentTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;

import { TaskModel } from "../models/TaskModel";
import { stateModel } from "../models/Models";
import { createSlice } from "@reduxjs/toolkit";

const initState: stateModel = { tasksMap: {}, allTodos: [], open: [], done: [], deleted: [] };

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initState,
  reducers: {
    setTasks: (state, action) => {
      const newData = action.payload.reduce((r: stateModel, t: TaskModel) => {
        if (t.isBlacklist == true) return { ...r, deleted: [...r.deleted, t] };
        const completedState = t.isCompleted ? "done" : "open";
        return {
          ...r,
          [completedState]: [...r[completedState], t],
          allTodos: [...r.allTodos, t],
          tasksMap: { ...r.tasksMap, [t.id!]: t },
        };
      }, initState);

      state.tasksMap = newData.tasksMap;
      state.allTodos = newData.allTodos;
      state.open = newData.open;
      state.done = newData.done;
      state.deleted = newData.deleted;
    },
  },
});

export const { setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;

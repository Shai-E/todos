import axios from "axios";
import { AppDispatch } from "..";
import { TaskModel } from "../models/TaskModel";
import { setTasks } from "./tasksSlice";
const path = "http://localhost:8081/";

export const getTodos = () => async (dispatch: AppDispatch) => {
  const { data } = await axios.get<TaskModel[]>(`${path}api/todos`);
  dispatch(setTasks(data));
};

export const deleteAllFinishedTasks = () => async (dispatch: AppDispatch) => {
  const { data } = await axios.delete<TaskModel[]>(`${path}api/todos/delete-by-completed-state/1`);
  dispatch(setTasks(data));
};
export const deleteAllUnfinishedTasks = () => async (dispatch: AppDispatch) => {
  const { data } = await axios.delete<TaskModel[]>(`${path}api/todos/delete-by-completed-state/0`);
  dispatch(setTasks(data));
};
export const deleteAllTasks = () => async (dispatch: AppDispatch) => {
  const { data } = await axios.delete<TaskModel[]>(`${path}api/todos/delete-all-tasks`);
  dispatch(setTasks(data));
};
export const moveAllFinisheTasksToRecycleBin = () => async (dispatch: AppDispatch) => {
  const { data } = await axios.patch<TaskModel[]>(`${path}api/todos/update-blacklist`, { isBlacklist: 1 });
  dispatch(setTasks(data));
};

export const updateTask =
  ({ taskId, formData }: { taskId: string; formData: TaskModel }) =>
  async (dispatch: AppDispatch) => {
    const { data } = await axios.patch<TaskModel[]>(`${path}api/todos/${taskId}`, formData);
    dispatch(setTasks(data));
  };

export const addTask = (formData: TaskModel) => async (dispatch: AppDispatch) => {
  const { data } = await axios.post<TaskModel[]>(`${path}api/todos`, formData);
  dispatch(setTasks(data));
};

export const setCompletedState =
  ({ taskId, isCompleted }: { taskId: string | number; isCompleted: boolean }) =>
  async (dispatch: AppDispatch) => {
    const { data } = await axios.patch<TaskModel[]>(`${path}api/todos/set-completed-state/${taskId}`, {
      isCompleted,
    });
    dispatch(setTasks(data));
  };

export const addToTrash = (taskId: string) => async (dispatch: AppDispatch) => {
  const { data } = await axios.patch<TaskModel[]>(`${path}api/todos/update-blacklist/${taskId}`, {
    isBlacklist: 1,
  });
  dispatch(setTasks(data));
};

export const removeForever = (taskId: string) => async (dispatch: AppDispatch) => {
  const { data } = await axios.delete<TaskModel[]>(`${path}api/todos/${taskId}`);
  dispatch(setTasks(data));
};

export const restoreTask = (taskId: string) => async (dispatch: AppDispatch) => {
  const { data } = await axios.patch<TaskModel[]>(`${path}api/todos/update-blacklist/${taskId}`, {
    isBlacklist: 0,
  });
  dispatch(setTasks(data));
};

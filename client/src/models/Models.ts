import { TaskModel } from "./TaskModel";
export interface TaskModelDic {
  [key: string]: TaskModel;
}

export type stateModel = {
  tasksMap: TaskModelDic;
  allTodos: TaskModel[];
  open: TaskModel[];
  done: TaskModel[];
  deleted: TaskModel[];
};

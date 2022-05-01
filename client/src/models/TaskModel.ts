export interface TaskModel {
  id?: number;
  title: string;
  task: string;
  date: Date;
  isCompleted?: boolean;
  color?: string;
  isBlacklist?: boolean;
}

export default class Task implements TaskModel {
  public isCompleted: boolean;
  constructor(public title: string, public task: string, public date: Date, public id?: number) {
    this.isCompleted = false;
  }
}

import moment from "moment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { TaskModel } from "../models/TaskModel";
import { addToTrash, removeForever, restoreTask, setCompletedState } from "../redux/taskActions";

function Task({ task, mode }: { task: TaskModel; mode?: string }) {
  const dispatch = useDispatch();

  const isColorLight = (color: string) => {
    const hex = color.replace("#", "");
    const c_r = parseInt(hex.substring(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 4), 16);
    const c_b = parseInt(hex.substr(4, 6), 16);
    const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
    return brightness > 155;
  };

  const formatTransparency = (color: string) => {
    return color + "42";
  };

  const setHoverBackground = (color?: string) => {
    const element = document.querySelector(`#task${task.id}`) as HTMLElement;
    color && element?.style.setProperty("--color", color + "80");
  };

  const setLightText = () => {
    (document.querySelector(`#task${task.id}`) as HTMLElement)?.style.setProperty("--text-color", "#fff");
  };

  useEffect(() => {
    if (task.color) {
      setHoverBackground(task.color);
      !isColorLight(task.color) && setLightText();
    }
  }, [task.color]);

  const history = useHistory();
  const navigateToTask = (taskId: number) => {
    history.push(`/edit-task/${taskId}`);
  };
  const onDeleteTask = () => {
    dispatch(mode === "DELETED" ? removeForever(task.id!.toString()) : addToTrash(task.id!.toString()));
  };
  const onRestoreTask = () => dispatch(restoreTask(task.id!.toString()));
  const onNavigate = () => navigateToTask(task.id!);
  const onSetCompletedState = () => dispatch(setCompletedState({ taskId: task.id!, isCompleted: !task.isCompleted }));

  return (
    <div
      className="Task"
      style={task.color ? { backgroundColor: formatTransparency(task.color) } : {}}
      id={`task${task.id}`}
    >
      <div className="task-opts">
        <div className="toggle-completed-container">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={onSetCompletedState}
            className="toggle-completed"
          />
        </div>
        <div className="task-info">
          <span className="task-title">{task.title}</span>
          <div>
            <span className="task-date"> {moment(task.date).format("DD-MM-YYYY")}</span>
            <span className="task-time"> {moment(task.date).format("HH:mm")}</span>
          </div>
        </div>
      </div>
      <div className="task-content">
        <span>{task.task}</span>
        <div>
          {mode === "DELETED" ? (
            <button className="restore-btn" title="Restore Task" onClick={onRestoreTask}>
              &larr;
            </button>
          ) : (
            <button className="restore-btn" title="Edit Task" onClick={onNavigate}>
              &#9998;
            </button>
          )}
          <button className="del-btn" title="Delete Task" onClick={onDeleteTask}>
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task;

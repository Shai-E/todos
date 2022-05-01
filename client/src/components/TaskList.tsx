import { MouseEventHandler, useEffect } from "react";
import { TaskModel } from "../models/TaskModel";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import TaskForm from "./TaskForm";
import { stateModel } from "../models/Models";
import {
  deleteAllFinishedTasks,
  deleteAllTasks,
  deleteAllUnfinishedTasks,
  getTodos,
  moveAllFinisheTasksToRecycleBin,
} from "../redux/taskActions";

function TaskList() {
  const allTodos: TaskModel[] = useSelector((state: { tasks: stateModel }) => state.tasks.allTodos);
  const done: TaskModel[] = useSelector((state: { tasks: stateModel }) => state.tasks.done);
  const open: TaskModel[] = useSelector((state: { tasks: stateModel }) => state.tasks.open);
  const deleted: TaskModel[] = useSelector((state: { tasks: stateModel }) => state.tasks.deleted);

  const [displayOptions, setDisplayOptions] = useState("ALL");
  const displayRecycle = deleted.length > 0;
  const [addTask, setAddTask] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  });

  useEffect(() => {
    allTodos.length === 0 && deleted.length === 0 && setDisplayOptions("ALL");
    !displayRecycle && displayOptions === "DELETED" && setDisplayOptions("ALL");
  }, [allTodos, deleted, done, displayOptions, displayRecycle]);

  const displayTodos = (displayOptions: string) => {
    const todosArr: TaskModel[] =
      displayOptions === "ALL"
        ? allTodos
        : displayOptions === "DONE"
        ? done
        : displayOptions === "OPEN"
        ? open
        : displayOptions === "DELETED"
        ? deleted
        : [];

    if (todosArr.length === 0 && deleted.length !== 0) return <div className={"no-content-display"}>No Todos.</div>;
    if (!todosArr) return null;

    return todosArr.map((t: TaskModel, i: number) => {
      return <Task task={t} key={i} mode={t.isBlacklist ? "DELETED" : "TODO"} />;
    });
  };

  const taskNavButtons = [
    {
      className: displayOptions === "ALL" ? "btn active-btn" : "btn",
      onClick: () => {
        setDisplayOptions("ALL");
      },
      title: `ALL ${allTodos.length > 0 ? "(" + allTodos.length + ")" : ""}`,
    },
    {
      className: displayOptions === "OPEN" ? "btn active-btn" : "btn",
      onClick: () => {
        setDisplayOptions("OPEN");
      },

      title: `TODO ${open.length > 0 ? "(" + open.length + ")" : ""}`,
    },
    {
      className: displayOptions === "DONE" ? "btn active-btn" : "btn",
      onClick: () => {
        setDisplayOptions("DONE");
      },
      title: `DONE ${done.length > 0 ? "(" + done.length + ")" : ""}`,
    },
    {
      className: displayOptions === "DELETED" ? "btn active-btn" : displayRecycle ? "btn" : "save-space-btn",
      onClick: () => {
        displayRecycle && setDisplayOptions("DELETED");
      },
      title: `♲`,
    },
  ];

  const subNavButtons = [
    {
      className: "btn",
      onClick: () => {
        dispatch(deleteAllFinishedTasks());
      },
      title: `Delete Finished Tasks`,
    },
    {
      className: "btn",
      onClick: () => {
        dispatch(deleteAllUnfinishedTasks());
      },
      title: `Delete Unfinished Tasks`,
    },
    {
      className: "btn",
      onClick: () => {
        dispatch(deleteAllTasks());
      },
      title: `Delete All Tasks`,
    },
  ];

  const createButtons = (
    btn: { onClick: MouseEventHandler<HTMLButtonElement>; title: string; className: string },
    idx: number
  ) => (
    <button key={idx} onClick={btn.onClick} className={btn.className}>
      {btn.title}
    </button>
  );

  const dialogText =
    allTodos.length === 0
      ? addTask
        ? "Dismiss Dialog"
        : "Create Your First Task!"
      : addTask
      ? "Dismiss Dialog"
      : "Click to Add Task";

  const toggleAddTaskState = () => {
    setAddTask(!addTask);
  };

  return (
    <div className="Main">
      <button className="btn add-btn" onClick={toggleAddTaskState}>
        {dialogText}
      </button>
      {addTask && <TaskForm roundedBorder={allTodos.length === 0 && deleted.length === 0} />}
      {(allTodos.length > 0 || deleted.length > 0) && (
        <div>
          <div className="btns main-filter-bar-btns">
            <div className={"save-space"}>Tick</div>
            {taskNavButtons.map(createButtons)}
          </div>
          {displayOptions === "DONE" && done.length > 0 && (
            <div className="btns">
              <button
                className="btn"
                onClick={() => {
                  dispatch(moveAllFinisheTasksToRecycleBin());
                }}
              >
                Move All to Trash
              </button>
            </div>
          )}
          {displayOptions === "DELETED" && <div className="btns">{subNavButtons.map(createButtons)}</div>}
        </div>
      )}
      <div className="todos">{displayTodos(displayOptions)}</div>
    </div>
  );
}

export default TaskList;

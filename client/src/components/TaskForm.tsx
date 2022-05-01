import moment from "moment";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { stateModel } from "../models/Models";
import { TaskModel } from "../models/TaskModel";
import { addTask, updateTask } from "../redux/taskActions";

function TaskForm({ roundedBorder, editMode }: { roundedBorder?: boolean; editMode?: boolean }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const { taskId }: { taskId: string } = useParams();
  const dispatch = useDispatch();

  const taskToEdit: TaskModel | null = useSelector((state: { tasks: stateModel }) => state.tasks.tasksMap[taskId]);
  const initDate = new Date(taskToEdit?.date).getTime() || Date.now();
  const [dateState, setDateState] = useState(moment(initDate).format("YYYY-MM-DDTHH:mm"));

  const myBtn = useRef<HTMLButtonElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submit = async (formData: TaskModel) => {
    myBtn.current?.classList.add("loading");

    if (!displayColorPicker) delete formData.color;

    editMode && taskId ? await dispatch(updateTask({ taskId, formData })) : await dispatch(addTask(formData));

    setTimeout(() => {
      myBtn.current?.classList.remove("loading");
    }, 300);
  };

  return (
    <div className="AddTask">
      <form onSubmit={handleSubmit(submit)} className={roundedBorder ? "add-task-form bottom" : "add-task-form"}>
        <input
          type="datetime-local"
          placeholder="date"
          {...register("date", { required: "Date is required" })}
          value={dateState}
          onChange={(e) => setDateState(e.currentTarget.value)}
        />
        {errors.date && errors.date.message}
        <input
          type="text"
          placeholder="title"
          {...register("title", { required: false })}
          defaultValue={editMode ? taskToEdit?.title : undefined}
        />
        <textarea
          placeholder="task"
          defaultValue={editMode ? taskToEdit?.task : undefined}
          {...register("task", {
            required: "Task is required",
            maxLength: { value: 250, message: "Task must have up to 250 characters." },
          })}
          maxLength={250}
        ></textarea>
        {errors.task && errors.task.message}
        <div className="form-color-input-container">
          <button
            className="btn"
            type="button"
            onClick={() => {
              setDisplayColorPicker(!displayColorPicker);
            }}
          >
            {displayColorPicker
              ? "Go back to default colors"
              : "Click to choose a unique background color for your task"}
          </button>
          {displayColorPicker && <input className="color-input" type="color" {...register("color")} />}
        </div>
        <button className="btn submit-btn activityIndicator" ref={myBtn} disabled={errors.task || errors.date}>
          {editMode ? "Edit Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;

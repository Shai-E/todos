import { useHistory } from "react-router";
import TaskForm from "./TaskForm";

function EditTask() {
  const history = useHistory();
  return (
    <div className="Main">
      <button
        className="btn add-btn"
        onClick={() => {
          history.push("/home");
        }}
      >
        Go Back to Tasks
      </button>
      <TaskForm editMode />
    </div>
  );
}

export default EditTask;

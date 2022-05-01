const router = require('express').Router();
const {getAllTasks, getTaskById, createNewTask, editTask, setCompletedState, deleteTask,removeAllRecycledTasks, removeTasksByCompletedState, updateBlacklistByTaskId, updateBlacklistByCompletedState} = require('../logic/todos')

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createNewTask);
router.patch("/set-completed-state/:id", setCompletedState);
router.delete("/delete-by-completed-state/:isCompleted", removeTasksByCompletedState);
router.delete("/delete-all-tasks", removeAllRecycledTasks);
router.patch("/update-blacklist", updateBlacklistByCompletedState);
router.patch("/update-blacklist/:id", updateBlacklistByTaskId);
router.patch("/:id", editTask);
router.delete("/:id", deleteTask);

module.exports = router;
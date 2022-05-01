const { execute } = require("../dal");

const getTasks = async () => {
  return await execute(
    `SELECT id, title, task, date, color, is_completed as isCompleted, is_blacklist as isBlacklist FROM todos ORDER BY (date) ASC`
  );
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getTaskById = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await execute(`SELECT * FROM todos WHERE id = ?`, [id]);
    res.json(task);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getTasksBySearchValue = async (req, res) => {
  const seachKey = `%${req.params.seachKey}%`;
  try {
    const tasks = await execute(`SELECT * FROM todos WHERE task LIKE ?`, [seachKey]);
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

const createNewTask = async (req, res) => {
  const { title, task, date, color } = req.body;
  const params = [task];
  let sql = `INSERT INTO todos(task`;
  if (title) {
    sql += `, title`;
    params.push(title);
  }
  if (color) {
    sql += `, color`;
    params.push(color);
  }
  if (date) {
    sql += `, date`;
    params.push(date);
  }
  sql += `) VALUES(?`;
  if (title) sql += `,?`;
  if (date) sql += `,?`;
  if (color) sql += `,?`;
  sql += `)`;
  try {
    await execute(sql, params);
    const tasks = await getTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

const editTask = async (req, res) => {
  const id = req.params.id;
  const { title, task, date, color } = req.body;
  let sql = `UPDATE todos SET `;
  const params = [];
  if (title) {
    sql += `title = ?,`;
    params.push(title);
  }
  if (task) {
    sql += `task = ?,`;
    params.push(task);
  }
  if (date) {
    sql += `date = ?,`;
    params.push(date);
  }
  if (color) {
    sql += `color = ?,`;
    params.push(color);
  }
  sql = sql.substring(0, sql.length - 1);
  sql += ` WHERE id = ?`;
  params.push(id);
  try {
    await execute(sql, params);
    const tasks = await getTasks();
    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const setCompletedState = async (req, res) => {
  const id = req.params.id;
  const isCompleted = req.body.isCompleted;
  try {
    await execute("UPDATE todos SET is_completed = ? WHERE id = ?", [isCompleted, id]);
    const tasks = await getTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateBlacklistByTaskId = async (req, res) => {
  const id = req.params.id;
  const isBlacklist = req.body.isBlacklist;
  try {
    await execute(`UPDATE todos SET is_blacklist = ? WHERE id = ?`, [isBlacklist, id]);
    const tasks = await getTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  try {
    await execute(`DELETE FROM todos WHERE id = ?`, [id]);
    const tasks = await getTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateBlacklistByCompletedState = async (req, res) => {
  const isBlacklist = req.body.isBlacklist;
  try {
    await execute(`UPDATE todos SET is_blacklist = ? WHERE is_completed = 1`, [isBlacklist]);
    const tasks = await getTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

const removeTasksByCompletedState = async (req, res) => {
  const isCompleted = req.params.isCompleted;
  try {
    await execute(`DELETE FROM todos WHERE is_blacklist = 1 AND is_completed = ?`, [isCompleted]);
    const tasks = await getTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

const removeAllRecycledTasks = async (req, res) => {
  try {
    await execute(`DELETE FROM todos WHERE is_blacklist = 1`);
    const tasks = await getTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createNewTask,
  editTask,
  setCompletedState,
  deleteTask,
  removeTasksByCompletedState,
  updateBlacklistByTaskId,
  updateBlacklistByCompletedState,
  removeAllRecycledTasks,
};

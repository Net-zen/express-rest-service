const {
  getAllTasksByBoard,
  getTaskById,
  createTask,
  updateTaskInBoard,
  removeTask
} = require('../../common/inMemoryDb');

const getAll = async boardId => {
  const tasks = await getAllTasksByBoard(boardId);

  if (!tasks[0]) {
    throw new Error(`Tasks with boardId: ${boardId} was not found`);
  }
  return tasks;
};

const getById = async id => {
  const task = await getTaskById(id);

  if (!task[0]) {
    throw new Error(`Task with id: ${id} was not found`);
  } else if (task.length > 1) {
    throw new Error('Database is corrupted!');
  }
  return task[0];
};

const create = async task => {
  const newTask = await createTask(task);
  return newTask[0];
};

const update = async (boardId, id, task) => {
  await updateTaskInBoard(boardId, id, task);
  return await getById(id);
};

const remove = async (boardId, id) => {
  const task = await removeTask(boardId, id);
  if (!task[0]) {
    throw new Error(
      `Task with id: ${id} in board id: ${boardId} was not found`
    );
  }
  return task[0];
};

module.exports = { getAll, getById, create, update, remove };

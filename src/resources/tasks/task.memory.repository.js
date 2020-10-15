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
  if (!task) {
    throw new Error(`Task with id: ${id} was not found`);
  }
  return task;
};

const create = task => createTask(task);

const update = async (boardId, id, task) => {
  const updatedTask = await updateTaskInBoard(boardId, id, task);
  if (!updatedTask) {
    throw new Error(
      `Task with id: ${id} in board id: ${boardId} was not found`
    );
  }
  return updatedTask;
};

const remove = async (boardId, id) => {
  const task = await removeTask(boardId, id);
  if (!task) {
    throw new Error(
      `Task with id: ${id} in board id: ${boardId} was not found`
    );
  }
  return true;
};

module.exports = { getAll, getById, create, update, remove };

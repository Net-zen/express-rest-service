const Task = require('./task.model');
const { NOT_FOUND } = require('../../common/errorHandler');

const getAll = async boardId => {
  const tasks = await Task.find({ boardId });

  if (!tasks[0]) {
    throw new NOT_FOUND(`Tasks with boardId: ${boardId} was not found`);
  }
  return tasks;
};

const getById = async id => {
  const task = await Task.findById(id);
  if (!task) {
    throw new NOT_FOUND(`Task with id: ${id} was not found`);
  }
  return task;
};

const create = task => Task.create(task);

const update = async (boardId, id, task) => {
  const updatedTask = await Task.findOneAndUpdate({ boardId, _id: id }, task, {
    new: true
  });
  if (!updatedTask) {
    throw new NOT_FOUND(
      `Task with id: ${id} in board id: ${boardId} was not found`
    );
  }
  return updatedTask;
};

const remove = async (boardId, id) => {
  const task = await Task.findOneAndDelete({ boardId, _id: id });
  if (!task) {
    throw new NOT_FOUND(
      `Task with id: ${id} in board id: ${boardId} was not found`
    );
  }
  return true;
};

module.exports = { getAll, getById, create, update, remove };

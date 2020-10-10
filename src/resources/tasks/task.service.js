const taskRepo = require('./task.memory.repository');

const getAll = async boardId => await taskRepo.getAll(boardId);

const getById = async id => await taskRepo.getById(id);

const create = async task => await taskRepo.create(task);

const update = async (boardId, id, task) =>
  await taskRepo.update(boardId, id, task);

const remove = async (boardId, id) => await taskRepo.remove(boardId, id);

module.exports = { getAll, getById, create, update, remove };

const taskRepo = require('./task.memory.repository');

const getAll = async boardId => await taskRepo.getAll(boardId);

const getById = async id => await taskRepo.getById(id);

const create = async task => await taskRepo.create(task);

const put = async (boardId, id, task) => await taskRepo.put(boardId, id, task);

const del = async (boardId, id) => await taskRepo.del(boardId, id);

module.exports = { getAll, getById, create, put, del };

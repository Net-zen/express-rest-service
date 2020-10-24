const taskRepo = require('./task.db.repository');

const getAll = boardId => taskRepo.getAll(boardId);

const getById = id => taskRepo.getById(id);

const create = task => taskRepo.create(task);

const update = (boardId, id, task) => taskRepo.update(boardId, id, task);

const remove = (boardId, id) => taskRepo.remove(boardId, id);

module.exports = { getAll, getById, create, update, remove };

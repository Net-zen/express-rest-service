const boardRepo = require('./board.memory.repository');

const getAll = async () => await boardRepo.getAll();

const getById = async id => await boardRepo.getById(id);

const create = async board => await boardRepo.create(board);

const update = async (id, board) => await boardRepo.update(id, board);

const del = async id => await boardRepo.del(id);

module.exports = { getAll, getById, create, update, del };

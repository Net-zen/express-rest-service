const boardRepo = require('./board.db.repository');

const getAll = () => boardRepo.getAll();

const getById = id => boardRepo.getById(id);

const create = board => boardRepo.create(board);

const update = (id, board) => boardRepo.update(id, board);

const remove = id => boardRepo.remove(id);

module.exports = { getAll, getById, create, update, remove };

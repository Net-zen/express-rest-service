const boardRepo = require('./board.db.repository');
const taskdRepo = require('../tasks/task.db.repository');

const getAll = () => boardRepo.getAll();

const getById = id => boardRepo.getById(id);

const create = board => boardRepo.create(board);

const update = (id, board) => boardRepo.update(id, board);

const remove = async id => {
  await taskdRepo.removeTasksOfBoard(id);
  return boardRepo.remove(id);
};

module.exports = { getAll, getById, create, update, remove };

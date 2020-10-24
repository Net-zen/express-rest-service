const { NOT_FOUND } = require('../../common/errorHandler');
const Board = require('./board.model');
const Task = require('../tasks/task.model');

const getAll = () => Board.find({});

const getById = async id => {
  const board = await Board.findById(id);
  if (!board) {
    throw new NOT_FOUND(`Board with id: ${id} was not found`);
  }
  return board;
};

const create = board => Board.create(board);

const update = async (id, board) => {
  const updatedBoard = await Board.findByIdAndUpdate(id, board, { new: true });
  if (!updatedBoard) {
    throw new NOT_FOUND(`Board with id: ${id} was not found`);
  }
  return updatedBoard;
};

const remove = async id => {
  const board = await Board.findByIdAndDelete(id);
  if (!board) {
    throw new NOT_FOUND(`Board with id: ${id} was not found`);
  }
  await Task.deleteMany({ boardId: id });
  return board;
};

module.exports = { getAll, getById, create, update, remove };

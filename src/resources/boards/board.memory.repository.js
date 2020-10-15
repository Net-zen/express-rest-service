const {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  removeBoard
} = require('../../common/inMemoryDb');

const getAll = () => getAllBoards();

const getById = async id => {
  const board = await getBoardById(id);
  if (!board) {
    throw new Error(`Board with id: ${id} was not found`);
  }
  return board;
};

const create = board => createBoard(board);

const update = async (id, board) => {
  const updatedBoard = await updateBoard(id, board);
  if (!updatedBoard) {
    throw new Error(`Board with id: ${id} was not found`);
  }
  return updatedBoard;
};

const remove = async id => {
  const board = await removeBoard(id);
  if (!board) {
    throw new Error(`Board with id: ${id} was not found`);
  }
  return board;
};

module.exports = { getAll, getById, create, update, remove };

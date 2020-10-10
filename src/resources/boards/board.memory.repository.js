const {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
} = require('../../common/inMemoryDb');

const getAll = async () => await getAllBoards();

const getById = async id => {
  const board = await getBoardById(id);

  if (!board[0]) {
    throw new Error(`Task with id: ${id} was not found`);
  } else if (board.length > 1) {
    throw new Error('Database is corrupted!');
  }
  return board[0];
};

const create = async board => {
  const newBoard = await createBoard(board);
  return newBoard[0];
};

const update = async (id, board) => {
  await updateBoard(id, board);
  return await getById(id);
};

const del = async id => {
  const board = await deleteBoard(id);
  if (!board[0]) {
    throw new Error(`Board with id: ${id} was not found`);
  }
  return board[0];
};

module.exports = { getAll, getById, create, update, del };

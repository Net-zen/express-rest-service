const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const DB = {
  users: [],
  boards: []
};

DB.users.push(new User(), new User(), new User());
DB.boards.push(new Board(), new Board(), new Board());

const getAllUsers = async () => JSON.parse(JSON.stringify(DB.users));

const getUserById = async id => DB.users.filter(user => user.id === id);

const createUser = async user => {
  DB.users.push(user);
  return await getUserById(user.id);
};

const putUser = async (id, user) => {
  const idx = DB.users.findIndex(el => el.id === id);
  if (idx <= -1) {
    throw new Error(`User with id: ${id} was not found`);
  } else {
    DB.users[idx].name = user.name;
    DB.users[idx].login = user.login;
    DB.users[idx].password = user.password;
  }
};

const deleteUser = async id => {
  const idx = DB.users.findIndex(el => el.id === id);
  if (idx <= -1) {
    throw new Error(`User with id: ${id} was not found`);
  } else {
    return DB.users.splice(idx, 1);
  }
};

const getAllBoards = async () => JSON.parse(JSON.stringify(DB.boards));

const getBoardById = async id => DB.boards.filter(board => board.id === id);

const createBoard = async board => {
  DB.boards.push(board);
  return await getBoardById(board.id);
};

const putBoard = async (id, board) => {
  const idx = DB.boards.findIndex(el => el.id === id);
  if (idx <= -1) {
    throw new Error(`Board with id: ${id} was not found`);
  } else {
    DB.boards[idx].title = board.title;
    DB.boards[idx].columns[0].title = board.columns[0].title;
    DB.boards[idx].columns[0].order = board.columns[0].order;
  }
};

const deleteBoard = async id => {
  const idx = DB.boards.findIndex(el => el.id === id);
  if (idx <= -1) {
    throw new Error(`Board with id: ${id} was not found`);
  } else {
    return DB.boards.splice(idx, 1);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  putUser,
  deleteUser,
  getAllBoards,
  getBoardById,
  createBoard,
  putBoard,
  deleteBoard
};

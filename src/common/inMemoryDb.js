const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const DB = {
  users: [],
  boards: [],
  tasks: []
};

DB.users.push(new User(), new User(), new User());
DB.boards.push(new Board(), new Board(), new Board());
DB.tasks.push(new Task(), new Task(), new Task());

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

const getAllTasksByBoard = async boardId =>
  DB.tasks.filter(task => task.boardId === boardId);

const getTaskById = async id => DB.tasks.filter(task => task.id === id);

const createTask = async task => {
  DB.tasks.push(task);
  return await getTaskById(task.id);
};

const putTaskInBoard = async (boardId, id, task) => {
  const tasks = DB.tasks.filter(el => el.boardId === boardId);
  const idx = tasks.findIndex(el => el.id === id);
  if (idx <= -1) {
    throw new Error(
      `Task with id: ${id} in board id: ${boardId} was not found`
    );
  } else {
    tasks[idx].title = task.title;
    tasks[idx].order = task.order;
    tasks[idx].description = task.description;
    tasks[idx].userId = task.userId;
    tasks[idx].boardId = task.boardId;
    tasks[idx].columnId = task.columnId;
  }
};

const deleteTask = async (boardId, id) => {
  const idx = DB.tasks.findIndex(
    task => task.boardId === boardId && task.id === id
  );
  if (idx <= -1) {
    throw new Error(
      `Task with id: ${id} in board id: ${boardId} was not found`
    );
  } else {
    return DB.tasks.splice(idx, 1);
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
  deleteBoard,
  getAllTasksByBoard,
  getTaskById,
  createTask,
  putTaskInBoard,
  deleteTask
};

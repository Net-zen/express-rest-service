const DB = {
  users: [],
  boards: [],
  tasks: []
};

const getAllUsers = async () => [...DB.users];

const getUserById = async id => {
  const foundUsers = DB.users.filter(user => user.id === id);
  if (foundUsers.length > 1) {
    throw new Error('Database is corrupted!');
  }
  return foundUsers[0] || false;
};

const createUser = async user => {
  DB.users.push(user);
  return getUserById(user.id);
};

const updateUser = async (id, user) => {
  const idx = DB.users.findIndex(el => el.id === id);
  if (idx === -1) {
    return false;
  }
  DB.users[idx] = { ...user };
  return { ...DB.users[idx] };
};

const removeUser = async id => {
  const idx = DB.users.findIndex(el => el.id === id);
  if (idx === -1) {
    return false;
  }
  DB.tasks
    .filter(task => task.userId === id)
    .forEach(task => (task.userId = null));
  DB.users.splice(idx, 1);
  return true;
};

const getAllBoards = async () => [...DB.boards];

const getBoardById = async id => {
  const foundBoards = DB.boards.filter(board => board.id === id);
  if (foundBoards.length > 1) {
    throw new Error('Database is corrupted!');
  }
  return foundBoards[0] || false;
};

const createBoard = async board => {
  DB.boards.push(board);
  return getBoardById(board.id);
};

const updateBoard = async (id, board) => {
  const idx = DB.boards.findIndex(el => el.id === id);
  if (idx === -1) {
    return false;
  }
  DB.boards[idx] = { ...board };
  return { ...DB.boards[idx] };
};

const removeBoard = async id => {
  const idx = DB.boards.findIndex(board => board.id === id);
  if (idx === -1) {
    return false;
  }
  DB.tasks
    .filter(task => task.boardId === id)
    .forEach(task => removeTask(id, task.id));
  DB.boards.splice(idx, 1);
  return true;
};

const getAllTasksByBoard = async boardId =>
  DB.tasks.filter(task => task.boardId === boardId);

const getTaskById = async id => {
  const foundTasks = DB.tasks.filter(task => task.id === id);
  if (foundTasks.length > 1) {
    throw new Error('Database is corrupted!');
  }
  return foundTasks[0] || false;
};

const createTask = async task => {
  DB.tasks.push(task);
  return getTaskById(task.id);
};

const updateTaskInBoard = async (boardId, id, task) => {
  const idx = DB.tasks.findIndex(el => el.id === id && el.boardId === boardId);
  if (idx === -1) {
    return false;
  }
  DB.tasks[idx] = { ...task };
  return { ...DB.tasks[idx] };
};

const removeTask = async (boardId, id) => {
  const idx = DB.tasks.findIndex(
    task => task.boardId === boardId && task.id === id
  );
  if (idx === -1) {
    return false;
  }
  DB.tasks.splice(idx, 1);
  return true;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  removeBoard,
  getAllTasksByBoard,
  getTaskById,
  createTask,
  updateTaskInBoard,
  removeTask
};

const DB = {
  users: [],
  boards: [],
  tasks: []
};

const getAllUsers = async () => JSON.parse(JSON.stringify(DB.users));

const getUserById = async id => DB.users.filter(user => user.id === id);

const createUser = async user => {
  DB.users.push(user);
  return await getUserById(user.id);
};

const updateUser = async (id, user) => {
  const idx = DB.users.findIndex(el => el.id === id);
  if (idx <= -1) {
    throw new Error(`User with id: ${id} was not found`);
  } else {
    DB.users[idx] = { ...user };
  }
};

const removeUser = async id => {
  const idx = DB.users.findIndex(el => el.id === id);
  if (idx <= -1) {
    throw new Error(`User with id: ${id} was not found`);
  } else {
    DB.tasks = DB.tasks.map(task => {
      if (task.userId === id) {
        task.userId = null;
      }
      return task;
    });
    return DB.users.splice(idx, 1);
  }
};

const getAllBoards = async () => JSON.parse(JSON.stringify(DB.boards));

const getBoardById = async id => DB.boards.filter(board => board.id === id);

const createBoard = async board => {
  DB.boards.push(board);
  return await getBoardById(board.id);
};

const updateBoard = async (id, board) => {
  const idx = DB.boards.findIndex(el => el.id === id);
  if (idx <= -1) {
    throw new Error(`Board with id: ${id} was not found`);
  } else {
    DB.boards[idx] = { ...board };
  }
};

const removeBoard = async id => {
  const idx = DB.boards.findIndex(el => el.id === id);
  if (idx <= -1) {
    throw new Error(`Board with id: ${id} was not found`);
  } else {
    const boardTasks = getAllTasksByBoard(id);
    boardTasks && (await boardTasks).forEach(task => removeTask(id, task.id));
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

const updateTaskInBoard = async (boardId, id, task) => {
  const idx = DB.tasks.findIndex(el => el.id === id && el.boardId === boardId);
  if (idx <= -1) {
    throw new Error(
      `Task with id: ${id} in board id: ${boardId} was not found`
    );
  } else {
    DB.tasks[idx] = { ...task };
  }
};

const removeTask = async (boardId, id) => {
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

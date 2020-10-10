const User = require('../resources/users/user.model');

const DB = {
  users: []
};

DB.users.push(new User(), new User(), new User());

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

// const putUser = async (id, user) => {
//   try {
//     const dbUser = getUserById(id);
//     dbUser.name = user.name;
//     dbUser.login = user.login;
//     dbUser.password = user.password;
//   }
//
// };

module.exports = { getAllUsers, getUserById, createUser, putUser, deleteUser };

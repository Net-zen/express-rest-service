const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser
} = require('../../common/inMemoryDb');

const getAll = async () => await getAllUsers();

const getById = async id => {
  const user = await getUserById(id);

  if (!user[0]) {
    throw new Error(`User with id: ${id} was not found`);
  } else if (user.length > 1) {
    throw new Error('Database is corrupted!');
  }
  return user[0];
};

const create = async user => {
  const newUser = await createUser(user);
  return newUser[0];
};

const update = async (id, user) => {
  await updateUser(id, user);
  return await getById(id);
};

const remove = async id => {
  const user = await removeUser(id);
  if (!user[0]) {
    throw new Error(`User with id: ${id} was not found`);
  }
  return user[0];
};

module.exports = { getAll, getById, create, update, remove };

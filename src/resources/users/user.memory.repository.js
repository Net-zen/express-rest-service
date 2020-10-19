const { NOT_FOUND } = require('../../common/errorHandler');
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
  if (!user) {
    throw new NOT_FOUND(`User with id: ${id} was not found`);
  }
  return user;
};

const create = user => createUser(user);

const update = async (id, user) => {
  const updatedUser = await updateUser(id, user);
  if (!updatedUser) {
    throw new NOT_FOUND(`User with id: ${id} was not found`);
  }
  return updatedUser;
};

const remove = async id => {
  const user = await removeUser(id);
  if (!user) {
    throw new NOT_FOUND(`User with id: ${id} was not found`);
  }
  return true;
};

module.exports = { getAll, getById, create, update, remove };

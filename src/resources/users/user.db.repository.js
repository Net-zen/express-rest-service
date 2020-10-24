const { NOT_FOUND } = require('../../common/errorHandler');
const User = require('./user.model');
const Task = require('../tasks/task.model');

const getAll = async () => User.find({});

const getById = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new NOT_FOUND(`User with id: ${id} was not found`);
  }
  return user;
};

const create = user => User.create(user);

const update = async (id, user) => {
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
  if (!updatedUser) {
    throw new NOT_FOUND(`User with id: ${id} was not found`);
  }
  return updatedUser;
};

const remove = async id => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new NOT_FOUND(`User with id: ${id} was not found`);
  }
  await Task.updateMany({ userId: id }, { userId: null });
  return true;
};

module.exports = { getAll, getById, create, update, remove };
